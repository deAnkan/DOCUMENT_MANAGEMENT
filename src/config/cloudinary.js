import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

/**
 * Cloudinary configuration
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file to Cloudinary
 * @param {string} localFilePath
 */
export const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "documents",
      resource_type: "raw", // IMPORTANT: allows pdf, doc, images, etc.
    });

    // remove file from local uploads folder after successful upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    // remove file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export default uploadToCloudinary;