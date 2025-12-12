import { connectDB } from "../config/db";
import dotenv from "dotenv";



dotenv.config({
    path: './.env'
})

connectDB()
    .then(() =>{
        app.listen(process.env.PORT || 4000, () => {
            console.log(`server is running at port : $${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!", err);
    })