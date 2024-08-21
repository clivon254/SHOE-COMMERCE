

import express from "express"
import { generateToken } from "../utlis/verifyUser.js"
import { adminOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controller/orderController.js"



const orderRoute = express.Router()


orderRoute.post('/place-order', generateToken, placeOrder)

orderRoute.post('/callback', verifyOrder)

orderRoute.get('/user-order', userOrders)

orderRoute.get('/admin-order', adminOrders)

orderRoute.put('/update-order', updateStatus)




export default orderRoute