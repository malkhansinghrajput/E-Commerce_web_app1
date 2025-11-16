import mongoose from "mongoose";

//  OTP Schema 
const otpSchema = new mongoose.Schema({
    identifier: String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
        // expires in 5 mins
    },
})

const OTP = mongoose.model('otp', otpSchema)
export default OTP