

import React, { useContext } from 'react'
import { StoreContext } from '../context/Store'
import { useNavigate } from 'react-router-dom'
import { Button, Table, TableHead, TextInput } from 'flowbite-react'
import { FaTrashAlt } from 'react-icons/fa'

export default function Cart() {

  const {products,cartItems,removeFromCart,getTotalCartAmount} = useContext(StoreContext)

  const navigate = useNavigate()

  return (

    <div>

        {/* table */}
        <div className="contain table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

            <Table>

                <Table.Head>

                    <Table.HeadCell>Image</Table.HeadCell>

                    <Table.HeadCell>Title</Table.HeadCell>

                    <Table.HeadCell>Price</Table.HeadCell>

                    <Table.HeadCell>Quantity</Table.HeadCell>

                    <Table.HeadCell>Total</Table.HeadCell>

                    <Table.HeadCell>Remove</Table.HeadCell>

                </Table.Head>

                {
                    products?.map((item,index) => {

                        if(cartItems[item?._id] > 0)
                        {
                            return(

                                <Table.Body key={index}>

                                    <Table.Row>

                                        <Table.HeadCell>

                                            <img 
                                                src={item.image} 
                                                width={100}
                                                alt="" 
                                                className="" 
                                            />

                                        </Table.HeadCell>

                                        <Table.HeadCell>
                                            {item.name}
                                        </Table.HeadCell>

                                        <Table.HeadCell>
                                            {item?.discountedPrice ? item?.discountedPrice : item?.regularPrice}
                                        </Table.HeadCell>

                                        <Table.HeadCell>
                                            {item?.discountedPrice ? (item?.discountedPrice * cartItems[item._id]) :(item?.discountedPrice * cartItems[item._id])}
                                        </Table.HeadCell>

                                        <Table.HeadCell>

                                            <Button 
                                                gradientMonochrome="failure"
                                                onClick={() => removeFromCart(item._id)}
                                                className=""
                                            >
                                                <FaTrashAlt/>
                                            </Button>

                                        </Table.HeadCell>

                                    </Table.Row>

                                </Table.Body>

                            )
                        }

                    })
                }
                <Table.Body></Table.Body>
            </Table>

        </div>
                
        <div className="">

            <div className="">

                <h2 className="">Cart Totals</h2>

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
            
            {/* coupon */}
            <div className="">

                <p className="">if you have a promocode</p>

                <div className="">

                    <TextInput placeholer="enter promocode"/>

                    <Button gradientMonochrome="info" >submit</Button>

                </div>

            </div>

        </div>

    </div>

  )

}
