import fileUpload from "express-fileupload";

export const uploadMiddleware = fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    abortOnLimit: true
});
