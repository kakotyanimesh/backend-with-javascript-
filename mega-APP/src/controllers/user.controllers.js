import { asyncHandelers } from "../utils/asynclandelers.js";
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const accessTokenAndRefreshToken = async(userId)=> {
   try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefressToken()

      user.refresehToken = refreshToken
      refreshToken.save({validBeforeSave: false})

      return {refreshToken, accessToken}
   } catch (error) {
      throw new ApiError(500, "something went wrong in the server")
   }
}
const registerUser = asyncHandelers(async(req, res)=> {
   const {username, fullName, email, password} = req.body

   if (
      [username, password, email, fullName].some((field) => field?.trim() === "")
   ) {
      throw new ApiError(400, "empty field")
   }

   const existedUser = await User.findOne({
      $or: [{username}, {email}]

   })

   if(existedUser){
      throw new ApiError(409, "user already existed")
   }

   const avatarLocalFilePath = req.files?.avatar[0]?.path

   let coverImageLocalFilePath;
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalFilePath = req.files.coverImage[0].path
   }

   if (!avatarLocalFilePath) {
      throw new ApiError(409, "avatar file is required")
   }
   const avatar = await uploadOnCloudinary(avatarLocalFilePath)
   const coverImage = await uploadOnCloudinary(coverImageLocalFilePath)

   if (!avatar) {
      throw new ApiError(409, "avatr is required ")
   }
   const user = await User.create({
      username: username.toLowerCase(),
      fullName,
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || ""

   })

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if (!createdUser) {
      throw new ApiError(500, "something went wrong")
   }

   return res.status(200).json(
      new ApiResponse(201, createdUser, "user created successfully")
   )
})

const logIn = asyncHandelers(async (req, res) => {
   // data collection
   // check username or password
   // find user userexit
   // passwordchcek
   // aceess and refreshtoken
   // send cookie
   // respond

   const {username, password, email} = req.body

   if(!username || !email){
      throw new ApiError(400, "username or email is required")
   }

   const user = await User.findOne({
      $or: [{username}, {email}]
   })

   if(!user){
      throw new ApiError(404, "user not found")

   }

   const passwordChecked = await user.isPasswordCorrect(password)

   if(!passwordChecked){
      throw new ApiError(400, "invalid password ")
   }

   const {refresehToken, accessToken} = await accessTokenAndRefreshToken(user._id)
   const loggedUser = await User.findById(user._id).select("-password -refreshToken")

   // cookie send
   const options = {
      httpOnly: true,
      security: true
   }

   return res
   .status(200)
   .cookie("refresehToken", refresehToken, options)
   .cookie("accessToken", accessToken, options)
   .json(
      new ApiResponse(
         200,
         {
            user: loggedUser, refresehToken, accessToken
         },
         "user loggin succesfully "
      )
   )

})

const logout = asyncHandelers(async (req, res) => {
   await User.findByIdAndUpdate(
      req.user._id,
      {
         $set: {
            refreshToken: undefined
         }
      },
      {
         new: true
      }
   )

   const options = {
      httpOnly: true,
      security: true
   }

   return res
   .status(200)
   .clearCookie("accessToken", accessToken)
   .clearCookie("refreshToken", refreshToken)
   .json(
      new ApiResponse(200, {}, "user logged out")
   )

})

export {
   registerUser,
   logIn,
   logout
}
