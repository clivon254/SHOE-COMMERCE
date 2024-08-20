
import Product from "../model/productModel.js"
import { errorHandler } from "../utlis/error.js"


export const addProduct = async (req,res,next) => {

    const {name,description,regularPrice,inStock,tag,brand} = req.body

    try
    {
        const product = new Product({
            name,
            description,
            regularPrice,
            inStock,
            brand,
            tag
        })

        await product.save()

        res.json({success:true , product , message: `${name} has been added successfully`})

    }
    catch(error)
    {
        next(error)
    }

}

export const listProduct = async (req,res,next) => {

    try
    {
        const limit = parseInt(req.query.limit) || 12 ;

        const startIndex = parseInt(req.query.startIndex) || 0 ;

        let offer = req.query.offer ;

        if (offer === undefined || offer === 'false') {

            offer = { $in: [false, true] };

        }

        const searchTerm = req.query.searchTerm || '' ;

        const sort = req.query.sort || 'createdAt' ;

        const order = req.query.order || 'desc'

        const products = await Product.find({
            name:{$regex:searchTerm, $options:'i'},
            offer
        })
        .sort({[sort]:order})
        .limit(limit)
        .skip(startIndex)

        res.status(200).json({success:true ,products})
    }
    catch(error)
    {
        next(error)
    }
}

export const product = async (req,res,next) => {

    try
    {
        const product = await Product.findById(req.params.productId)

        res.status(200).json({success:true , product})
    }
    catch(error)
    {
        next(error)
    }
}

export const deleteProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to delete this post"))
    }

    try
    {
        await Product.findByIdAndDelete(req.params.productId)

        res.status(200).json({success:true, message:"The product has been deleted"})
    }
    catch(error)
    {
        next(error)
    }
}

export const updateProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,'You are not allowed not allowed to update this product'))
    }

    const product = await Product.findById(req.params.productId)

    if(!product)
    {
        return next(errorHandler(404, "product not found"))
    }

    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                $set:{
                    name:req.body.name,
                    description:req.body.description,
                    regularPrice:req.body.regularPrice,
                    discountedPrice:req.body.discountedPrice,
                    tag:req.body.tag,
                    band:req.body.band,
                    inStock:req.body.inStock,
                    imageUrls:req.body.imageUrls,
                }
            },
            {new :true}
        )

        res.status(200).json({success:true , updatedProduct})
    }
    catch(error)
    {
        next(error)
    }
}