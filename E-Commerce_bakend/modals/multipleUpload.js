import multer from "multer";
import {CloudinaryStorage, cloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../dbconnect/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "multipleuploaddocuments",
        allowed_formats : ["jpg" ,"png","jpeg", "webp" ]
    }
})

const imageupload = multer({storage})

export default imageupload