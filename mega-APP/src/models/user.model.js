import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type : String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true, // removing whitespace 
        index: true // for seraching perpous
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    fullName:  {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url : service like aws
        required: true,

    },
    coverImage: {
        type: String,

    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, " password is required"],

    },
    refresehToken: {
        type: String
    }

},{timestamps: true})

userSchema.pre("save", async function (next) {                            // write whole function
    if(!this.isModified("password")) next()  // if password isnot changing then dont run the function of "SAVE" and next() if password changes (firsttime filled or updated then) run the bcrypt code 

    this.password = bcrypt.hash(this.password, 10)
    // getting password access and crypting it with the help of bcrypt.hash(filethat need to be encrypt, number of rounds)

   next() 
}) 

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)

}
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
            // payload
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefressToken = function (){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}





export const User = mongoose.model("User", userSchema)