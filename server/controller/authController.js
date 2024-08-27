
import User from "../model/userModel.js";
import { errorHandler } from "../utlis/error.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = async (req,res,next) => {

    const {username,email,password} = req.body ;
    
    if(!username || !password || !email || username === "" || email === "" || password === "")
    {
        return next(errorHandler(400, 'All fields are required'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try
    {
        await newUser.save()

        res.json({success:true, newUser})
    }
    catch(error)
    {
        next(error)
    }

}

export const signin = async (req,res,next) => {

    const {email,password} = req.body ;

    if(!email || !password || email === '' || password === '')
    {
        next(errorHandler(400, "All fields are required"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return res.json({success:false, message:"User Doesn't exist"})
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            return res.json({success:false, message:"Invalid password"})
        }

        const token = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin},
            process.env.JWT_SECRETE
        )
        
        const { password:pass , ...rest} = user._doc ;

        res.status(200)
           .cookie('access_token',token,{httpOnly:true})
           .json({success:true ,rest})
 
    }
    catch(error)
    {
        next(error)
    }

}

export const google = async (req,res,next) => {

    try
    {
        const user = await User.findOne({email: req.body.email })

        if(user)
        {
            const token = jwt.sign(
                {id:user._id, isAdmin:user.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass , ...rest} = user._doc ;
    
            res.status(200)
                .cookie('access_token', token , {httpOnly:true})
                .json({success:true ,rest})
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                                     Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

            const newUser = new User({
                username:req.body.name.split(' ').join('').toLowerCase() +  Math.random().toString(36).slice(-8),
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })

            await new User.save();

            const token = jwt.sign(
                {id:newUser._id, isAdmin:newUser.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass , ...rest} = newUser._doc ;
    
            res.status(200)
                .cookie('access_token', token , {httpOnly:true})
                .json({success:true ,rest})

        }
    }
    catch(error)
    {
        next(error)
    }

}

export const signout = async (req,res,next) => {

    try
    {
        res.clearCookie('access_token')
            .status(200)
            .json({success:true , message:"You have successfully sign out"})

    }
    catch(error)
    {
        next(error)
    }

}