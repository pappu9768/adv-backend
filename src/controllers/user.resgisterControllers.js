import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import registerModel from "../models/user.register.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadFileToCloudinary } from "../../utils/Cloudinary.js"



export const registerController = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body

    //checking validation for fields are not shoukd be empty
    // if(name === "" || email === "" || password === ""){
    //     throw new ApiError(400);
    // }

    // new way to do this validation
    if (
        [name, email, password, username].some((fields) => fields?.trim() === "")
    ) {
        throw new ApiError(400);

    }

    //checking validation for email and username exist or not
    const users = await registerModel.findOne({
        $or: [{ email }, { username }]
    });
    if (users) {
        throw new ApiError(409, "User All Ready Exist");
    }

    console.log(req.files?.avatar[0]?.path)

    //handling filepath
    const gettingPathOfAvatar = req.files?.avatar[0]?.path
    const gettingPathOfCoverImage = req.files?.coverImage[0]?.path

    //checking path is given or not
    if (
        // [gettingPathOfAvatar,gettingPathOfCoverImage].some((paths) => paths?.trim() == "")

        //if coverImage is not mandatory
        !gettingPathOfAvatar
    ) {
        throw new ApiError(400, "Path is not given");
    }

    




    const newUsers = new registerModel({
        name,
        email,
        password,
        username
    })

    const saveUser = await newUsers.save()
    throw new ApiResponse(201, saveUser, "congratulations you are Registered now");
})