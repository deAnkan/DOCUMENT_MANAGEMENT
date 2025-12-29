import uploadToCloudinary from "../config/cloudinary.js";
import { Document } from "../models/document.model.js";

//upload document

export const uploadDocument = async (req, res) => {
    try {
        
        const fileRef = req?.file
        if(!fileRef){
            return  res.status(400).json({message: "No file uploaded"});
        }

        const uploadResult = await uploadToCloudinary(fileRef.path, "documents");


        console.log("Upload Result:", uploadResult);

        const document = await Document.create({
      user: req.user._id,                 // logged-in user
    fileUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    status: "SUBMITTED"
    });

        return res.status(201).json({
        message: "File uploaded successfully",
      documentId: document._id,           // ✅ THIS IS documentId
        document
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};


//hr approve/reject document

export const hrActionDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { action, message } = req.body || {};
    
        const document = await Document.findById(documentId);
    
        if (!document){
            return res.status(404).json({message: "Document not found"});
    
        }
    
        if (action === "APPROVED") {
            document.status = "HR_APPROVED";
            document.hrMessage = message || "APPROVED BY HR"
    
        }
    
        if (action === "REJECTED") {
            document.status = "HR_REJECTED";
            document.hrMessage = "REJECTED BY HR"
        }
    
        document.hrActionAt = Date.now();
    
        await document.save();
        res.status(200).json({message: "Document action completed successfully", document});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};

//accountant approve and release amount

export const accountantDocument = async (req, res) => {
    try {
    const { documentId } = req.params;
    const { amount } = req.body || {};

    const document = await Document.findById(documentId);

    if (!document){
        return res.status(404).json({message: "Document not found"});

    }

    if(document.status !== "HR_APPROVED") {
        return res.status(400).json({message: "Document not approved by HR"});
    }

    else {
        document.status = "ACCOUNTANT_AMOUNT_RELEASED";
        document.amountReleased = amount;
        document.accountantMessage = "Amount released by accountant";
        document.accountantActionAt = Date.now();

        await document.save();
        res.status(200).json({message: "Amount released successfully", document});
    }
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

//resubmission after rejection

export const resubmitDocument = async (req, res) => {

try{
    const { documentId } = req.params;
    const document = await Document.findOne({
        _id: documentId,
        user: req.user._id
    });


    if (!document){
        return res.status(404).json({message: "Document not found"});
    }

    if (document.status !== "HR_REJECTED") {
        return res.status(400).json({message: "only rejected documents can be resubmitted"});

    }

    if (document.publicId) {
        await cloudinary.uploader.destroy(document.publicId);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder:"documents"
    })

    document.fileUrl = result.secure_url;
    document.publicId = result.public_id;
    document.status = "SUBMITTED";
    document.submittedAt = Date.now();
    document.hrMessage = "";
    document.accountantMessage = "";

    await document.save();
    res.status(200).json({message: "document resubmitted successfully ", document});

} catch (error) {
    res.status(500).json({message: error.message});

}
};