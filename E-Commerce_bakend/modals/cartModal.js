import mongoose from "mongoose";
const  CartSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cusrtomer"
    },
    products: [
        {
            product_id: {
                type: String,
                required: [true, "Product Id is required"],
                trim: true
            },
            product_quantity: {
                type: Number,
                required:[true, "Product Quantity is required"],
            },
            product_brand: {
                type: String,
                required:[true, "Product Brand is required"],
                trim: true
            },
            product_variant_name: {
                type: String,
                required: [true, "Product Description is required"],
                trim:true
            },
            product_description: {
                type:String,
                required: [true, "Product description is required"],
                trim:true
            },
            product_price: {
                type: Number,
                required:[true, "Product Price Is required"],
            },
            product_imageurl: {
                type: String,
                required: [true, "Product Image Url is required"],
                trim: true
            },
        }
    ],
    modifiedOn: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("cart", CartSchema)