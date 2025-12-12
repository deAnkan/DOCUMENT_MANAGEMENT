import mongoose from 'mongoose';
export async function connectDB(mongoURI) {
    try{
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};
    