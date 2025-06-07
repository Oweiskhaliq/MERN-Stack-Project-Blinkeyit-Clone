import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

//add category
export const addCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Please fill the required fields",
        error: true,
        success: false,
      });
    }

    const newCategory = new CategoryModel({
      name,
      image,
    });

    const savedCategory = await newCategory.save();

    if (!savedCategory) {
      return response.status(400).json({
        message: "Category was not created.",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Category created successfully.",
      data: savedCategory,
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

//Get category
export const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return response.json({
      data: data,
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

//update category
export const updateCategoryController = async (request, response) => {
  try {
    const { categoryId, name, image } = request.body;
    const updateCategory = await CategoryModel.updateOne(
      { _id: categoryId },
      {
        name,
        image,
      }
    );

    return response.json({
      message: "Category updated Successfully.",
      error: false,
      success: true,
      data: updateCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

//delete category
export const deleteCategoryController = async (request, response) => {
  try {
    const { categoryId } = request.body;

    // check the category refrence in sub category model
    const checkSubCategory = await SubCategoryModel.find({
      category: { $in: [categoryId] },
    }).countDocuments();
    // check the category in product model
    const checkProduct = await ProductModel.find({
      category: {
        $in: [categoryId],
      },
    }).countDocuments();
    //check the category
    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Category is in use. con't be deleted!.",
        success: false,
        error: true,
      });
    }

    // delete category
    const deleteCategory = await CategoryModel.findByIdAndDelete(categoryId);
    return response.json({
      message: "category deleted successfully ",
      success: true,
      error: false,
      data: deleteCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
