import multer from "multer"

/*
Returns a Multer instance that provided several method for generating middleware that process files uploaded in multipart/form-data format.
*/

/*
return a StorageEngine implementation configured to store files system .
*/

/*
A string or function may be specified to determine the destinatination directory, and filenames .if no option are set ,
files will be stored in the system temporary directory with random 32 character filenames
*/

var storage_engine = multer.diskStorage({ destination:(req,file,callback)=>{
    callback(null, './multipleuploaddocuments')
},
filename:(req,file,callback)=>{
      callback(null,Date.now()+"_"+file.originalname)
}
})
var imgupload = multer({storage: storage_engine})

export default imgupload