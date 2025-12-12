require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
import authRoutes from './routes/AuthRoutes.js';
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(express.json());

// Database Connection
await connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Auth backend running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





