import multer from "multer"

/*
Return a multer instance that provides several methods uploaded in multipart / form data format
*/
/**
 Returns a StorageEngine implementation configured to store files on the local file system.
 
 A string or function may be specified to determine the destination directory , and a function to destination directory, and function to determine filesName. if no options are set , files will be stored in the  system's temporary directoery with random 32 character filename.

*/
 var storage_engine = multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null, './uploaddocuments')
    },
    filename:(req,file,callback)=>{
      callback(null,Date.now() +"_"+ file.originalname)
    }
    })

 var imgupload = multer({storage:storage_engine})

 export default imgupload
