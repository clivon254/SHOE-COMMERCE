
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {app} from "../firebase"
import React, { useContext } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import axios from "axios"
import { StoreContext } from "../context/Store";
import { signInSuccess } from "../redux/user/userSlice";


export default function OAuth() {

    const {url} = useContext(StoreContext)

    const dispatch = useDispatch() ;

    const navigate = useNavigate()

    // handleGoogleClick
    const handleGoogleClick = async () => {

        try
        {
            const provider = new GoogleAuthProvider()

            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await axios.post(url + '/api/auth/google',{
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            })

            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                navigate('/')
            }
        }
        catch(error)
        {
            console.log('could not sign in with google', error)
        }

    }

   return (
    
    <Button
     onClick={handleGoogleClick}
     type="button"
     gradientDuoTone="purpleToPink"
     outline
    >
        CONTINUE WITH GOOGLE
    </Button>

   )
}
