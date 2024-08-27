

import React, { useContext, useState } from 'react'
import Logo from '../components/logo'
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import { StoreContext } from '../context/Store'
import axios from "axios"
import {toast} from "sonner"

export default function SignIn() {

    const [formData ,setFormData] = useState({})

    const {loading, error} = useSelector(state => state.user)

    const {url} = useContext(StoreContext)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleChange
    const handleChange = async (e) => {

        const name = e.target.name ;

        const value = e.target.value ;

        setFormData(data => ({...data,[name]:value}))

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData.email || !formData.password)
        {
            return dispatch(signInFailure('Please fill in all the feilds'))
        }

        try
        {
            dispatch(signInStart())

            const res = await axios.post( url + "/api/auth/sign-in",formData)

            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                toast.success("signed in successfully")

                navigate('/')
            }
            else
            {
                dispatch(signInFailure(res.data.message))

                toast.error('wrong password or email')
            }
        }
        catch(error)
        {
            dispatch(signInFailure(error.message))

            console.log(error.message)
        }

    }
    
  return (

    <div className="w-full h-screen flex">

        <div className="hidden md:flex flex-col gap-y- min-h-screen w-1/3 bg-white items-center justify-center">

            <Logo />

            <span className="text-xl lg:text-2xl font-black">
                Welcome back !
            </span>

        </div>

        <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from black via-[#071b3e] to-black px-10 md:px28 lg:px-40">

            <div className="w-full flex flex-col items-center justify-center gap-y-5 py-12 sm:px-6 lg:px-8">

                {/* logo */}
                <div className="md:hidden flex flex-col items-center gap-y-5">

                    <Logo />

                </div>

                <h2 className="hiden md:block text-center text-sm lg:text-xl text-blue-400 font-bold">
                    Find your perfect shoe
                </h2>

                <div className="max-w-md w-full">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">

                        {/* email */}
                        <div className="flex flex-col gap-y-2">

                            <Label value="Your email"/>

                            <TextInput 
                                type="email"
                                placeholder="name@gmail.com"
                                name="email"
                                className=""
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                        {/* password*/}
                       <div className="flex flex-col gap-y-2">

                            <Label value="Your Password"/>

                            <TextInput 
                                type="password"
                                placeholder="*********"
                                name="password"
                                className=""
                                value={formData.password}
                                onChange={handleChange}
                            />

                        </div>

                        {/* forgot */}
                        <div className="flex justify-between items-center">

                            <span className="text-xs flex items-center gap-2 font-semibold">
                                <input type="checkbox" className=" rounded-md" />
                                Remember me
                            </span>

                            <span className="text-xs cursor-pointer hover:text-blue-400 font-semibold my-3">
                                forgot password?
                            </span>

                        </div>

                        <Button type="submit" gradientDuoTone="purpleToBlue" disabled={loading}>
                           {
                            loading ? 
                            (
                             <>
                                <Spinner className="mr-2"/>

                                <span className="">Loading ...</span>
                             </>
                            ) 
                            : 
                           "Sign In"
                           }
                        </Button>

                    </form>

                    {
                        error && (
                            <Alert className="mt-5" color="failure">
                                {error}
                            </Alert>
                        )
                    }

                </div>

            </div>

        </div>

    </div>

  )

}
