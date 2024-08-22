
import { createContext, useEffect } from "react";
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

    useEffect(() => {})
    
    const contextValue = {
        url,
        handleSignOut
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>

    )
}