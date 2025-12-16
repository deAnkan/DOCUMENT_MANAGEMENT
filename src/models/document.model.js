import mongoose, { Schema} from "mongoose";

const documentSchema = new Schema({

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileUrl:
        {
            type: String,
            required: true,
        },
    publicId: {
            type: String
    },
    status:
        {
            type: String,
            enum: ["SUBMITTED", "HR_APPROVED", "HR_REJECTED", "ACCOUNTANT_AMOUNT_RELEASED"],
            default: "SUBMITTED"
        },
    hrMessage:
    {
        type: String,

    },
    accountantMessage:
    {
        type: String,
    },
    amountReleased:
    {
        type: Number,
    },
    submittedAt:
    {
        type: Date,
        default: Date.now
    },

    hrActionAt:
    {
        type: Date
    },
    accountantActionAt:
    {
        type: Date
    }
});

export const Document = mongoose.model("Document", documentSchema)