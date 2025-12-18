import { User } from "../models/user.model.js";
import { Document } from "../models/document.model.js";

//get accountant and  users

export const getUsersAndAccountants = async (req, res) => {
    try {

        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({message: "Access denied"});
        }

        const users = await User.find({ role: ["user", "accountant"]}).select("-password");
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
       
}

//hr can access all documents and actions

export const getAllDocumentsForHr = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "hr") {
            return res.status(403).json({message: "Access denied"});
        }
        const documents = await Document.find().populate("user", "name email");

        console.log(documents);
        
        res.status(200).json({documents});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}