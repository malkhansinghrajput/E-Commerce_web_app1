import mongoose from "mongoose";

const connectDb = async (DB_URL, DB_NAME) => {
   try {

      await mongoose.connect(DB_URL, {
         dbName: DB_NAME
      })

      console.log("Database connected Successfully")

   } catch (error) {

      console.log(error.message)

   }
}

export default connectDb