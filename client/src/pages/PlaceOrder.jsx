

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Store'
import { useNavigate } from 'react-router-dom'
import { TextInput,Button } from 'flowbite-react'
import axios from "axios"

export default function PlaceOrder() {

    const {getTotalCartAmount,token,products,cartItems,url} = useContext(StoreContext)

    const [data, setData] = useState({
        // firstName:"",
        // lastName:"",
        // email:"",
        // city:"",
        // state:"",
        // zipcode:"",
        // country:"",
        // phone:""
    })

    // onChangeHandler
    const onChangeHandler = (event) => {

        const name = e.target.name ;

        const value = event.target.value ;

        setData(data => ({...data,[name]:value}))
    }

    // placeOrder
    const placeOrder = async (event) => {

        event.preventDefault()

        let orderItems = []

        products.map((item) => {

            if(cartItems[item._id] > 0)
            {
                let itemInfo = item;

                itemInfo["quantity"] = cartItems[item._id]

                orderItems.push(itemInfo)
            }

        })

        let orderData = {
            address:data,
            items:orderItems,
            amount:0 
        }

        let res = await axios.post(url + "/api/order/place-order",orderData,{headers:{token}})

        if(response.data.success)
        {}
        else
        {
            console.log(error)
        }

    }

    const navigate = useNavigate()

    return (

        <div className="px-5 py-7">

            <form onSubmit={placeOrder} className="w-full flex flex-col md:flex-row gap-x-20 gap-y-10">

                <div className="flex flex-col gap-y-6 md:w-[60%]">

                    <h2 className="subtitle">Delivery Information</h2>

                    {/* first and last Name */}
                    <div className="flex flex-col gap-y-3 md:flex-row gap-x-5">

                        <TextInput 
                            required
                            type="text"
                            className="w-full"
                            name="firstName"
                            value={data.firstName}
                            placeholder="first Name"
                        />

                        <TextInput 
                            required
                            type="text"
                            className="w-full"
                            name="lastName"
                            value={data.lastName}
                            placeholder="Last Name"
                        />

                    </div>

                    {/* email */}
                    <TextInput
                        required
                        type="email"
                        className=""
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder='Email Address'
                    />

                    {/* street */}
                    <TextInput
                        required
                        type="text"
                        className=""
                        name="street"
                        value={data.street}
                        onChange={onChangeHandler}
                        placeholder='street'
                    />

                    {/* city & state */}
                    <div className="flex flex-col gap-y-3 md:flex-row gap-x-5">

                        <TextInput
                            required
                            type="text"
                            className="w-full"
                            name="city"
                            value={data.city}
                            onChange={onChangeHandler}
                            placeholder='city'
                        />

                        <TextInput
                            required
                            type="text"
                            className="w-full"
                            name="state"
                            value={data.state}
                            onChange={onChangeHandler}
                            placeholder='state'
                        />
                    
                    </div>

                    {/* phone */}
                    <TextInput
                        required
                        type="text"
                        className=""
                        name="phone"
                        value={data.phone}
                        onChange={onChangeHandler}
                        placeholder='phone'
                    />
                    

                </div>

                <div className="md:w-[40%]">

                    <h2 className="subtitle">Cart Totals</h2>

                    <div className="flex flex-col gap-5">

                        {/* subtotal */}
                        <div className="flex items-center gap-x-5 ">

                            <p className="text-xl font-semibold">Subtotal</p>

                            <p className="text-xl font-bold">${0}</p>

                        </div>

                        <hr/>

                        {/* delivery charges */}
                        <div className="flex items-center gap-x-5 ">

                            <p className="text-xl font-semibold">Delivery Charges</p>

                            <p className="text-xl font-bold">${2}</p>

                        </div>

                        <hr/>

                        <div className="flex items-center gap-x-5 ">

                            <p className="text-xl font-semibold">Total</p>

                            <p className="text-xl font-bold">${0 + 2}</p>

                        </div>

                        <Button
                            type="submit"
                            className=""
                            gradientDuoTone="pinkToOrange"
                        > 
                            PROCEED TO PAY
                        </Button>


                    </div>

                </div>

            </form>

        </div>

    )

}
