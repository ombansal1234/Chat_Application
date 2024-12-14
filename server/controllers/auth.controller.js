import cloudinary from "../lib/cloudinary/cloudinary.js";
import { dataSender } from "../lib/data/dataSender.js";
import { errorSender } from "../lib/errors/errorSender.js";
import { generateToken } from "../lib/token/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup =async (req,res,next) => {
    const {fullName, email, password} = req.body
    if(!fullName||!email||!password)return errorSender("All fields are required",400,next)  
    if(password.length<6)return errorSender("Password must be at least 6 characters",400,next)    

    const user = await User.findOne({email})
    if(user) return errorSender("Email already exists",400,next)

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt)

    const newUser=new User({
        fullName,
        email,
        password:hashPassword
    })

    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()
        return dataSender(res,{message:"success",_id: newUser._id,fullName: newUser.fullName,email: newUser.email,profilePic: newUser.profilePic},201)    
    }else{
        return errorSender("Invalid user data",400,next)   
    }
};

export const login = async(req,res,next) => {
    const {email, password} = req.body
    if(!email||!password)return errorSender("All fields are required",400,next)  
    const user=await User.findOne({email});

    if(!user)return errorSender("Invalid credentials",400,next)
    
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect)return errorSender("Invalid credentials",400,next)

    generateToken(user._id,res)
    return dataSender(res,{message:"success",_id: user._id,fullName: user.fullName,email: user.email,profilePic: user.profilePic},200)    
};

export const logout = (req,res,next)=>{
    res.cookie("jwt","", { maxAge: 0 }); 
    return dataSender(res,{message:"success"},200)      
    
};
  
export const updateProfile=async(req,res,next)=>{
    //console.log(req.body)
    const {profilePic}=req.body
    const userId=req.user._id

    if(!profilePic)return errorSender("profilePic is required",400,next)

    const uploadResponse=await cloudinary.uploader.upload(profilePic)
    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
    updatedUser.message="success"

    return dataSender(res,updatedUser,200)  
}

export const checkAuth=(req,res)=>{
    return dataSender(res,{message:"success",...req.user._doc},200)  
}