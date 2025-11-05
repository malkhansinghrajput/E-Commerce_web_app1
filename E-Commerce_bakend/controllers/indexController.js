import customerModal from "../modals/customerModal.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import productmodal from "../modals/productModal.js"
import transporter from "../modals/emailConfig.js"
import generateOTP from "../Utility/generateOTP.js"
import OTP from "../modals/otpModal.js"


class IndexController {
    static register = async (req, res) => {
        //get data from front end
        const { name, email, password, mobile, country, state, city, gender, address, pincode } = req.body
        console.log(req.body)
        try {
            //logic for email checking
            var isExist = await customerModal.findOne({ email })
            console.log(isExist)
            if (isExist) {
                return res.status(400).json({
                    "msg": "Email Already Exists"
                })
            }
            //logic for creating hash password
            var hashpassword = await bcrypt.hash(password, 10)
            console.log(hashpassword)
            var custObj = new customerModal({
                name,
                email,
                password: hashpassword,
                mobile,
                country,
                state,
                city,
                gender,
                address,
                pincode
            })


            var data = await custObj.save()
            return res.status(200).json({
                "record": data,
                "msg": "Customer Register Successfully"
            })
        } catch (error) {
            return res.status(200).json({
                "error": error,
                "msg": "Customer Not Register!"
            })
        }
    }
    static login = async (req, res) => {
        const { email, password } = req.body
        try {
            var customer = await customerModal.findOne({ email })
            if (customer) {
                var check = await bcrypt.compare(password, customer.password)
                console.log(check)
                if (customer.email === email && check) {
                    const token = jwt.sign({
                        customer_id: customer._id
                    }, process.env.JWT_SECRET_KEY, { expiresIn: '5d'})

                    return res.status(200).json({
                        record: customer,
                        token:token,
                        msg: "Customer Login Successfully"
                    })
                } else {
                    return res.status(400).json({
                        msg: "Email or Password is invalid!!"
                    })
                }
            } else {
                return res.status(400).json({
                    msg: "Email not register"
                })
            }
        } catch (error) {
            return res.status(400).json({
                error: error
            })
        }
    }
    static products = async (req, res) => {
        try {
            var products = await productmodal.find()
            return res.status(200).json({
                products: products
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error
            })
            
        }

    }
    static productdetails = async (req, res) => {
        const {pid} = req.query
        try {
           var product = await productmodal.find({_id:pid})
           return res.status(200).json({
            product: product
           }) 
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }

    static senduserpassworresetemail = async (req, res) => {
        console.log("Request Body:", req.body)
        const { email } = req.body
        try {
            if (email) {
                const customer = await customerModal.findOne({ email })
                if( customer ){
                    const secret = customer._id + process.env.JWT_SECRET_KEY
                   
                    const token = jwt.sign({
                        customer_id: customer._id }, secret, {expiresIn: '30m'})

                        const link = "http://localhost:3000/forgotpassword?id=" + customer._id + "&token=" + token

                        var mailOption = {
                            from: process.env.EMAIL_USER, //sender address
                            to: customer.email, //list of receivers
                            subject: "Reset Password", //Subject line
                            text: "Link for Password Reset", //plain text body
                            html: "<h3>Hii" + customer.name + ", Please copy this link <a href=" + link + "> and reset your password</a></h3>"

                        }
                        await transporter.sendMail(mailOption)
                        return res.status(200).json({
                            msg: "Password Reset Email Send ...Please check Your Email",
                            id: customer._id,
                            token:token
                        })
                } else {
                    return res.status(400).json({
                        msg: "Email does not exist.",
                    })
                }
            }else {
                 return res.status(400).json({
                    msg: "Email Field are required"
                 }) 
            }
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
    static userpasswordreset = async (req, res) => {
        const { password, confirm_password } = req.body
        const { id, token } = req.query
        console.log("get: ====>", id,token)
        console.log(password, confirm_password)
        try {
            const customer = await customerModal.findById(id)
            const new_secret = customer._id + process.env.JWT_SECRET_KEY
            const { customer_id } = jwt.verify(token, new_secret)
            console.log(customer_id)

            if( password && confirm_password) {
                if(password !== confirm_password){
                    return res.status(400).json({
                        msg: "New Password and Confirm Password Doesn't match",
                    })
                }else{
                    const newHashPassword = await bcrypt.hash(password, 10)
                    console.log(customer._id)
                    const data = await customerModal.findByIdAndUpdate({_id: customer._id },
                        {
                            $set:
                            {
                                password:
                                newHashPassword
                            }
                        },
                        {
                            new: true,
                            useFindAndModify:
                            false
                        })
                        return res.status(200).json({
                            msg: "Password reset Successfully",
                            record: data
                        })
                }
            }else {
                return res.status(400).json({
                    msg: "All Fields Required"
                })
            }
        } catch (error) {
            return res.status(400).json({
                msg: "Invalid Token"
            })
        }
    }

    static sendotp = async (req, res) => {
        const { identifier } = req.body //email

        if (!identifier) {
            return res.status(400).json(
                { message: 'Identifier is required' })
        }
        const otp = generateOTP();
        try {
            // Save OTP
            await OTP.create({ identifier, otp})

             //Send email
             await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: identifier,
                subject: 'Your OTP Code',
                 text: `Your OTP is ${otp}. It will expire in 5 minutes.`,

             })

             res.status(200).json({ message: 'OTP sent successfully'})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Failed to send OTP'
            })
        }
    }
  // Verify OTP API
    static verifyotp = async (req, res) => {
        const { identifier, otp } = req.body

        const record = await OTP.findOne({ identifier, otp});
        
        if (record) {
            await OTP.deleteOne({_id: record._id }) // invalidate OTP
            res.status(200).json({ message: 'OTP verified successfully'});
        } else {
             res.status(400).json({ message: 'Invalid or expired OTP'})
        }
    }

    static filterproduct = async (req, res) => {
        try {
            const { product_variant_name, priceMin, priceMax, ratingMin, inStock } = req.query;
            console.log(req.query)

            // Build filter object
             let filter = {}

             if (product_variant_name) {
                // Split comma-separated string into an array
                const categoryFilter = product_variant_name ? product_variant_name.split(',').map(cat => cat.trim()) : [];
                filter = categoryFilter.length > 0 ? {
                    product_variant_name: {
                        $in: categoryFilter,
                    },
                }
                : {};
                console.log(filter)
                //filter.product_category = filter;
       }
       if (priceMin || priceMax) {
        filter.product_sellingprice = {};
        if (priceMin) filter.product_sellingprice.$gte = priceMin;
        if (priceMax) filter.product_sellingprice.$lte = priceMax;
       }
       if (ratingMin) {
        filter.product_rating = { $gte: ratingMin };
       }
       if (inStock) {
        filter.product_availabilty = "In Stock";
       }
       console.log(filter);
       // Fetch products based on filters
       const products = await productmodal.find(filter)
       res.status(200).json(products)
    } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default IndexController