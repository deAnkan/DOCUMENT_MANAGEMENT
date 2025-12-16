import cloudinary from 'cloudinary';
import { Document } from "../models/document.model.js";

//upload document

export const uploadDocument = async (req, res) => {
    try {
        
        if(!req.files) {
        return res.status(400).json({message: "No file uploaded"});
        
        }

        const result = await cloudinary.uploader.upload(req.files.file.path, {
            folder: "documents"
        });

        const document = await Document.create({
            user: req.user._id,
            fileUrl: result.secure_url,

        });
        res.status(201).json({message: "Document uploaded successfully", document});



    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};


//hr approve/reject document

export const hrActionDocument = async (req, res) => {
    const { documentid } = req.params;
    const { action, message } = req.body;

    const document = await Document.findById(documentid);

    if (!document){
        return res.status(404).json({message: "Document not found"});

    }

    if (action === "APPROVED") {
        document.status = "HR_APPROVED";
        document.hrMessage = "APPROVED BY HR"

    }

    if (action === "REJECTED") {
        document.status = "HR_REJECTED";
        document.hrMessage = "REJECTED BY HR"
    }

    document.hrActionAt = Date.now();

    await document.save();
    res.status(200).json({message: "Document action completed successfully", document});
};

//accountant approve and release amont

export const accontantDocument = async (req, res) => {
    const { documentid } = req.params;
    const { amount } = req.body;

    const document = await Document.findById(documentid);

    if (!document){
        return res.status(404).json({message: "Document not found"});

    }

    if(document.status !== "HR_APPROVED") {
        return res.status(400).json({message: "Document not approved by HR"});
    }

    else {
        document.status = "ACOUNTANT_APPROVED";
        document.amountReleased = amount;
        document.accontantMessage = "Amount released by accountant";
        document.accontantActionAt = Date.now();

        await document.save();
        res.status(200).json({message: "Amount released successfully", document});
    }


};