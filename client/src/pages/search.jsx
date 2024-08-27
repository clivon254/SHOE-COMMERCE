

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../context/Store'
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'
import ItemCard from '../components/itemCard'

export default function Search() {
 
  const {url} = useContext(StoreContext)

  const navigate = useNavigate()

  const [sidebardata,setSidebardata] = useState({
    searchTerm:"",
    offer:false,
    sort:'created_at',
    order:'desc'
  })

  const [loading, setLoading] = useState(false)

  const [products,setProducts] = useState([])

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get('searchTerm')
    
    const offerFromUrl = urlParams.get('offer')

    const sortFromUrl = urlParams.get('sort')

    const orderFromUrl = urlParams.get('order')

    if(searchTermFromUrl || offerFromUrl)
    {
      setSidebardata({
        searchTerm:searchTermFromUrl || '' ,
        offer:offerFromUrl === 'true' ? "true" : 'false',
        sort:sortFromUrl || '' ,
        order:orderFromUrl || '' 
      })
    }

    // fetchProducts
    const fetchProducts = async () => {

      try
      {
        setLoading(true)

        const searchQuery = urlParams.toString()

        const res = await axios.get(url + `/api/product/get-products?${searchQuery}`)

        if(res.data.success)
        {
          setProducts(res.data.products)

          setLoading(false)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setLoading(false)
      }

    }

    fetchProducts()

  },[location.search])

  // handleChange
  const handleChange = (e) => {

    if(e.target.id === 'searchTerm')
    {
        setSidebardata({...sidebardata, [searchTerm]:e.target.value})
    }

    if(e.target.id === 'offer')
    {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
        e.target.checked || e.target.checked === 'true' ? true :false
      })
    }

    if(e.target.id === 'sort_order')
    {
        const sort = e.target.value.split('_')[0] || 'created_at'

        const order = e.target.value.split('_')[1] || 'desc'

        setSidebardata({...sidebardata, sort,order})
    }

  }

  // handleSubmit
  const handleSubmit = (e) => {

    e.preventDefault()

    const urlParams = new URLSearchParams()

    urlParams.set('searchTerm', sidebardata.searchTerm)

    urlParams.set('offer', sidebardata.offer)

    urlParams.set('order', sidebardata.order)

    urlParams.set('sort', sidebardata.sort)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }


  return (

    <div className="flex flex-col md:flex-row">

      <div className="py-7 border-b-2 md:border-r-2 md:min-h-screen p-7">

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">

          <div className="flex items-center gap-2">

            <Label value='Search Term:'/>

            <TextInput 
              type="text"
              id="searchTerm"
              placeholder='Search....'
              className=""
              onChange={handleChange}
              value={sidebardata.searchTerm}
            />

          </div>

          <div className="flex items-center gap-2">

            <Label value='offer'/>

            <Checkbox
              id="offer"
              onChange={handleChange}
              checked={sidebardata.offer}
            />

          </div>

          <div className="flex items-center gap-2">

            <Label value="sort"/>

            <Select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
            >
              <option value="regularPrice_desc" >Price high to low</option>

              <option value="regularPrice_desc" >Price low to high</option>

              <option value="regularPrice_desc" >Latest</option>

              <option value="regularPrice_desc" >Oldest</option>

            </Select>

          </div>

          <Button gradientMonochrome="info">
              search
          </Button>
          
        </form>

      </div>

      <div className="flex-1 p-5">

        <h1 className="subtitle">Products results</h1>

        <div className="contain p">

          {!loading && products.length === 0 && (
            <p className="text-xl text-slate-700">No Product found!</p>
          )}

          {loading && (

            <p className="text-xl text-slate-700 text-center">
              Loading ......
            </p>

          )}

          <div className="grid gap-x-8  gap-y-6  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
              !loading && 
              products  && 
              products.map((product) => (

                <ItemCard key={product._id} product={product}/>

              ))
            }
          </div>
        </div>

      </div>

    </div>

  )

}
