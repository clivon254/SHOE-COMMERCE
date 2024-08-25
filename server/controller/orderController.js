

import Order from "../model/orderModel.js"
import Payment from "../model/paymentModel.js";
import User from "../model/userModel.js"
import axios from "axios"




export const placeOrder = async (req,res,next) => {

    try
    {
        const newOrder = new Order({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await newOrder.save()

        await User.findByIdAndUpdate(req.body.useId,{cartData:{}})

        const line_items = req.body.items.map((item) => (
            {
                price_data:{
                    currency:"Ksh",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.regularPrice
                },
                quantity:item.quantity
            }
        ))

        line_items.push({
            price_data:{
                currency:"Ksh",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:100
            },
            quantity:1
        })

        const totalAmount = line_items.reduce((acc, item) => acc + (item.price_data.unit_amount * item.quantity), 0);

        const token = req.token ;

        const phone = req.body.address.phone.substring(1)

        const date = new Date()

        const timestamp = 
            date.getFullYear() +
            ("0" + (date.getMonth() +1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 
    
        const shortcode = process.env.PAYBILL

        const passkey = process.env.PASS_KEY 

        const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

        await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {    
                "BusinessShortCode": shortcode,    
                "Password": password,    
                "Timestamp":timestamp,    
                "TransactionType": "CustomerPayBillOnline",    
                "Amount": totalAmount,    
                "PartyA":`254${phone}`,    
                "PartyB":shortcode,    
                "PhoneNumber":`254${phone}`,    
                "CallBackURL": "https://5c13-41-209-60-94.ngrok-free.app/api/order/callback",    
                "AccountReference":"OSIRE SHOE GAME COMPANY",    
                "TransactionDesc":"Test"
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        .then((response) => {

            res.status(200).json(response.data)
        })
        .catch((err) => {

            console.log(err)

            res.status(400).json(err.message)

        })

    }
    catch(error)
    {
        next(error)
    }

}

export const verifyOrder = async (req,res,next) => {

    try
    {
        const callbackData = req.body ;
        
        if(!callbackData.Body.callbackMetaData)
        {
            console.log(callbackData.Body)

            res.json("ok")
        }

        const phone = callbackData.Body.stkCallback.callbackMetaData.Item[4].Value

        const amount = callbackData.Body.stkCallback.callbackMetaData.Item[0].Value

        const trnx_id = callbackData.Body.stkCallback.callbackMetaData.Item[1].Value

        const payment = new Payment({
            phone,
            amount,
            trnx_id
        })

        await Payment.save()
                    .then((response) => {
                        console.log({message :"saved successfully", response})
                    })
                    .catch((err) => {

                        console.log(err.message)

                    })
    }
    catch(error)
    {
        next(error)
    }

}

export const userOrders = async (req,res,next) => {

    try
    {
        const orders = await Order.find({userId: req.body.userId})

        res.status(200).json({success:true , orders})
    }
    catch(error)
    {
        next(error)
    }

}

export const adminOrders = async (req,res,next) => {

    try
    {
        const orders = await Order.find({})

        res.status(200).json({success:true, orders})

    }
    catch(error)
    {
        next(error)
    }

}

export const updateStatus = async (req,res,next) => {

    try
    {
        await Order.findByIdAndUpdate(req.body.order,{status:req.body.status})

        res.json({success:true ,message:"status updated"})
        
    }
    catch(error)
    {
        next(error)
    }

}