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
    status:
        {
            type: String,
            enum: ["PENDING", "HR_APPROVED", "HR_REJECTED", "ACOUNTANT_AMOUNT_RELEASED"],
            default: "PENDING"
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
    accontantActionAt:
    {
        type: Date
    }
});

export const Document = mongoose.model("Document", documentSchema)