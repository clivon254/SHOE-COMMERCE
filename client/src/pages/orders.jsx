

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Store'
import axios from "axios"
import { Table } from 'flowbite-react'

export default function Orders() {

    const {url, token} = useContext(StoreContext)

    const [data, setData] = useState([])

    // fetchOrders 
    const fetchOrders = async () => {

        try
        {
            const response = await axios.post(url + "/api/order/user-order",{},{headers:{token}})

            if(response.data.success)
            {
                setData(response.data.orders)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    fetchOrders()

  return (

    <div>

        <h2 className="title">My Orders</h2>

        <div className="contain table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

            <Table>

                <Table.Head>

                    <Table.HeadCell></Table.HeadCell>

                    <Table.HeadCell>Order ID</Table.HeadCell>

                    <Table.HeadCell>Amount</Table.HeadCell>

                    <Table.HeadCell>Number of Items</Table.HeadCell>

                    <Table.HeadCell>status</Table.HeadCell>

                </Table.Head>

                {
                    data?.map((order,index) => (

                        <Table.Body>

                            <Table.Row>

                                <Table.Cell>{index + 1}.</Table.Cell>

                                <Table.Cell>{order?._id}</Table.Cell>

                                <Table.Cell>${order?.amount}</Table.Cell>

                                <Table.Cell>

                                    <div className="">

                                        <span className="text-blue-500">&#x25cf;</span>

                                        <b>{order?.status}</b>

                                    </div>

                                </Table.Cell>

                                <Table.Cell>{order?.items?.length}</Table.Cell>

                            </Table.Row>

                        </Table.Body>

                    ))
                }

            </Table>
        </div>

    </div>

  )

}
