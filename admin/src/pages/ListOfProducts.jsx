

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Store'
import { Modal, Table,Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import axios from "axios"
import { toast } from 'sonner'

export default function ListOfProducts() {
  
    const {products ,setProducts,url} = useContext(StoreContext)

    const [showModal, setShowModal] = useState(false)

    const [productIdToDelete , setProductIdToDelete] = useState(null)


    // handleDeleteProduct
    const handleDeleteProuduct = async () => {

      try
      {
        const res = await axios.delete(url + `/api/product/delete-product/${productIdToDelete}`)

        if(res.data.success)
        {
          setProducts((prev) => 
                    prev.filter((post) => post._id !== productIdToDelete)
          )

          showModal(false)

          toast.success('product has been deleted')
        }
      }
      catch(error)
      {
        console.log(error.message)
      }

    }

    return (
    <>

      <main className="px-3">

        <h2 className="title">List Of Products</h2>

        <div className="contain table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">

          {
            setProducts.length > 0 ? 
            (
              <div className="">
                
                  <Table hoverable className="shadowmd">

                    <Table.Head>

                      <Table.HeadCell>Image</Table.HeadCell>

                      <Table.HeadCell>Name</Table.HeadCell>

                      <Table.HeadCell>Instock</Table.HeadCell>

                      <Table.HeadCell>Price</Table.HeadCell>

                      <Table.HeadCell>Discount Price</Table.HeadCell>

                      <Table.HeadCell>actions</Table.HeadCell>
                    
                    </Table.Head>

                    {
                      products.map((product) => (

                        <Table.Body key={product._id} className="">

                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            
                            {/* image */}
                            <Table.Cell className="text-center">

                              <Link to={`/productDetail/${product._id}`}>

                                <img 
                                  src={product?.imageUrls[0]} 
                                  alt="image" 
                                  className="w-20 h-10" 
                                />

                              </Link>

                            </Table.Cell>

                            {/* name */}
                            <Table.Cell className="text-center">

                              {product.name}

                            </Table.Cell>

                            {/* instock */}
                            <Table.Cell className="text-center">

                              {product.inStock}

                            </Table.Cell>

                            {/* price */}
                            <Table.Cell className="flex gap-x-2 text-center">

                             <span className="">Ksh </span>{product.regularPrice} 

                            </Table.Cell>

                            {/* discounted */}
                            <Table.Cell className="text-center">

                               {product.discountedPrice ? `Ksh ${product.discountedPrice}` : '----'}

                            </Table.Cell>

                            {/* actions */}
                            <Table.Cell>

                              <div className="flex gap-x-2">

                                <Link to={`/productDetail/${product._id}`}>

                                  <FaEye size={20} className="text-sky-500"/>

                                </Link>

                                <Link to={`/edit-product/${product._id}`}>

                                  <FaEdit size={20} className="text-teal-500"/>

                                </Link>

                                <FaTrash 
                                    size={20} 
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => {setShowModal(true) ; setProductIdToDelete(productIdToDelete)}}
                                />

                              </div>

                            </Table.Cell>

                          </Table.Row>

                        </Table.Body>

                      ))
                    }

                  </Table>
                
              </div>
            ) 
            : 
            (
              <p className="">
                You have no products yet
              </p>
            )
          }

        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >

          <Modal.Header />

          <Modal.Body>

            <div className="text-center">

              <HiOutlineExclamationCircle size={20} className="mx-auto text-gray-400 dark:text-gray-200 mb-4 "/>

              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account
              </h3>

              <div className="flex justify-center gap-4">

                <Button 
                  gradientMonochrome="success"
                  onClick={() => handleDeleteProuduct()}
                >
                  Yes, I'm sure
                </Button>

                <Button 
                  gradientMonochrome="failure"
                  onClick={() => setShowModal(false)}
                >
                  No , cancel
                </Button>

              </div>

            </div>

          </Modal.Body>

        </Modal>

      </main>
      
    </>
  )
  
}
