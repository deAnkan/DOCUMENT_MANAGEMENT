import mongoose, { Schema } from "mongoose"

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
            enum: ["HR", "accountant", "user"],
            default:" user",
  
        },
    },  {timestamp: true})

export const User = mongoose.model("User", userSchema)