import { User } from "../models/user.model";
import { Document } from "../models/document.model.js";

//get accountant and  users

export const getUsersAndAccountants = async (req, res) => {
    try {
        const users = await User.find({ role: ["user", "accountant"]}).select("-password");
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
       
}

//hr can access all documents and actions

export const getAllDocumentsForHr = async (req, res) => {
    try {
        const documents = await Document.find().populate("user", "name email").populate("accountant", "name email");
        res.status(200).json({documents});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}