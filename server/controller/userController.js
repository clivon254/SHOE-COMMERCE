import User from "../model/userModel.js"
import { errorHandler } from "../utlis/error.js"
import bcryptjs from "bcryptjs"



export const updateUser = async (req,res,next) => {

    if(req.user.id !== req.params.userId)
    {
        return next(errorHandler(401,'You can only update your own account'))
    }

    try
    {
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                }
            },
            {new:true}
        )

        const {password, ...rest} = updatedUser._doc

        res.status(200).json({success:true , rest})
    }
    catch(error)
    {
        next(error)
    }

}

export const deleteUser = async (req,res,next) => {

    if( !req.user.isAdmin && req.user.id !== req.params.userId)
    {
        return next(errorHandler(401,'You can not  delete the user '))
    }

    try
    {
        await User.findByIdAndDelete(req.params.userId)

        res.clearCookie('access_token')

        res.status(200).json({success:true ,message:"User has been deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}

export const getUser = async (req,res,next) => {

    try
    {
        const user = await User.findById(req.params.userId)

        if(!user)
        {
            return next(errorHandler(404,'User not found'))
        }

        const {password:pass, ...rest} = user._doc ;

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }

}