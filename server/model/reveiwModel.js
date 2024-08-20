
import mongoose from "mongoose"

const ReveiwSchema = new mongoose.Schema({

    content:{type:String, required:true},

    productId:{type:String, required:true},

    userId:{type:String, required:true},
},
    {timestamps:true}
)

const Reveiw = mongoose.model('Reveiw', ReveiwSchema)


export default Reveiw ;

