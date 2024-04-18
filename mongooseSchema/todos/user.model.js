import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: string,
        required: true,
        lowercase: true
    },
    password: {
        type: string,
        required: true
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)