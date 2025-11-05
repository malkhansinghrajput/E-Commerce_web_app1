import  fs  from "fs";
import productmodal from "../modals/productModal.js";
import customerModel from '../modals/customerModal.js'
import documentmodal from "../modals/documentModal.js";

class AdminController {
    static addproduct = async (req, res ) => {
        const {
            product_brand, product_variant_name, product_category, product_mrp, product_sp, product_discount, product_color, product_size, product_description, product_quantity, product_availability } = req.body
            console.log(req.body)
            const productimage = req.files
            console.log(productimage)
            var newprod = productimage.map((data)=> {
                return {
                    type: data.mimetype,
                    name: data.filename,
                    path: `http://localhost:${process.env.PORT_NO}/` + data.path,
                    size: data.size
                }

            })
            console.log(newprod)
            try {
                const uploadproduct = new productmodal({
                    product_brand,
                    product_category,
                    product_color,
                    product_sp,
                    product_mrp,
                    product_discount,
                    product_size,
                    product_description,
                    product_quantity,
                    product_availability,
                    product_variant_name,
                    product_imageurl: newprod
                })
                await uploadproduct.save()
                return res.status(200).json({
                    msg:"Product Added Successfully",
                    products: uploadproduct
                })
            } catch (error) {
                return res.status(400).json({error:error})
            }
    }
     
    static deleteproduct = async (req, res) => 
        {
        const { product_id} = req.query
        console.log(product_id)
        try {
            var data = await productmodal.findByIdAndDelete({_id: product_id})

            for (const obj of data.product_imageurl){
             fs.unlink(`./multipleuploaddocuments/${obj.name}`, (err) => {
                if(err) {
                    console.log("File is not deleted:",err)
                }else {
                    console.log("File deleted succesfully")
                }
             })
            }
            return res.status(200).json({
                msg:"Product Deleted Successfully"
            })
        } catch (error) {
            return res.status(400).json({
                msg: "Product not Deleted",
                err: error
            })
        }
    }

   static editproduct = async (req, res) => {
        const { product_id } = req.query
        console.log(product_id)
       
        console.log(req.body)
        const updateData = req.body;
        //new images
        const productimagearr = req.files
        console.log(productimagearr)
        if (req.files && req.files.length > 0) {
            var newprod = productimagearr.map((data) => {
                return {
                    type: data.mimetype,
                    name: data.filename,
                    path: `http://localhost:${process.env.PORT_NO}/` + data.path,
                    size: data.size
                }
            })
            console.log("New Product:", newprod)
            updateData.product_imageurl = newprod
        }
        try {
            var data = await productModal.findById({ _id: product_id })
 
            for (const obj of data.product_imageurl) {
                fs.unlink(`./multipleuploadproducts/${obj.name}`, (err) => {
                    if (err) {
                        console.log("File is not deleted:", err)
                    } else {
                        console.log("File delete successfully")
                    }
                });
            }
            var updatedProduct = await productModal.findByIdAndUpdate({ _id: product_id },
                {
                    $set: req.body
                }, {
                new: true,
                newFindAndModify: false
            })
            if (!updatedProduct)
                return res.status(404).json({
                    error: 'Product not found'
                });
 
            return res.status(200).json({
                msg: "Product Updated Successfully",
                product: updatedProduct
            })
        } catch (error) {
            return res.status(400).json({
                msg: "Product Not Updated",
                err: error
            })
        }
 
    }

    static  managecustomerstatus = async (req, res) => {
        const { id, s } = req.query
        console.log(id, s)
        try {
            if (s === "block") {
                var customer = await 
                customerModel.findByIdAndUpdate({ _id: id}, {
                    $set: {
                        status: 0
                    }
                },{
                    new: true,
                    useFindAndModify: false
                })
                return res.status(200).json({
                    record: customer
                })
            } else if(s == "verify") {
                var customer = await 
                customerModel.findByIdAndUpdate({_id: id}, {
                    $set: {
                        status: 1
                    }
                }, {
                    new: true,
                    useFindAndModify: false
                })
                return res.status(200).json({
                    record:customer
                })
            } else {
                await customerModel.findByIdAndDelete({_id: id})
                return re.status(200).json({
                    msg: "Customer Record Deleted Successfully"
                })
            }
        } catch (error) {
          return res.status(400).json({
            error
          })  
        }
    }

    static allcustomer = async (req,res) => {
       try{
        var customers = await customerModel.find()
        return res.status(200).json({
            record:customers
        })
       } catch (error){
          console.log(error)
          return res.status(400).json({
            error: error
          })
       }
    }

   static profile = async (req,res) => {
        const { id } = req.query;
        try {
            var record = await customerModel.findOne({_id: id})
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
            var data = await documentmodal.findOne({customer_id: id})
            return res.status(200).json({
                data,
            })
        } catch (error) {
            return res.status(400).json({
                error,
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
                  upload_doc : `http://localhost:${process.env.PORT_NO}/`+ upload_doc
    
                })
                await uploaddata.save()
                return res.status(200).json({
                    msg:"Profile pic Uploaded SuccesFully",
                    post: uploaddata
                })
            } catch (error) {
                return res.status(400).json({
                    msg:"Profile Pic NOt uploaded"
                })
            }
        }

    }


export default AdminController