import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
res.send("Auth backend running...");
});

// Start server after DB connection
connectDB().then(() => {
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});
});
