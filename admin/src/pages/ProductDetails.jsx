
import React, { useContext, useState ,useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios"
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"

// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/Store';
import { Button, Spinner } from 'flowbite-react';
import { FaChevronLeft, FaChevronRight, FaCreditCard, FaCrown } from 'react-icons/fa';
import { GrPowerCycle } from 'react-icons/gr';
import ItemCard from '../components/itemCard';
import Reveiw from '../components/Reveiw';


export default function ProductDetails() {

    const {url,products} = useContext(StoreContext)

    const params = useParams()

    const [loading , setloading] = useState(false)

    const [error, setError] = useState(null)

    const [product, setProduct] = useState(null)

    useEffect(() => {

      if(params.productId)
      {
        window.scrollTo({top:0 ,left:0 ,behavior:"smooth"})
      }

      const fetchProduct = async () => {

        setloading(true)

        setError(null)

        try
        {
          const res = await axios.get(url + `/api/product/get-product/${params.productId}`)

          if(res.data.success)
          {
            setProduct(res.data.product)

            setloading(false)

            setError(null)
          }
          
        }
        catch(error)
        {
          console.log(error)

          setError(error.message)

          setloading(false)
        }

      }

      fetchProduct()

    },[params.productId])


    return (

    <main className="px-3">

      {loading && (
        <p className="text-center text-2xl">
           <Spinner/>  Loading...
        </p>
      )}

      {error && (

        <p className="">Something went wrong</p>

      )}

     {product && (<div className="contain">

        {/* product */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 my-20">

          {/* right */}
          <div className="">

            <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto stick top-[50px]">

              <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={80}
                className="productCarousel "
              >

                {product?.imageUrls?.map((image,index) => (

                  <img 
                    src={image}
                    alt={`image ${index + 1}`}
                    className="" 
                  />

                ))}
              </Carousel>

            </div>

          </div>

          {/* left */}
          <div className="flex flex-col gap-8">

            {/* title,prices */}
            <div className="flex flex-col gap-3">

              <h2 className="text-4xl flex-col gap-3 semibold tracking-wide">
                {product?.name}
              </h2>

              <h3 className="text-rose-600 text-sm">

                <span className="text-gray-600">Brand</span> : {product?.brand}

              </h3>

              {/* prices */}
              <div className="border-y border-gray-300 py-4 flex items-center">

                {
                  product?.discountedPrice && (

                    <span className="font-bold text-rose-600 line-through tracing-wide">${product?.discountedPrice}</span>

                  )
                }

                <span className={`${product?.discountedPrice ? " text-gray-500 line-through  font-semibold " :"text-rose-600 text-3xl"} `}>${product?.regularPrice}</span>

                {
                  product?.discountedPrice && (

                    <span className="text-gray-600 text-sm font-semibold">{ 100 - (product?.discountedPrice/product?.regularPrice * 100)} % discount</span>

                  )
                }

              </div>

              {/* description */}
              <p className="text-sm text-gray-600 leading-7">
                {product?.description}
              </p>

            </div>

            {/* ploicies */}
            <div className="flex flex-col gap-2">

              <h3 className="flex items-center gap-2">
                
                <span className=""><FaCrown/></span>

                <span className="">1 year brand Waranty</span>

              </h3>

              <h3 className="flex items-center gap-2">
                
                <span className=""><GrPowerCycle/></span>

                <span className="">30 Day Return policy</span>

              </h3>

              <h3 className="flex items-center gap-2">
                
                <span className=""><FaCreditCard/></span>

                <span className="">cash on Delivery available</span>

              </h3>

            </div>

            {/* color and size */}
            <div className="">

              <div className="flex items-start gap-5">

                <span className="text-xl font-bold"> size: </span>
                
                <div className="flex gap-3 flex-wrap">

                  <span className="h-10 w-10 border-black border-2 rounded-full flex items-center justify-center hover:border-rose-600 cursor-pointer font-bold">36</span>

                  <span className="h-10 w-10 border-black border-2 rounded-full flex items-center justify-center hover:border-rose-600 cursor-pointer font-bold">38</span>

                  <span className="h-10 w-10 border-black border-2 rounded-full flex items-center justify-center hover:border-rose-600 cursor-pointer font-bold">40</span>

                  <span className="h-10 w-10 border-black border-2 rounded-full flex items-center justify-center hover:border-rose-600 cursor-pointer font-bold">41</span>

                  <span className="h-10 w-10 border-black border-2 rounded-full flex items-center justify-center hover:border-rose-600 cursor-pointer font-bold">42</span>

                  <span className="h-10 w-10 border-black border-2 rounded-full flex items-center justify-center hover:border-rose-600 cursor-pointer font-bold">44</span>
                  
                </div>

              </div>

            </div>
            
            {/* buttons */}
            <div className="flex flex-col gap-2 lg:flex-row">

              <Button
                gradientMonochrome="failure"
                className='w-full'
                disabled={product?.inStock < 1}
              >
                Add To Cart
              </Button>

              <Button
                gradientDuoTone="purpleToPink"
                className='w-full'
                disabled={product?.inStock < 1}
              >
                Proceed to Check Out
              </Button>

            </div>
            
            <hr/>

            {/* tags,stocks */}
            <div className="flex flex-col gap-2">

                <h2 className="text-base text-gray-600 flex items-center gap-x-2">

                  <span className="">SKU :</span>

                  <span className="">FWM15KVT</span>

                </h2>

                <h2 className="text-base text-gray-600 flex items-center gap-x-2">

                  <span className="">Tags:</span>

                  <span className="">{product?.tag}</span>

                </h2>

                <h2 className="text-base text-gray-600 flex items-center gap-x-2">

                  <span className="">Availabilty :</span>

                  <span className="">{product?.inStock}</span>

                </h2>

            </div>

          </div>

        </div>
        
        {/* others */}
        <div className="flex flex-col gap-10">

          {/* related */}
          <div className="">

            <h2 className="text-3xl my-5 mb-10 font-semibold">Related products</h2>

            <div className="relative mx-auto">

              <Swiper
                  className="mySwiper"
                  spaceBetween={10}
                  slidesPerveiw={2}
                  Loop={"true"}
                  autoPlay={
                  {
                      delay:2000,
                      disableOnInteraction:false
                  }
                  }
                  modules={[Autoplay,Navigation]}
                  breakpoints={{
                      640: {
                      slidesPerView:2 ,
                      spaceBetween: 20,
                      },
                      768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                      },
                      1024: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                      },
                  }} 
                  navigation={{
                  prevEl:'.prev',
                  nextEl:'.next'
                  }}
               >
                {products?.map((product,index) => (

                  <SwiperSlide key={index}>

                    <ItemCard product={product}/>

                  </SwiperSlide>

                ))}
               </Swiper>

               {/* navigation btns */}
               <div className="next absolute z-50 -top-16 right-0 h-6 justify-center cursor-pointer">

                  <FaChevronRight className="text-sm font-bold"/>

               </div>

               <div className="prev absolute z-50 -top-16 right-12 h-6 justify-center cursor-pointer">

                  <FaChevronLeft className="text-sm font-bold"/>

               </div>

            </div>

          </div>

          {/* reveiws */}
          <Reveiw productId={product?._id}/>

        </div>

      </div> )}

    </main>

  )
  
}
