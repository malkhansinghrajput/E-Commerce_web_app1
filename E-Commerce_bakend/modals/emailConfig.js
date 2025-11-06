import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, //admin email
    pass: process.env.EMAIL_PASS, //adminpass
  }
});
 export default transporter