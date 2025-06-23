import SubCategoryModel from "../models/subCategory.model.js";

//add sub category controller
export const addSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name && !image && !category[0]) {
      return response.status(400).json({
        message: "name, image and category are required",
        error: true,
        success: false,
      });
    }

    const newSubCategory = new SubCategoryModel({
      name,
      image,
      category,
    });
    const save = await newSubCategory.save();
    response.json({
      message: "subCategory created successfully",
      errorq: false,
      success: true,
      data: save,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//get all sub category controller
export const getSubCategoryController = async (request, response) => {
  try {
    const subCategory = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return response.json({
      message: "subCategory fetched successfully",
      error: false,
      success: true,
      data: subCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// update sub category controller
export const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;
    const checkSubCat = await SubCategoryModel.findById(_id);

    if (!checkSubCat) {
      return response.status(400).json({
        message: "SubCategory not found. check your id",
        error: true,
        success: false,
      });
    }
    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return response.json({
      message: "SubCategory updated successfully",
      error: false,
      success: true,
      data: updateSubCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// delete sub category controller
export const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;
    const checkSubCat = await SubCategoryModel.findById(_id);

    if (!checkSubCat) {
      return response.status(400).json({
        message: "SubCategory not found. check your id",
        error: true,
        success: false,
      });
    }
    const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id);

    return response.json({
      message: "SubCategory deleted successfully",
      error: false,
      success: true,
      data: deleteSubCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
