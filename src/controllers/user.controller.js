import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apiError.js'
import { User } from './../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async(req, res)=> {
    //get user details from frontend
    //validation - not empty
    //ckeck if user already exist : username | email
    //check for images, check for avatat
    //upload them to cloudinary, avatar
    //create user objects - create entry in db
    //remove pasword and refresh token field from response
    //check for user creation
    //return response else error

    const {fullName, username, email, password} = req.body

    // if(fullName === ""){
    //     throw new ApiError(400, "Full name is required")
    // }

    if([fullName,username,email,password].some((field)=> field?.trim() === "")) {
        throw new ApiError(400, "All fileds are required")
    }   

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring the user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))
})

export {registerUser}