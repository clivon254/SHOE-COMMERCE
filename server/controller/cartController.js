import User from "../model/userModel.js"



export const addToCart = async (req,res,next) => {

    try
    {
        let userData = await User.findById(req.user.id)

        let cartData = await userData.cartData

        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else
        {
            cartData[req.body.itemId] += 1
        }


        await User.findByIdAndUpdate(req.user.id,{cartData})

        res.status(200).json({success:true , message:"Added to cart"})
    }
    catch(error)
    {
        next(error)
    }

}


export const removeFromCart = async (req,res,next) => {

    try
    {
        let userData = await User.findById(req.user.id)

        let cartData = await userData.cartData ;

        if(cartData[req.body.itemId] > 0)
        {
            cartData[req.body.itemId] -= 1 ;
        }

        await User.findByIdAndUpdate(req.user.id,{cartData})

        res.json({success:true ,message:"Removed from cart"})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCart = async (req,res,next) => {

    try
    {
        let userData = await User.findById(req.user.id)

        let cartData = await userData.cartData

        res.json({success:true ,cartData})
    }
    catch(error)
    {
        next(error)
    }

}