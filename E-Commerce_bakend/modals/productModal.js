import mongoose from 'mongoose'

const productSchema = mongoose.Schema ({
    product_brand:{
        type:String,
        required:[true,"Product Brand is required"],
        trim:true
    },
    product_variant_name: {
        type:String,
        required:[true, "Product Variant name is required"],
        trim:true
    },
    product_description: {
        type:String,
        required:[true, "Product Category is required"],
        trim:true
    },
    product_color: {
          type:String,
          required:[true, "Color is required"],
          trim:true
    },
    product_category:{
        type:String,
        required:[true,"Product Category is Required"],
        trim:true
    },
    product_mrp: {
        type:Number,
        required: [true,"Product Maximum Retail Price required"],
    },
    product_sp:{
        type:Number,
        required:[true,"Product Selling price is required"]
    },
    product_discount: {
        type: Number,
        required:[true, "Product Discount is required"]
    },
    product_size: {
        type : String,
        required:[true, "Product size is requred"],
        trim: true
    },
    product_quantity: {
        type:Number,
        required:[true,"Product Quantity is required"],
        default:1
    },
    product_availability: {
        type : String,
        required: [true, "Product Availabilty is required"],
        trim:true   
    },
    product_imageurl: {
        type: Array,
        required:[true, "Product Image URL is required"],
        default:[
            {
                name: {
                    type:String,
                    required: [true, "Originalname is required"],
                    trim:true
                },
                mimetype: {
                    type:String,
                    required:[true, "mimetype is requred"],
                    trim:true
                },
                path:{
                    type:String,
                    requred:[true, "path is required"],
                    trim:true
                },
                size: {
                    type:String,
                    required:[true, "size is required"],
                }
            }
        ]
    }
})

const productmodal = mongoose.model("product", productSchema)

export default productmodal