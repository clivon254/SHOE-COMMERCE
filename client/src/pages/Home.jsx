


import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Store'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import { FaChevronLeft, FaChevronRight, FaCreditCard, FaCrown } from 'react-icons/fa';
import ItemCard from '../components/itemCard';
import Banner from '../components/Banner'
import Newsletter from '../components/Newsletter'
import sponsor1 from "../assets/sponsor1.png"
import sponsor2 from "../assets/sponsor2.png"
import sponsor3 from "../assets/sponsor2.png"
import sponsor4 from "../assets/sponsor4.png"

export default function Home() {

  const {products,setProduts} = useContext(StoreContext)

  const [sponsor ,SetSponsor] = useState([
    {
      img:sponsor1
    },
    {
      img:sponsor2
    },
    {
      img:sponsor3
    },
    {
      img:sponsor4
    },
  ])

  return (

    <div>

      <div className="">

        {/* banner */}
        <Banner />
        
        {/* offer */}
        <div className="">

        </div>

        {/* recent collection */}
         <div className="mt-5 px-5 py-5">

            <h2 className="subtitle">Recent collection</h2>

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
                      0: {
                        slidesPerView: 2,
                        spaceBetween:10
                      },
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

         {/* recent collection */}
         <div className="mt-5 px-5 py-5">

            <h2 className="subtitle">Recent offers</h2>

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
                      0: {
                        slidesPerView: 2,
                        spaceBetween:10
                      },
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
          <Newsletter/>

         {/* sponsors */}
        <div className="relative px-5 py-10 bg-slate-100">

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
                      0: {
                        slidesPerView: 2,
                        spaceBetween:10
                      },
                      640: {
                      slidesPerView:3 ,
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
                {sponsor?.map((sponsor,index) => (

                  <SwiperSlide key={index}>
                    
                    <div className="h-[150px] shadow-md border rounded-md">

                      <img 
                        src={sponsor.img}
                        alt="" 
                        className="w-full h-full" 
                      />

                    </div>

                  </SwiperSlide>

                ))}
              </Swiper>

        </div>
        
      </div>

    </div>
    
  )

}
