import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../dbconnect/cloudinary.js";

const storage = new  CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
      folder : "uploaddocuments",
      allowed_formats : ["jpg","png","jpeg","webp"]
    }
})

const imageupload = multer({storage})
export default imageupload;