import { API_REQUIRED_FIELDS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  createCorsResponse,
  createErrorResponse,
  createNotFoundResponse,
  createSuccessResponse,
  isValidObjectId,
  transformProductForDetail,
  validateRequiredFields,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "product-detail-api";

/**
 * GET /api/products/[id]
 * @description Get individual product by ID or slug with full details
 * @param {Object} params - Route parameters
 * @param {string} params.id - Product ID (ObjectId) or slug
 * @returns {Object} Complete product details with variants, images, and SEO data
 * @example GET /api/products/507f1f77bcf86cd799439011
 * @example GET /api/products/classic-denim-jacket
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const validation = validateRequiredFields(
      { id },
      API_REQUIRED_FIELDS.PRODUCT_DETAIL,
      `/api/products/[id]`
    );

    if (!validation.isValid) return validation.response;

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;
    let product;

    if (isValidObjectId(id)) {
      product = await Product.findById(id).lean();
    } else {
      product = await Product.findOne({
        slug: id,
        isActive: true,
      }).lean();
    }

    if (!product) {
      errorHandler.handleError(new Error(`Product not found: ${id}`), ERROR_TYPES.NOT_FOUND_ERROR, {
        productId: id,
        endpoint: `/api/products/${id}`,
      });

      return createNotFoundResponse("Product", id, {
        endpoint: `/api/products/${id}`,
      });
    }

    const transformedProduct = transformProductForDetail(product);

    return createSuccessResponse(transformedProduct, {
      endpoint: `/api/products/${id}`,
      productId: id,
      source: "mongodb",
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/products/[id]`,
      method: "GET",
      params,
    });

    return createErrorResponse("Failed to fetch product", error.message, { source: "mongodb" });
  }
}

/**
 * OPTIONS /api/products/[id]
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
