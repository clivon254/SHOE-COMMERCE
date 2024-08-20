

import express from "express"
import { verifyToken } from "../utlis/verifyUser.js"
import { deleteUser, getUser, updateUser } from "../controller/userController.js"

const userRoute = express.Router()


userRoute.post('/update-user/:userId', verifyToken ,updateUser)


userRoute.delete('/delete-user/:userId', verifyToken , deleteUser)


userRoute.post('/user/:userId', getUser)




export default userRoute 