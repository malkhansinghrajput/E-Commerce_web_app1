import mongoose from "mongoose";
//mongodb://127.0.0.1:27017
const connectDb = async (DB_URL,DB_Name) => {
   try {
    await mongoose.connect(DB_URL+DB_Name)
    console.log("Database connected Successfully")
   } catch (error) {
        console.log("Database not connected!!")
   } 
} 

export default connectDb
