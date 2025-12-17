import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
    folder: "documents",
    allowed_formats: ["pdf", "jpg", "jpeg", "png"],
    resource_type: "auto"
    }
});

export const upload = multer({
    storage,
    limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
    }
});
