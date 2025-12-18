import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true,

        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
        },
        role:
        {
            type: String,
            enum: ["hr", "accountant", "user"],
            default:"user",
        },
        otp: 
        {
            type: String
        },
        otpExpiresAt: 
        {
            type: Date
        },
        isVerified: 
        {
            type: Boolean,
            default: false
        }
    },  {timestamps: true})

export const User = mongoose.model("User", userSchema)