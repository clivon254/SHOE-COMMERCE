

import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    userId:{type:String , required:true},

    itema:{type:Array , required:true},

    amount:{type:Number , required:true},

    address:{type:Object, required:true},

    status:{type:String , default:"Food Processing"},

    date:{type:String , default:Date.now()},

    payment:{type:Boolean , required:false},

    phone:{type:Number, required:true}

},{timestamps:true})

const Order = mongoose.model("Order", orderSchema)

export default Order 