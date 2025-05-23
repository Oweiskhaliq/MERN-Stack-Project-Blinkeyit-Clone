import { v2 as cloudinary } from "cloudinary";

const uploadImageCloudinary = async (image) => {
  //API
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });
  const buffer = image?.buffer || Buffer.from(await ArrayBuffer());

  const uploadImage = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "blinkeyit" }, (error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(buffer);
  });
  return uploadImage;
};

export default uploadImageCloudinary;
