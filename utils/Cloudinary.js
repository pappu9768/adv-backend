import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadFileToCloudinary = async(localFilePath) => {
    try {

        //checking weather file path is given or not
        if(!localFilePath) return null;

        //if path is given uploading to cloudinary
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File is uploaded on cloudinary",res)
        return res

    } catch (error) {
        fs.unlinkSync(localFilePath);
        //if error found this unlinksync would remove the file path due to any malicious file
        return null
    }
}

export default uploadFileToCloudinary;
