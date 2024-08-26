


import React, { useContext } from 'react'
import { StoreContext } from '../context/Store'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import { FaChevronLeft, FaChevronRight, FaCreditCard, FaCrown } from 'react-icons/fa';
import ItemCard from '../components/itemCard';

export default function Home() {

  const {products,setProduts} = useContext(StoreContext)



  return (

    <div>

      <div className="">

        {/* banner */}
        <div className=""></div>
        
        {/* offer */}
        <div className=""></div>

        {/* recent collection */}
         <div className="mt-5">

            <h2 className="subtitle">Related products</h2>

            <div className="relative ">

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

        {/* newsletter */}
        <div className=""></div>

        {/* sponsors */}
        <div className=""></div>

      </div>

    </div>
    
  )

}
