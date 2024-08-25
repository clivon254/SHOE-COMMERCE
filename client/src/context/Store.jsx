

import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {} from "sonner"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";


export const StoreContext = createContext(null)


export default function StoreContextProvider(props)
{
    const url = "http://localhost:4000"

    const dispatch = useDispatch()

    const [products, setProducts] = useState([])

    const [allProducts, setAllProducts] = useState([])

    const [orders ,setOrders] = useState([])

    // handleSignOut
    const handleSignOut = async () => {
        
        try
        {
            const res = await axios.post(url + "/api/auth/sign-out")

            if(res.data.success)
            {
                dispatch(signOutSuccess())

                toast.success("You have signed out successfully")

            }
            else
            {
                console.log('there is something wrong with the api')
            }

        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    // fetchProducts
    const fetchProducts = async () => {

        try
        {
            const res = await axios.get(url + "/api/product/get-products")

            if(res.data.success)
            {
                setProducts(res.data.products)
            }
            else
            {
                console.log("check the api")
            }

        }
        catch(error)
        {
            console.log(error)
        }

    }

    // fetchOrder
    const fetchOrders  = async () => {

        try
        {
            const res = await axios.get(url + "/api/order/admin-order")

            if(res.data.success)
            {
                setOrders(res.data.orders)
            }
            else
            {
                console.log("check the api")
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }
    
    useEffect(() => {

        fetchProducts()

        fetchOrders() 

    })

   

    
    
    const contextValue = {
        url,
        handleSignOut,
        products,
        setProducts,
        orders,
        setOrders,
        fetchOrders
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>

    )
}