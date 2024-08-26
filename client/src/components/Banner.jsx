

import React from 'react'
import banner from "../assets/banner3.png"
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'

export default function Banner() {

  return (

    <section 
        className={` flex  flex-col-reverse md:flex-row  py-5 mx-auto  px-5 w-full `} 
        // style={{backgroundImage: `url(${banner})`}}
    >

        <div className="max-w-2xl">

            <span className="text-xl font-semibold mb-4 block ">Hot Promotion</span>

            <h1 className="text-4xl leading-[1.4] font-bold">
                Fashion Trending <br/> <span className="text-blue-500 text-5xl">Great collections</span>
            </h1>

            <p className="my-6 text-base font-semibold ">
                save more with coupons and up 20% off
            </p>

            <Link>

                <Button
                 gradientDuoTone="purpleToBlue"
                 outline
                >
                    Shop Now
                </Button>

            </Link>

        </div>

        <img 
            src={banner}
            alt="" 
            className="h-[300px] md:w-[500px] w-[80%] mx-auto" 
        />

    </section>

  )

}
