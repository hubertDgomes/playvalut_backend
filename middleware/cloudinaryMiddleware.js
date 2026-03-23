import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
        cloud_name: 'dwvtzpyqr', 
        api_key: '315146735198365', 
        api_secret: 'LPiO8iNHUS13Jm7j-5H7JEXqfPU'
    });


const imageUpload = async (filename)=> {
    const result = await cloudinary.uploader.upload(filename)
    fs.unlinkSync(filename)
    return result;
}

export default imageUpload