import "dotenv/config";
import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import { connectDB } from "./src/config/db.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Auth backend running...");
});


connectDB().then(()=>{
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
})



