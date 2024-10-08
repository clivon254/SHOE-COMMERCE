
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from "moment"

export default function Reveiwed({comment}) {

    const  {currentUser} = useSelector((state) => state.user)

    const [user ,setUser] = useState({})

    
    useEffect(() => {

      // getUser
      const getUser = async () => {

    try
    {
        const res = await axios.get(url + `/api/user/user/${comment.userId}`)

        if(res.data.success)
        {
            setUser(res.data.rest)
        }

    }
    catch(error)
    {
        console.log(error)
    }

      }

      getUser()

    },[])

  return (

    <div className="flex p-4 border-b dark:border-gray-600 text-sm">

        <div className="flex-shrink-0 mr-3">

            <img 
              src={user.profilePicture} 
              alt={user.username}
              className="h-10 w-10  rounded-full bg-gray-200" 
            />

        </div>

        <div className="flex-1">

            <div className="flex items-center mb-1">

                <span className="font-bold mr-1 text-xs truncate">
                    {user ? `@${user.name}` : `anonymous`}
                </span>

                <span className="textgray500 text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>

            </div>

            <>
                <p className="text-gray-500 pb-2">
                    {comment?.content}
                </p>
            </>

        </div>

    </div>

  )

}
