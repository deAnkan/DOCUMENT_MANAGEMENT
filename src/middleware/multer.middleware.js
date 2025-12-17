import multer from "multer";
import fs from "fs";
import path from "path";

/**
 * Ensure uploads folder exists
 */
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Multer storage configuration
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/**
 * File filter (allow ALL file types)
 */
const fileFilter = (req, file, cb) => {
  if (!file) {
    cb(new Error("No file received"), false);
  } else {
    cb(null, true);
  }
};

/**
 * Multer instance
 */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});

export default upload;