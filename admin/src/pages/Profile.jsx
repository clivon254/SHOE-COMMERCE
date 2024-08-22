

import React, { useContext, useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { StoreContext } from '../context/Store'
import { updateFailure, updateStart } from '../redux/user/userSlice'
import axios from "axios"
import { Alert, Button, TextInput } from 'flowbite-react';




export default function Profile() {

  const {currentUser , error, loading} = useSelector(state => state.user)

  const {url,handleSignOut} = useContext(StoreContext)

  const [imageFile, setImageFile] = useState(null)

  const [imageFileUrl , setImageFileUrl] = useState(null)

  const [imageFileUploading, setImageFileUploading] = useState(false)

  const [imageFileUploadError, setImageFileUploadError] = useState(null)

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)

  const [updateUserError, setUpdateUserError] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({})

  const filePickerRef = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()


  useEffect(() => {

    if(imageFile)
    {
      uploadImage()
    }

  },[imageFile])

  // handleImageChange
  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if(file)
    {
      setImageFile(file)

      setImageFileUrl(URL.createObjectURL(file))
    }

  }

  // uploadImage
  const uploadImage = async () => {

    setImageFileUploading(true)

    setImageFileUploadError(null)

    const storage = getStorage(app)

    const fileName = new Date().getTime() + imageFile.name ;

    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef ,imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100 ;

        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {

        setImageFileUploadError('could nit upload image(File must be less than 2MB)')

        setImageFileUploadProgress(null)

        setImageFile(null)

        setImageFileUrl(false)

        setImageFileUploading(false)

      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setImageFileUrl(downloadURL)

          setFormData({...formData, profilePicture : downloadURL})

          setImageFileUploading(false)

        })
      }
    )

  }

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setUpdateUserError(null)

    setUpdateUserSuccess(null)

    if(Object.keys(formData).length === 0)
    {
      setUpdateUserError('No changes')
    }

    if(imageFileUploading)
    {
      setUpdateUserError("please wait for the upload")

      return 
    }

    try
    {
      dispatch(updateStart())

      const res = await axios.post(url + `/api/user/update-user/${currentUser._id}`,formData)

      if(res.data.success)
      {
        dispatch(updateUserSuccess(res.data.rest))

        setUpdateUserSuccess("User profile has been updated")
      }
      else
      {
        dispatch(updateFailure(res.data.message))

        setUpdateUserError(res.data.message)
      }
    }
    catch(error)
    {
      dispatch(updateFailure(error.message))

      setUpdateUserError(error.message)
    }

  }

  // console.log(currentUser)

  // console.log(formData)

  return (

    <div className="px-4">

      <div className="contain">

        <h1 className="my-7 text-center font-semibold text-3xl">
          Profile
        </h1>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">

          <input 
            type="file" 
            accept='image/*'
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
         />

         <div 
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
         >
            {
              imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root:{
                      width:'100%',
                      height:'100%',
                      position:'absolute',
                      top:0,
                      left:0,
                    },
                    path:{
                      stroke:`rgba(62, 152, 199,${imageFileUploadProgress /100})`
                    }
                  }}
                />
              )
            }

            <img 
              src={imageFileUrl || currentUser.profilePicture} 
              alt="user" 
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
                      ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
            />

         </div>

         {
          imageFileUploadError && (
            <Alert color="failure">
              {imageFileUploadError}
            </Alert>
          )
         }

         <TextInput
            type='text'
            name="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
         />

         <TextInput
            type='email'
            name="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
         />

         <TextInput
            type='password'
            name="password"
            placeholder="password"
            onChange={handleChange}
         />

         <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            disabled={loading || imageFileUploading}
         >
          {loading ? "Loading..." : "update"}
         </Button>

        </form>

        <div className="text-red-500 flex justify-center mt-5">

          <span onClick={handleSignOut} className="cursor-pointer">
            Sign out
          </span>

        </div>

        {
          updateUserSuccess && (
            <Alert color="success" className="mt-5">
              {updateUserSuccess}
            </Alert>
          )
        }

        {updateUserError &&(

          <Alert color="failure" className="mt-5">
              {updateUserError}
          </Alert>

        )}

        {
          error && (

            <Alert color="failure" className="mt-5">
              {error}
            </Alert>
          )
        }

      </div>

    </div>

  )
  
}
