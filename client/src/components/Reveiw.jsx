


import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/Store'
import { Button, Textarea } from 'flowbite-react'
import Reveiwed from './Reveiwed'

export default function Reveiw({productId}) {

  const  {currentUser} = useSelector((state) => state.user)

  const {url} = useContext(StoreContext)

  const [comment, setComment] = useState('')

  const [comments, setComments] = useState([])

  const [commentError, setCommentError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {

    // getComments
    const getComments = async () => {

        try
        {
            const response = await axios.get(url + `/api/reveiw/get-reveiw/${productId}`)

            if(response.data.success)
            {
                setComments(response.data.reveiws)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    getComments()

  },[productId])


  //  handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault() 

    if(comment.length > 200)
    {
        return;
    }

    try
    {
        const response = await axios.post(url + "/api/reveiw/create-reveiw",{
            content:comment,
            productId,
            userId:currentUser._id
        })

        if(response.data.success)
        {
            setComments([res.data.reveiw, ...comments])
        }

    }
    catch(error)
    {
        setCommentError(error.message)
    }

  }


  return (
    <>

        <div className="max-w-2xl w-full p-3">
            {
                currentUser ? 
                (
                    <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">

                        <p className="">Sign in as</p>

                        <img 
                            src={currentUser.profilePicture}
                            alt="" 
                            className="h-5 w-5 object-cover rounded-full" 
                        />

                        <Link
                            to="/profile"
                            className="text-xs text-cyan-600 hover:underline"
                        >
                            @{currentUser.username}
                        </Link>

                    </div>
                ) 
                : 
                (
                    <div className="text-sm text-teal-500 my-5 flex gap-1">

                        You must be signed in to add a reveiw

                        <Link to="/sign-in" className="text-blue-500 hover:underline "></Link>

                    </div>
                )
            }

            {
                currentUser && (

                    <form 
                        onSubmit={handleSubmit} 
                        className="border border-teal-500 rounded-md p-3"
                    >
                        <Textarea 
                            placeholder='Add a reveiw'
                            rows="3"
                            maxlength="200"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />

                        <div className="flex justify-between items-center mt-5">

                            <p className="text-xs text-gray-500">
                                {200 - comment.length} characters remaining
                            </p>

                            <Button
                                outline
                                gradientDuoTone="purpleToPink" 
                                type="submit"
                            >
                                submit
                            </Button>

                        </div>

                    </form>

                )
            }

            {
                comments.length === 0 ? 
                (
                    <p className="text-sm my-3">
                        No Reveiws yet!
                    </p>
                ) 
                : 
                (
                    <>
                        <div className="text-sm my-5 flex items-center gap-1">

                            <p className="">Comments</p>

                            <div className="border border-gray-400 py-1 px-2 rounded-sm">

                                <p className="">{comments?.length}</p>

                            </div>

                        </div>

                       {
                         comments?.map((comment) => (

                            <Reveiwed
                                key={comment._id}
                                comment={comment}
                            />

                         ))
                       }
                    </>
                )
            }

        </div>

        

    </>

  )

}
