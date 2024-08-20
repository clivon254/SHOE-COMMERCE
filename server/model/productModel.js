

import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    name:{type:String, required:true},

    inStock:{type:Number, required:true},

    regularPrice:{type:Number, required:true},

    discountedPrice:{type:Number},

    offer:{type:Boolean, default:false},

    brand:{type:String, required:true},

    tag:{type:String, required:true},

    description:{type:String, required:true},

    imageUrls:{type:Array, default:[] }

},{timestamps:true})

const Product = mongoose.model('Product', productSchema)

export default Product ;