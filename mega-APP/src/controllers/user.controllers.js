import {asynclandelers} from "../utils/asynclandelers.js"
import { ApiError} from "../utils/apierror.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js"

const registerUser = asynclandelers(async (req, res) => {
   //get user details from frontend
   // validation - not empty
   //check if user already exists - username/email
   //check for images and avtar
   // upload them to cloudinary, avtar
   // create userObject- create  entry in db
   // remove password and refresh token field from response
   // check user creation 
   // return res
   
   
   
   //get user details from frontend
   const {fullName, email, username, password} = req.body
   console.log("email:", email);

   // validation - not empty
   
   //   if(fullName === ""){
   //    throw new ApiError(400, "Full name is required")
   //   }

   if (
       [fullName, email, username, password].some((field) => field?.trim() ===  "" )

   ) {
      throw new ApiError(400, "all fields are required")
   }

   //check if user already exists - username/email

   const existedUser = User.findOne({
      $or: [{username}, {email}]
   })

   if (existedUser) {
      throw new ApiError(409, "user with email or username already exists")

   }

   //check for images and avtar

   const avtarLocalPath =  req.files?.avtar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if (!avtarLocalPath) {
      throw new ApiError(400, "avtar file is required")
   }

   // upload them to cloudinary, avtar

   const avtar = await uploadOnCloudinary(avtarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avtar){
      throw new ApiError(409, "avtar file is required")
   }

   // create userObject- create  entry in db

   const user = await User.create({
      fullName,
      avtar: avtar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
   })

   // check user creation 
   const createdUser = await User.findById(user._id).select(
      "-password -refresehToken"
   )

   if (!createdUser) {
      throw new ApiError(500, "something went wrong while registring the user")
  
   }

    // return res
    return res.status(201).json(
      new ApiResponse(200, createdUser, "user registered succesfully")
    )

})

export {registerUser}