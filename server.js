import "dotenv/config";
import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import { connectDB } from "./src/config/db.js";
import cors from "cors";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Auth backend running...");
});


connectDB().then(()=>{
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
})



