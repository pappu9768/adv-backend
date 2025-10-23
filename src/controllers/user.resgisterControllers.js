import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import registerModel from "../models/user.register.js";

export const registerController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //checking validation for fields are not shoukd be empty
    // if(name === "" || email === "" || password === ""){
    //     throw new ApiError(400);
    // }
    // new way to do this validation
    if(
        [name,email,password].some((fields) => fields?.trim() === "")
    ){
        throw new ApiError(400);

    }

    //checking validation for email exist or not
    const usersEmail = await registerModel.findOne({email});
    if(usersEmail){
        throw new ApiError(400,"User All Ready Exist");
    }
    const newUsers = new registerModel({
        name,
        email,
        password
    })

    const saveUser = await newUsers.save()

    res.status(200).json({
        success: true,
        saveUser
    })
})