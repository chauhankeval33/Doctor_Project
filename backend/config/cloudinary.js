import {v2 as cloudinary} from "cloudinary"

const connectCloudinery=()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDNARY_NAME,
        api_key: process.env.CLOUDNARY_API_KEY,
        api_secret: process.env.CLOUDNARY_SECRET_KEY,
        
    })
}
export default connectCloudinery;