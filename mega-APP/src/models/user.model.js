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
    if(!this.isModified("password")) return next()  // if password isnot changing then dont run the function of "SAVE" and next() if password changes (firsttime filled or updated then) run the bcrypt code 

    this.password = await bcrypt.hash(this.password, 10)
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


// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// const userSchema = new Schema({
//    username: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true,
//     trim: true,
//     lowercase: true
//    },
//    email: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true,
//     trim: true,
//     lowercase: true
//    },
//    fullName: {
//     type: String,
//     required: true,
    
//     trim: true,
//    },
//    avtar: {
//     type: String,
//     required: true
//    },
//    coverImage: {
//     type: String,
    
//    },
//    password: {
//     type: String,
//     required: [true, "password is required"]
//    },
//    watchHistory: [
//     {
//         type: Schema.Types.ObjectId,
//         ref: "Video"
//     }
//    ],
//    refreshToken: {
//     type: String
//    }

// },
// {
//     timestamps: true
// })

// userSchema.Promise("save", async function (next) {
//     if(!this.isModefied("password")) return next()

//     this.password = await bcrypt.hash(this.password, 10) 
//     next()
// })


// userSchema.method.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(this.password, password)
// }

// userSchema.method.generateAccessToken = function () {
//      return jwt.sign(
//         {
//             _id: this.id,
//             username: this.username,
//             email: this.email,
//             fullName: this.fullName
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }

// userSchema.method.generateRefreshToken = function () {
//     return jwt.sign(
//         {
//             _id: this.id
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

// export const User = mongoose.model("User", userSchema)