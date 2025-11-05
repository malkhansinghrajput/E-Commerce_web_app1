import express from "express";
import AdminController from '../controllers/adminController.js'
import multipleimgupload from '../modals/multipleUpload.js'
import imgupload from '../modals/singleUpload.js'
import IndexController from "../controllers/indexController.js";

var router = express.Router()

router.get('/profile', AdminController.profile)

router.get('/profilepic',AdminController.profilepic)

router.post('/uploadDocument', imgupload.single("upload_doc"),AdminController.uploaddocument)

router.post("/addproduct", multipleimgupload.array("product_imageurl",12), AdminController.addproduct)

router.delete("/deleteproduct", AdminController.deleteproduct)

router.put("/editproduct",multipleimgupload.array("product_imageurl",6),AdminController.editproduct)

router.get("/allcustomer", AdminController.allcustomer)

router.put("/managecustomerstatus", AdminController.managecustomerstatus)

router.get("/filterproduct", IndexController.filterproduct)

export default router