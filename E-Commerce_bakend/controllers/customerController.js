import { error } from 'console'
import customerModal from '../modals/customerModal.js'
import documentmodal from '../modals/documentModal.js'
import Payment from '../modals/paymentModel.js'
import fs from 'fs'
import cartModal from '../modals/cartModal.js'
import instance from '../server.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import ordermodal from '../modals/OrderModal.js'



// function formatToTitleCase(str) {
//     return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
// }

class CustomerController {
    static editprofile = async (req,res) => {
        const { id } = req.query
        const {name, address, country, state, city, gender, pincode, mobile} = req.body 
        console.log(req.body)
        console.log(req.query)
        try{
            var updated = await customerModal.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        name: name,
                         address: address,
                        country: country,
                        state: state,
                        city: city,
                        gender: gender,
                        pincode: pincode,
                        mobile: mobile,

                    }
                },
                 {
                    new: true,
                      newFindAndModify: false,
                })
                return res.status(200).json({
                    msg:"Customer Record Updated Successfuly",
                    record: updated
                })
        } catch (error) {
            return res.status(200).json({
                msg:"Customer Record not Updated!!",
                error
            })
        }
    }

    static uploaddocument = async (req,res) => {
        const { customer_id } =req.body
        const upload_doc = req.file.path
        console.log(customer_id, upload_doc)
        try {
            var uploaddata = new documentmodal({
              customer_id,
              upload_doc : `http://localhost:${process.env.PORT_NO}/`+upload_doc

            })
            await uploaddata.save()
            return res.status(200).json({
                msg:"Profile pic Uploaded SuccesFully",
                post: uploaddata
            })
        } catch (error) {
            return res.status(500).json({
                msg:"Profile Pic NOt uploaded"
            })
        }
    }
    static fetchdocument = async (req,res) => {
        const { customer_id } = req.query
        console.log(customer_id)
        try {
            var data = await documentmodal.findOne({ customer_id })
            return res.status(200).json({
                record: data
            })
        } catch (error) {
            return res.status(200).json({
                error
            })
        }
    }

    static addtoCart = async (req, res) => {
        const {  product_id, product_quantity, product_brand, product_variant_name, product_description, product_price, product_imageurl } = req.body
        const { customer_id } = req.query 
        console.log("Customer_Id:", customer_id)
        console.log("Product:",req.body)
        try {
            let cart = await cartModal.findOne({ customer_id });
            console.log("Cart:==>", cart)
            if(cart) {
                let itemIndex = cart.products.findIndex(p => p.product_id == product_id)
                console.log("Index:", itemIndex)
                if (itemIndex > -1) {
                    //product exists in the Cart, update the quantity
                    let productItem = cart.products[itemIndex]
                    productItem.product_quantity=product_quantity
                    cart.products[itemIndex] = productItem
                    const cartitem = await cart.save()
                    return res.status(201).json({
                        msg: "Product Quantity Updated Successfully!!",
                        cartdetails: cartitem
                    })
                }else {
                     //product does not exists in cart, add new item
                     cart.products.push({
                        product_id,
                        product_quantity,
                        product_brand,
                        product_variant_name,
                        product_description,
                        product_price,
                        product_imageurl
                     })
                     const cartitem= await cart.save()
                     return res.status(201).json({
                        msg: "New Product Added to Cart",
                        cartdetails: cartitem
                     })
                }
            }else {
                //no cart for customer, create new cart
                const newCart = new cartModal({
                    customer_id,
                    products: [{product_id,
                        product_quantity,
                        product_brand,
                        product_variant_name,
                        product_description,
                        product_price,
                        product_imageurl
                    }]
                })
                const data = await newCart.save()
                return res.status(200).json({
                    msg: "Product Added to Cart Successfully",
                    cartdetails: data
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                msg: "Product Not Added to Cart",
                error: error
            })
        }
    }

    static changepassword = async (req, res) => {
        const { id } = req.query
        const { oldPass, newPass, conPass } = req.body

        try {
            const customer = await customerModal.findById(id)
            const oldHashPass = customer.password
            const checkPass = await bcrypt.compare(oldPass, oldHashPass)
            console.log(checkPass)
            if(oldPass && newPass && conPass) {
                if(checkPass){
                    if(newPass === conPass) {
                      const newHashPass = await bcrypt.hash(newPass, 10)
                      await customerModal.findByIdAndUpdate(
                        {
                            _id: customer._id,
                        },
                        {
                            $set: {
                                password: newHashPass,
                            },
                     },
                     {
                         new:true,
                        useFindAndModify: false,
                     }
                      )
                      return res.status(200).json({
                        msg: "Password changed successfully",
                      })
                    } else {
                        return res.status(400).json({
                            msg:"New password or confirm password doesn't match",
                        })
                    }
                }else {
                    return res.status(400).json({
                        msg: "Old password doesn't match"
                    })
                }
            } else{
                return res.status(400).json({
                    msg: "All Field Are Required"
                })
            }
        } catch (error) {
            return res.status(400).json({
                error: error,
            })
        }
    }

    static cartdetails = async (req, res) => {
        const { customer_id } = req.query
        try {
            let cart = await cartModal.findOne({ customer_id })
            console.log("Cart:==>", cart)
            return res.status(200).json({
                cartdetails: cart
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    }

    static deletecart = async (req, res) => {
        const { _id, product_id } = req.query
        console.log(_id, product_id)

        try {
            var cartdetail = await cartModal.findOne({_id})
            console.log(cartdetail)
            if(cartdetail != null) {
                var newarr = cartdetail.products.filter(
                  (cart) => cart.product_id !== product_id
                )
                console.log(newarr)
                const updateDetails = await cartModal.findByIdAndUpdate(
                    {_id},
                    {
                        $set: {
                            products: newarr,
                        },
                    },
                    {
                        new:true,
                        newFindAndModify: false,
                    }
                )
                return res.status(200).json({
                    msg: "Product Deleted Succesfully !",
                    cart: updateDetails
                })
            }
            return res.status(200).json({
                msg:"Product Not Available",
                cart: updateDetails,
            })
        } catch (error) {
            return res.status(400).json({
                msg: "Product Not Deleted",
                error:error
            })
        }
    }

    static emptycart = async (req, res) => {
        const { customer_id } = req.query
        
        try {
            await cartModal.deleteMany({
                customer_id })
                return res.status(200).json({
                    msg: "Cart is Empty Successfully",
                })
        } catch (error) {
            return res.status(400).json({
                error,
            })
        }
    }

    static checkout = async (req, res) => {
        const options = {
            amount: Number(req.body.amount) * 100,
            currency: "INR",
        }
        console.log("options:", options)

        try {
            const order = await instance.orders.create(options)
            console.log("Order:", order)
            res.status(200).json({
                success: true,
                order,
            })
        } catch (error) {
            console.log("CheckOut Error:", error)
            res.status(400).json({
                success: false,
                error,
            })
        }
    }

    static paymentVerification = async (req, res) => {
        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body

            console.log("Request Body:", req.body)

            const body = razorpay_order_id + "|" + razorpay_payment_id

            const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex")

            console.log(expectedSignature)

            const isAuthentic = expectedSignature === razorpay_signature

            console.log(isAuthentic)
            if(isAuthentic) {
                // Database comes here
                var result = await Payment.create({
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                })
                console.log(result)
                res.redirect(
                    `http://localhost:3000/customer/paymentsuccess?reference=${razorpay_order_id}`
                )
            } else {
                res.status(400).json({
                    success: false,
                })
            }
    }

    static order = async (req, res) =>{
        try{
            const { customer_id, orders } = req.body;

            // Check if the customer already has an order
            let existingOrder = await ordermodal.findOne({ customer_id })

            if (existingOrder) {
                // Add new order to the existing order
                existingOrder.orders.push(...orders)
                await existingOrder.save()
                return res.status(200).json({ message:"Order updated successfully" })
            }
            await ordermodal.create({ customer_id, orders })
            res.status(201).json({ message: "Order created successfully" })
        } catch (error) {
            console.log("Error processing order:", error)
            res.status(500).json({message: "Something went wrong"})
        }
    }

    static orderList = async (req, res) => {
    const { customer_id } = req.query
    try {
        var orders = await ordermodal.find({
            customer_id })
            return res.status(200).json({
                orderlist: orders,
            })
    } catch (error) {
        return res.status(400).json({
            error,
        })
    }
    }

    static profile = async (req,res) => {
        const { id } = req.query;
        try {
            var record = await customerModal.findOne({_id: id})
            return res.status(200).json({
                record: record
            })
        }catch {
            return res.status(400).json({
                error,
            })
        }
    }

    static profilepic = async (req, res) => {
        const { id } = req.query
        try {
            var data = await documentmodal.findOne({ customer_id: id})
            return res.status(200).json({
                data,
            })
        } catch (error) {
            return res.status(400).json({
                error,
            })
        }
    }

}
export default CustomerController