import express from 'express'
import CustomerController from '../controllers/customerController.js'
import checkCustomerAuth from '../middleware/auth-middleware.js'

import imgupload from '../modals/singleUpload.js'

const router = express.Router()

 router.use("/editprofile", checkCustomerAuth)

router.put("/editprofile", CustomerController.editprofile)

router.post('/uploadDocument', imgupload.single("upload_doc"),CustomerController.uploaddocument)

router.get("/fetchdocument", CustomerController.fetchdocument)

router.post('/cart', CustomerController.addtoCart)

router.get('/cartdetails',CustomerController.cartdetails)

router.post('/changepassword', CustomerController.changepassword)

router.put('/deletecart', CustomerController.deletecart)

router.get('/profile', CustomerController.profile)

router.get('/profilepic', CustomerController.profilepic)

router.get('/emptycart', CustomerController.emptycart)

router.post('/checkout',CustomerController.checkout)

router.post('/paymentverification',CustomerController.paymentVerification)

router.post('/orders', CustomerController.order)

router.get('/orderlist', CustomerController.orderList)

router.get('/getkey', (req,res) => res.status(200).json({key: process.env.RAZORPAY_API_KEY})
)

export default router