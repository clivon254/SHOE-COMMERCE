


import React from 'react'

export default function Newsletter() {

  return (

    <section className="py-10 md:py-20 bg-blue-500 px-5">

        <div className="flex flex-col gap-y-5 gap-x-3 md:flex-row md:justify-between ">

            <h1 className="text-base font-bold text-white">Subscribe to our Newsletter </h1>

            <p className="text-xl font-semibold text-white">save more with coupon and up to 20% off </p>

            <div className="relative h-14 text-nowrap">

                <input 
                    type="text" 
                    className="focus:outline-none outline-none h-full border-none rounded-l-lg" 
                    placeholder="enter your email ....."
                />

                <button className="bg-black h-full  px-1 rounded-r-lg text-white font-semibold">subscribe</button>

            </div>

        </div>

    </section>

  )

}
