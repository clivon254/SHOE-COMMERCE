

import express from "express"
import { addProduct, deleteProduct, listProduct, product, updateProduct } from "../controller/productController.js"
import { verifyToken } from "../utlis/verifyUser.js"

const productRoute = express.Router()


productRoute.post('/create-product', verifyToken, addProduct)

productRoute.post('/update-product/:productId', verifyToken, updateProduct)

productRoute.delete('/delete-product/:productId', verifyToken, deleteProduct)

productRoute.get('/get-product/:productId', product)

productRoute.get('/get-products', listProduct)






export default productRoute