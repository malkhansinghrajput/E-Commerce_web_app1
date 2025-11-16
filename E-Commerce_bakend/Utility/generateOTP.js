import crypto from "crypto"

// Generate OTP
function generateOTP(length = 6) {
    return crypto.randomInt(100000, 999999).toString();
}

export default generateOTP