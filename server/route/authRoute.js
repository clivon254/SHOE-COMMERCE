

import express from "express"
import { google, signin, signout, signup } from "../controller/authController.js";

const authRoute = express.Router()


authRoute.post('/sign-up', signup)

authRoute.post('/sign-in', signin)

authRoute.post('/google', google)

authRoute.post('/sign-out', signout)



export default authRoute ;