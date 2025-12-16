import "dotenv/config";
import express from "express";
import cors from "cors";
import documentRoutes from "./routes/document.routes.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import { uploadMiddleware } from "./middleware/fileupload.middleware.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadMiddleware);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
res.send("Auth backend running...");
});

// Start server after DB connection
connectDB().then(() => {
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});
});
