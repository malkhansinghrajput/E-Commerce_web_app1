import express from 'express'
import IndexController from '../controllers/indexController.js'

var router = express.Router()

router.post("/register",IndexController.register)
router.post("/login",IndexController.login)

router.get("/products",IndexController.products)

router.get("/productdetails",IndexController.productdetails)

router.post('/senduserpasswordresetemail',IndexController.senduserpassworresetemail)

router.post('/userpasswordreset', IndexController.userpasswordreset)

router.post("/sendotp", IndexController.sendotp)

router.post('/verifyotp', IndexController.verifyotp)

router.get("/filterproduct", IndexController.filterproduct)

export default router