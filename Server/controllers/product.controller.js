import ProductModel from "../models/product.model.js";

// create product
export const createProductController = async (request, response) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body;
    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return response.status(400).json({
        message: "all fields are required",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.create({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });
    const save = product.save();
    return response.json({
      message: "product created successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get products
export const getProductsController = async (request, response) => {
  try {
    let { page, limit, search } = request.body;

    if (!page) page = 2;
    if (!limit) limit = 10;

    const query = search ? { $text: { $search: search } } : {};
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);
    return response.json({
      message: "products fetched successfully",
      error: false,
      success: true,
      totalCount,
      NoOfPages: Math.ceil(totalCount / limit),
      limit,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
