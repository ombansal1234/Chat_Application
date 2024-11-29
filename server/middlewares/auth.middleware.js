import { errorSender } from "../lib/errors/errorSender.js"
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

export const protectedRoute=async (req,res,next)=>{
    const token=req.cookies.jwt
    if(!token)return errorSender("Unauthorized - No Token Provided",401,next)

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded)return errorSender("Unauthorized - Invalid Token",401,next)

    const user=await User.findById(decoded.userId).select('-password')
    if(!user)return errorSender("User not found",404,next)

    req.user=user
    // console.log(req.user)
    next()  
}