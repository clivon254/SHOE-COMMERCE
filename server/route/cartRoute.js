
import express from "express"
import { verifyToken } from "../utlis/verifyUser.js"
import { addToCart, getCart, removeFromCart } from "../controller/cartController.js"


const cartRoute = express.Router()


cartRoute.post('/add-cart', verifyToken, addToCart)


cartRoute.delete('/remove-cart', verifyToken, removeFromCart)


cartRoute.get('/get-cart', verifyToken, getCart)




export default cartRoute 