

import { getDownloadURL, getStorage, uploadBytesResumable,ref } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../firebase'
import { StoreContext } from '../context/Store'
import axios from "axios"
import { toast } from 'sonner'
import { Alert, Button, Checkbox, TextInput ,Select, Label, FileInput} from 'flowbite-react'
import 'react-circular-progressbar/dist/styles.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar'



export default function EditProduct() {

  const {url} = useContext(StoreContext)

  const [files,setFiles] = useState([])

  const [uploading,setUploading] = useState(false)

  const [imageUploadProgress, setImageUploadProgress] = useState(null)

  const [imageUploadError, setImageUploadError] = useState(null)

  const [publishError, setPublishError] = useState(null)

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    
  })

  const params = useParams()

  const navigate = useNavigate()

  useEffect(() => {

    const fetchProduct = async () => {

        try
        {
            const res = await axios.get(url + `/api/product/get-product/${params.productId}`)

            if(res.data.success)
            {
                setFormData(res.data.product)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    fetchProduct()

  },[])

  console.log(formData)

  // handleIamgeSubmit
  const handleImageSubmit = (e) => {

    if(files?.length > 0 && files?.length + formData?.imageUrls?.length < 7)
    {
      setUploading(true)

      setImageUploadError(false)

      const promises = [] ;

      for (let  i = 0 ; i < files.length ; i ++)
      {
        promises.push(storageImage(files[i]))
      }

      Promise.all(promises)
        .then((urls) => {

          setFormData({
            ...formData,
            imageUrls:formData.imageUrls.concat(urls)
          })

          setImageUploadError(false)

          setUploading(false)
        })
        .catch((err) => {

          setImageUploadError('Image upload failed (2mb max per Image)')

          setUploading(false)

          console.log(err)

        })
    }
    else
    {
      setImageUploadError('You can only upload 6 images per listing')

      setUploading(false)
    }

  } 
 
  // handleFileUpload
  const storageImage = (file) => {

    return new Promise((resolve ,reject) => {

      const storage = getStorage(app)

      const fileName = new Date().getTime() + file.name ;

      const storageRef = ref(storage, fileName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;

          setImageUploadProgress(progress.toFixed(0))

        },
        (error) => {

          reject(error)

        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            resolve(downloadURL)

            setImageUploadProgress(null)

          })

        }
      )
    })
  }

  // handleRemoveImage
  const handleRemoveImage = (index) => {

    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i) => i !== index)
    })

  }

  // handleChange 
  const handleChange = (e) => {

    if(e.target.id === 'offer')
    {
      setFormData({
        ...formData,
        [e.target.id]:e.target.checked
      })
    }

    setFormData({
      ...formData,
      [e.target.id]:e.target.value 
    })

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      if(formData?.imageUrls?.length < 1)
      {
        return setPublishError("You must upload atleast one image")
      }

      if(formData?.regularPrice < +formData?.discountedPrice)
      {
        return setPublishError("Discount price must br lower than the regular price")
      }

      setLoading(true)

      setPublishError(false)

      const res = await axios.put(url + `/api/product/update-product/${params.productId}`,formData)

      if(res.data.success)
      {
        setLoading(false)

        navigate(`/product/${res.data.UpdatedProduct._id}`)

        toast.success(`${res.data.updatedProduct.name} added successfully`)
      }
      else
      {
        setPublishError('something went wrong')

        setLoading(false)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setPublishError(error.message)

      setLoading(false)
    }

  }


  return (

    <main className="px-3">

      <div className="contain ">

        <h2 className="title">
          edit product
        </h2>

        <form onSubmit={handleSubmit} className="  flex flex-col sm:flex-row gap-10">

          <div className="flex flex-col gap-4 w-full md:w-70%">

            {/* name & brand */}
            <div className="flex flex-col gap-4 sm:flex-row justify-between">

                <TextInput 
                  type="text"
                  placeholder='name'
                  required
                  className="w-full"
                  id="name"
                  value={formData.name}
                  handleChange={(e) => setFormData({...formData, name:e.target.value})}
                />

                <Select 
                    onChange={(e) => setFormData({...formData, brand:e.target.value})} 
                    value={formData.brand} 
                    className="w-full"
                    placeholder="brand"
                    id="brand"
                >

                  <option value="nike" className="">Nike</option>

                  <option value="jordan" className="">Jordan</option>

                  <option value="addidas" className="">addidas</option>

                </Select>

            </div>

            <div className="flex  gap-10 flex-row-reverse justify-between items-center">

                <div className="flex items-center gap-x-2">

                  <Checkbox  
                    id="offer" 
                    onChange={(e) => setFormData({...formData, offer:e.target.checked})}
                    checked={formData.offer} 
                  />

                  <Label value="Offer"/>

                </div>

                <TextInput 
                  type="text"
                  placeholder='Instock'
                  required
                  id="regularPrice"
                  value={formData.inStock}
                  handleChange={(e) => setFormData({...formData, inStock:e.target.value})}
              />

                <Select
                  id="tag"
                  onChange={(e) => setFormData({...formData, tag:e.target.value})}
                  value={formData.tag}
                  className="w-full"
                 >

                  <option value="Men" >Men</option>

                  <option value="Women" >Women</option>

                  <option value="All" >All</option>

                </Select>

            </div>

            {/* prices */}
            <div className="flex flex-col gap-4 ">

              <TextInput 
                  type="text"
                  placeholder='RegularPrice'
                  required
                  id="regularPrice"
                  value={formData.regularPrice}
                  handleChange={(e) => setFormData({...formData, regularPrice:e.target.value})}
              />

              {formData.offer && (
                
                <TextInput 
                    type="text"
                    placeholder='DiscountedPrice'
                    required
                    id="discountedPrice"
                    value={formData.discountedPrice}
                    handleChange={(e) => setFormData({...formData, discountedPrice:e.target.value})}
                />
              )}

            </div>

            <ReactQuill 
              theme="snow"
              placeholder="write something"
              className="h-72 mb-12"
              required
              onChange={
                (value) => setFormData({...formData, description:value})
              }
              value={formData.description}
            />

          </div>
          
          {/* images */}
          <div className="flex flex-col gap-4 w-full md:w-30%">

            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first Image will cover the (max 6)
              </span>

            </p>

            <div className="flex gap-4 justify-between">

              <FileInput
                type="file"
                id="imageUrls"
                accept='image/*'
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />

              <Button
                type="button"
                disabled={uploading || imageUploadProgress}
                onClick={handleImageSubmit}
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
              >
                {imageUploadProgress ? 
                <div className="w-16 h-16">

                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />

                </div>
                : 
                'upload'
                }
              </Button>

            </div>

            <p className="text-red-700 text-sm">
              {imageUploadError && (imageUploadError)}
            </p>

            {
              formData?.imageUrls?.length > 0  &&
                formData.imageUrls.map((url,index) => (

                  <div 
                    key={url}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img 
                      src={url} 
                      alt="images" 
                      className="w-20 h-20 object-contain rounde-lg" 
                    />

                    <button 
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Delete
                    </button>

                  </div>

                ))
            }

            <Button
              type="submit"
              disabled={loading || uploading}
              gradientDuoTone="purpleToBlue"
            >
              {loading ? "updating ...." :"Update Product"}
            </Button>

            {publishError && (

              <Alert color="failure">
                {publishError}
              </Alert>

            )}

          </div>

        </form>

      </div>

    </main>
    
  )

}
