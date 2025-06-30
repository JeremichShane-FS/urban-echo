import { ERROR_TYPES } from "@config/constants";
import { getDataSource } from "@config/data-sources";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "data-service";

class DataService {
  async getData(dataType, params = {}) {
    try {
      const source = getDataSource(dataType);

      if (source === "strapi") {
        return this.getStrapiData(dataType, params);
      } else if (source === "mongodb") {
        return this.getMongoData(dataType, params);
      }
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
        source: ERROR_SOURCE,
        action: "getData",
        dataType,
        params,
      });
      throw error;
    }
  }

  async getStrapiData(dataType, params) {
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
      const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

      const response = await fetch(`${STRAPI_URL}/api/${dataType}?populate=*`, {
        headers: {
          "Content-Type": "application/json",
          ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Strapi API responded with status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        source: ERROR_SOURCE,
        action: "getStrapiData",
        dataType,
        params,
      });
      throw error;
    }
  }

  async getMongoData(dataType, params) {
    try {
      await dbConnect();

      switch (dataType) {
        case "products": {
          const Product = (await import("@lib/mongodb/models/product")).default;
          const query = { isActive: true };

          // Add filters based on params
          if (params.category) query.category = params.category;
          if (params.featured) query.isFeatured = true;
          if (params.newArrivals) query.isNewArrival = true;

          return Product.find(query).limit(params.limit || 20);
        }

        case "users": {
          const User = (await import("@lib/mongodb/models/user")).default;
          if (params.id) {
            return User.findById(params.id);
          }
          return User.find(params.query || {}).limit(params.limit || 10);
        }

        case "orders": {
          const Order = (await import("@lib/mongodb/models/order")).default;
          const orderQuery = {};
          if (params.userId) orderQuery.user = params.userId;
          if (params.status) orderQuery.status = params.status;

          return Order.find(orderQuery)
            .populate("items.product")
            .populate("user", "firstName lastName email")
            .sort({ createdAt: -1 })
            .limit(params.limit || 20);
        }

        default:
          throw new Error(`No handler for MongoDB data type: ${dataType}`);
      }
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
        source: ERROR_SOURCE,
        action: "getMongoData",
        dataType,
        params,
      });
      throw error;
    }
  }

  // Helper method to create new data
  async createData(dataType, data) {
    try {
      const source = getDataSource(dataType);

      if (source === "mongodb") {
        await dbConnect();

        switch (dataType) {
          case "products": {
            const Product = (await import("@lib/mongodb/models/product")).default;
            const newProduct = new Product(data);
            return newProduct.save();
          }

          case "users": {
            const User = (await import("@lib/mongodb/models/user")).default;
            const newUser = new User(data);
            return newUser.save();
          }

          case "orders": {
            const Order = (await import("@lib/mongodb/models/order")).default;
            const newOrder = new Order(data);
            return newOrder.save();
          }

          default:
            throw new Error(`No create handler for MongoDB data type: ${dataType}`);
        }
      } else {
        throw new Error(`Cannot create data for source: ${source}`);
      }
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
        source: ERROR_SOURCE,
        action: "createData",
        dataType,
        data,
      });
      throw error;
    }
  }

  // Helper method to update data
  async updateData(dataType, id, updates) {
    try {
      const source = getDataSource(dataType);

      if (source === "mongodb") {
        await dbConnect();

        switch (dataType) {
          case "products": {
            const Product = (await import("@lib/mongodb/models/product")).default;
            return Product.findByIdAndUpdate(id, updates, { new: true });
          }

          case "users": {
            const User = (await import("@lib/mongodb/models/user")).default;
            return User.findByIdAndUpdate(id, updates, { new: true });
          }

          case "orders": {
            const Order = (await import("@lib/mongodb/models/order")).default;
            return Order.findByIdAndUpdate(id, updates, { new: true });
          }

          default:
            throw new Error(`No update handler for MongoDB data type: ${dataType}`);
        }
      } else {
        throw new Error(`Cannot update data for source: ${source}`);
      }
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
        source: ERROR_SOURCE,
        action: "updateData",
        dataType,
        id,
        updates,
      });
      throw error;
    }
  }
}

const dataService = new DataService();
export default dataService;
