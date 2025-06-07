import uploadImageCloudinary from "../Utils/uploadImageCloudinary.js";

export const uploadImageController = async (request, response) => {
  try {
    const file = request.file;
    const uploadImage = await uploadImageCloudinary(file);

    return response.json({
      message: "Image Successfully Uploaded.",
      data: uploadImage,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: error.massage || error,
      error: true,
      success: false,
    });
  }
};
