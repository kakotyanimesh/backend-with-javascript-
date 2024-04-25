import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: {
        type : String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        typr: String,
        required: true,
        lowercase: true,
        unique: true
    },
    fullname:  {
        type: String,
        required: true,
        
    },

},{timestamps: true})


export const User = mongoose.model("User", userSchema)