import fileUpload from "express-fileupload";

export const uploadMiddleware = fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    abortOnLimit: true
});