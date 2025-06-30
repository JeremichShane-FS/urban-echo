import { API_ENDPOINTS, HTTP_STATUS } from "@config/constants";
import dbConnect from "@lib/mongodb/client.js";

export async function GET(request) {
  try {
    await dbConnect();

    const Product = (await import("@lib/mongodb/models/product")).default;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";
    const newArrivals = searchParams.get("new") === "true";
    const limit = parseInt(searchParams.get("limit")) || 20;
    const page = parseInt(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (featured) {
      query.isFeatured = true;
    }

    if (newArrivals) {
      query.isNewArrival = true;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order;

    // Execute query
    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    const transformedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images?.[0]?.url || null,
      slug: product.slug,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      description: product.description,
      colors: [...new Set(product.variants?.map(v => v.color) || [])],
      sizes: [...new Set(product.variants?.map(v => v.size) || [])],
      inStock: product.variants?.some(v => v.inventory > 0) || false,
      featured: product.isFeatured,
      isNew: product.isNewArrival,
      rating: product.averageRating,
      reviewCount: product.reviewCount,
      tags: product.tags,
      variants: product.variants,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    // Pagination
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return Response.json({
      success: true,
      data: transformedProducts,
      meta: {
        total: totalCount,
        page: page,
        limit: limit,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        endpoint: `/api/${API_ENDPOINTS.products}`,
        source: "mongodb",
        query: {
          category,
          featured,
          newArrivals,
          sort,
          order: order === 1 ? "asc" : "desc",
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Products API error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch products",
        message: error.message,
        source: "mongodb",
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST endpoint for creating products (admin only)
export async function POST(request) {
  try {
    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;

    const productData = await request.json();

    // Validate required fields
    const requiredFields = ["name", "slug", "description", "price", "category"];
    const missingFields = requiredFields.filter(field => !productData[field]);

    if (missingFields.length > 0) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
          missingFields: missingFields,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug: productData.slug });
    if (existingProduct) {
      return Response.json(
        {
          success: false,
          error: "Product with this slug already exists",
        },
        { status: HTTP_STATUS.CONFLICT }
      );
    }

    // Create new product
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    return Response.json(
      {
        success: true,
        data: savedProduct,
        message: "Product created successfully",
      },
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    console.error("Create product error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to create product",
        message: error.message,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
