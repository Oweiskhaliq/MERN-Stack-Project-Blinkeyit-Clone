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
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
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

//get products by category
export const getProductsByCategoryController = async (request, response) => {
  try {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({
        message: "category id is required",
        error: true,
        success: false,
      });
    }

    const products = await ProductModel.find({ category: { $in: id } });

    return response.json({
      message: "products fetched successfully",
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//get products by category and subCategory
export const getProductsByCategoryAndSubCategoryController = async (
  request,
  response
) => {
  try {
    const { categoryId, subCategoryId, limit, page } = request.body;

    if (!categoryId || !subCategoryId) {
      return response.status(400).json({
        message: "category id and subCategory id is required",
        error: true,
        success: false,
      });
    }

    if (!page) page = 1;
    if (!limit) limit = 10;
    const skip = (page - 1) * limit;

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };

    console.log("data query", query);
    const [data, dataCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return response.json({
      message: "products fetched successfully",
      error: false,
      success: true,
      totalCount: dataCount,
      page,
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

//get proudct by id
export const getProductDetailsController = async (request, response) => {
  try {
    const { productId } = request.body;
    if (!productId) {
      return response.status(400).json({
        message: "product id is required",
        error: true,
        success: false,
      });
    }
    const product = await ProductModel.findOne({ _id: productId });
    return response.json({
      message: "product fetching successfully",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    return (
      response.status(500),
      json({
        message: error.message || error,
        error: true,
        success: false,
      })
    );
  }
};

// update product details
export const updateProductDetails = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "product id is required",
        error: true,
        success: false,
      });
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(_id, {
      ...request.body,
    });

    return response.json({
      message: "Product Updated Successfully. ",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// delete products detail
export const deleteProductDetail = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "product id is required",
        error: true,
        success: false,
      });
    }
    const deleteProduct = await ProductModel.deleteOne({ _id: _id });
    return response.json({
      message: "Product Deleted Successfully.",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Search Products
export const searchProductsController = async (request, response) => {
  try {
    let { search, page, limit } = request.body;

    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $text: { $search: search },
        }
      : {};

    const [data, countData] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),

      ProductModel.countDocuments(query),
    ]);

    return response.json({
      message: "products fetched successfully",
      error: false,
      success: true,
      totalCount: countData,
      totalPage: Math.ceil(countData / limit),
      page,
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
