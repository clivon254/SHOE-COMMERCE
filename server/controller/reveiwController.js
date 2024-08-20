
import Reveiw from "../model/reveiwModel.js";
import { errorHandler } from "../utlis/error.js";


export const createReveiw = async (req,res,next) => {

    try
    {
        const {content,productId,userId} = req.body ;

        if(userId !== req.user.id)
        {
            return next(errorHandler(403,'You are not allowed to Comment'))
        }

        const newReveiw = new Reveiw({
            content,
            productId,
            userId
        })

        await newReveiw.save();

        res.status(200).json({success:true , newReveiw})
    }
    catch(error)
    {
        next(error)
    }

}

export const getProductReveiws = async (req,res,next) => {

    try
    {
        const reveiws = await Reveiw.find({productId:req.params.productId})
                                    .sort({createAt : -1})
        
        res.status(200).json({success:true , reveiws})
    }
    catch(error)
    {
        next(error)
    }
}

export const deleteReveiw = async (req,res,next) => {

    try
    {
        const reveiw = await Reveiw.findById(req.params.id)

        if(!reveiw)
        {
            return next(errorHandler(404, 'Reveiw not found'))
        }

        if(!req.user.isAdmin)
        {
            return next(errorHandler(403,'You are not allowed to delete'))
        }

        await Comment.findByIdAndDelete(req.params.id)

        res.status(200).json({success:true ,message:"reveiw has been deleted"})

    }
    catch(error)
    {
        next(error)
    }

}