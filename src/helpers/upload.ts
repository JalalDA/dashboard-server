import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary, ResourceApiOptions, UploadApiOptions} from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params : () =>{
    const folders = {
      folder : "product"
    }
    return folders
  }
});

const limit = {
  fileSize : 3e6
}

const imageOnlyFilter = (Req:any, file:any, cb:any)=>{
  const extName = path.extname(file.originalname)
  const allowedExt = /jpg|png/
  if(!allowedExt.test(extName))
  return cb(new Error("Please insert jpg or png only"), false)
  cb(null, true)
}

export const uploadImage = multer({
  storage : storage, 
  limits : limit,
  fileFilter : imageOnlyFilter
})