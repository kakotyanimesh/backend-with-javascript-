import {v2 as cloudinary} from "cloudinary"
import fs from "fs"      //fs-> file system for read write remove



          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRETKEY
}); 
// copied code from clodinary

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload file
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file uploded successfully
        console.log(`file is uploaded successfully at`, response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)      // remove locally saved temp file as the upload operation got failed 
        return null
    }

}


export {uploadOnCloudinary}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
// // copied code from clodinary 

