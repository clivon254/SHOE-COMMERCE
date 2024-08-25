

import React, { useContext } from 'react'
import { StoreContext } from '../context/Store'
import { Select, Table } from 'flowbite-react'
import axios from "axios"

export default function ListOfOrders() {
  
    const {orders,setOrders, url,fetchOrder}  = useContext(StoreContext)

    // status Handler
    const StatusHandler = async (event,orderId) => {
        
        try
        {
            const response = await axios.post( url + "/api/order/update-order",{orderId, status:event.target.value})

            if(response.data.success)
            {
                fetchOrder()
            }
        }
        catch(error)
        {
            console.log(error)
        }

       
    }

    return (
    
    <div className="px-3">

        <div className="contain table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {
                setOrders.length > 0 ? 
                (
                    <>
                        <Table hoverable className="shadow md">
                            <Table.Head>

                                <Table.HeadCell>Order id</Table.HeadCell>

                                <Table.HeadCell>address</Table.HeadCell>

                                <Table.HeadCell>name</Table.HeadCell>

                                <Table.HeadCell>phone</Table.HeadCell>

                                <Table.HeadCell>items</Table.HeadCell>

                                <Table.HeadCell>number of items</Table.HeadCell>

                                <Table.HeadCell>amount</Table.HeadCell>

                                <Table.HeadCell>status</Table.HeadCell>

                            </Table.Head>
                            
                            {
                                orders.map((order) => (

                                    <Table.Body>

                                        <Table.Row>

                                            {/* order id */}
                                            <Table.Cell>
                                                {order._id}
                                            </Table.Cell>

                                            {/* address */}
                                            <Table.Cell>
                                                
                                                <div className="flex flex-col gap-2">

                                                    <p className="">{order?.address?.street}</p>

                                                    <p className="">{order?.address?.city}</p>

                                                </div>

                                            </Table.Cell>
                                            
                                            {/* name */}
                                            <Table.Cell>
                                                {`${order?.address?.firstName} ${order?.address?.lastName} `}
                                            </Table.Cell>
                                            
                                            {/* phone */}
                                            <Table.Cell>
                                                {order?.address?.phone}
                                            </Table.Cell>

                                            {/* items */}
                                            <Table.Cell>
                                                <p className="">
                                                    {
                                                        order?.items?.map((index,item) => {

                                                            if(index === order?.items?.length-1)
                                                            {
                                                                return `${item?.name} X ${item?.quantity}`
                                                            }
                                                            else
                                                            {
                                                                return `${item?.name} X ${item?.quantity},`
                                                            }

                                                        })
                                                    }
                                                </p>
                                            </Table.Cell>
                                            
                                            {/* items length */}
                                            <Table.Cell>
                                                {order?.items?.length}
                                            </Table.Cell>
                                            
                                            {/* amonut */}
                                            <Table.Cell>
                                                {order.amount}
                                            </Table.Cell>

                                            {/* status */}
                                            <Table.Cell>

                                                <Select
                                                    value={order.status}
                                                    onChange={(event) => StatusHandler(event,order._id)}
                                                >

                                                    <option value="order processing">order processing</option>

                                                    <option value="out for delivery">out for delivery</option>

                                                    <option value="delivered">delivered</option>

                                                </Select>

                                            </Table.Cell>

                                        </Table.Row>

                                    </Table.Body>

                                ))
                            }
                            
                        </Table>
                    </>
                ) 
                :
                (
                    <p className="">
                        You have no order yet
                    </p>
                )
            }
        </div>

    </div>

    )

}
