import customerModal from "../modals/customerModal.js";
import jwt from 'jsonwebtoken'

const checkCustomerAuth = async (req, res, next) => {
    let token 
    const { authorization } = req.headers
    console.log("Authorization=======>", authorization)
    try {
        if(authorization && authorization.startsWith('Bearer')) {
            var arr = authorization.split(' ')
            console.log(arr)
            console.log("Token========>", arr[1])
            token = arr[1]
            console.log("===============================")
        //  Verify token
        const { customer_id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
         console.log("==================================")
         req.customer = await customerModal.findById(customer_id).select('-password')
         console.log("Customer Details:", req.customer)
         next() 
        }

    } catch (error) {
        return res.status(400).json({
            msg:"Token Expire",
            Error: error
        })
    }
    if(!token){
         return res.status(401).json({
            msg: "Unauthorized Customer, no Token"
         })
    }
}
export default checkCustomerAuth