

import express from "express"
import { createReveiw, deleteReveiw, getProductReveiws } from "../controller/reveiwController.js";
import { verifyToken } from "../utlis/verifyUser.js";

const reveiwRoute = express.Router()


reveiwRoute.post('/create-reveiw', verifyToken,createReveiw)


reveiwRoute.delete('/delete-reveiw/:id',verifyToken , deleteReveiw)


reveiwRoute.get('/get-reveiw/:productId', verifyToken, getProductReveiws)


export default reveiwRoute ;