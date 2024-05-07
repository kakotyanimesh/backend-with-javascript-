import { ApiError } from "../utils/apierror.js";
import { asyncHandelers } from "../utils/asynclandelers.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


export const varifyJwt = asyncHandelers(async (req, _, next)=>{
    try {
        const token = req.body?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if(!token){
            throw new ApiError(401, "invlid token")
        }

        const decodeJwt = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeJwt?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "invalid user ")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, message?.error || "invalid tokens and all")
    }
})