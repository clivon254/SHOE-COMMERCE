
import { Button } from 'flowbite-react'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function ItemCard({product}) {

  return (

    <div className="relative w-[250px] md:w-full group border shadow-md flex flex-col gap-3 p-3 rounded-lg">
        
        {/* image section */}
        <div className=" w-full h-[250px]">

            <Link to={`/productDetail/${product?._id}`} >

                <img 
                    src={product?.imageUrls[0]} 
                    alt="productImage" 
                    className=" rounded-lg cursor-pointer bg-blue-500 w-full h-full shadow-lg" 
                />

            </Link>

        </div>

        {/* wordings */}
        <div className="flex flex-col gap-2">

            <h2 className="text-sm font-normal text-gray-600">{product?.tag}</h2>
            
            {/* title */}
            <div className="flex items-center justify-between">

                <h2 className="text-xl mb-1 font-bold capital tracking-wide">{product?.name}</h2>

                <h2 className="text-xs font-bold">{product?.brand}</h2>

            </div>

            {/* prices */}
            <div className="flex items-center gap-2">

                {
                    product.discountedPrice && (
                        <span className="text-2xl font-bold text-rose-500 tracking-wider"></span>
                    )
                }

                <span className={`${product?.discountedPrice ? "text-sm text-gray-600 tracking-wide line-through":"text-2xl font-bold text-rose-500 tracking-wider"}text-2xl font-bold text-rose-500 tracking-wider`}>${product.regularPrice}</span>

            </div>

            <Button 
                gradientMonochrome="cyan"
                className="absolute bottom-4 right-2 pill"
            >

                <FaShoppingCart />

            </Button>

        </div>

    </div>

  )

}
