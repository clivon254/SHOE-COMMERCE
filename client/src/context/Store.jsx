

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

    const [cartItems, setCartItems] = useState([])

    const [token ,setToken] = useState("")
    
    // getCart
    const getCart = async () => {

        try
        {
            const response = await axios.post(url + "/api/cart/get-cart")
            
            if(res.data.success)
            {
                setCartItems(response.data.cartData)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // addToCart
    const addToCart = async (itemId) => {

    
        try
        {
 
            const response = await axios.post(url + "/api/cart/add-to-cart",{itemId})

            if(response.data.success)
            {

                if(!cartItems[itemId])
                {
                    setCartItems((prev) => ({...prev,[itemId]:1}))
                }
                else
                {
                    setCartItems(((prev) => ({...prev,[itemId]:prev[itemId] +1})))
                }

                toast.success("product added to cart")
            }
            else 
            {}
            
        }
        catch(error)
        {
            console.log(error.message)
        }
    }


    // removeFromCart
    const removeFromCart = async (itemId) => {

        try
        {

            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))

            if(token)
            {
                await axios.post(url + "/api/cart/remove-cart",
                                    {itemId},
                                  {headers:{token}}
                            )
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // getCartAmount
    const getCartAmount = async () => {

        let totalAmount = 0 ;

        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = products.find((product) => product._id === item)

                if(itemInfo)
                {
                    totalAmount += itemInfo.discountedPrice ? (itemInfo.discountedPrice * cartItems[item]) : (itemInfo.regularPrice * cartItems[item])
                }

            }
        }

        return totalAmount ;
    }

    // getCartItems
    const getCartItems = async () => {

        let totalItems = 0 ;

        for(const item in cartItems)
        {
            totalItems += cartItems[item]
        }

        return totalItems;
    }


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

        async function loadData(){

            if(localStorage.getItem("token"))
            {
                setToken(localStorage.getItem("token"))

                await getCart()
            }

            fetchProducts()

            fetchOrders() 

        }

        loadData()

    })

   
    
    const contextValue = {
        url,
        handleSignOut,
        products,
        setProducts,
        orders,
        setOrders,
        fetchOrders,
        addToCart,
        removeFromCart,
        getCartAmount,
        getCartItems
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>

    )
}