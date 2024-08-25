
import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import ListOfProducts from './pages/ListOfProducts'
import ListOfOrders from './pages/ListOfOrders'
import Profile from './pages/Profile'
import Search from './pages/search'
import { useSelector } from 'react-redux'
import DashSidebar from './components/DashSidebar'
import Header from './components/Header'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'


function Layout(){

  const {currentUser} = useSelector((state) => state.user)

  return ( 
    currentUser ? (
    
      <div className="w-full flex">

        <div className="hidden md:block w-1/4 h-screen border-r border-slate-300 top-0 left-0 sticky ">
          
          <DashSidebar />

        </div>

        <div className="w-full md:w-3/4">

          <Header/>

          <div className="">

            <Outlet />

          </div>

        </div>

      </div>
    )
    :
    (
      <Navigate to='/sign-in' state={{ from: location }} replace />
    )
  
  )
}


export default function App() {

  return (

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Routes>

            <Route element={<Layout/>}>

              <Route path="/" element={<Dashboard/>}/>

              <Route path="/add-products" element={<AddProduct/>}/>

              <Route path="/list-products" element={<ListOfProducts/>}/>

              <Route path="/list-orders" element={<ListOfOrders/>}/>

              <Route path="/profile" element={<Profile/>}/>

              <Route path="/search" element={<Search/>}/>

              <Route path="/edit-product/:productId" element={<EditProduct/>}/>

              <Route path="/productDetail/:productId" element={<ProductDetails/>}/>

            </Route>

            <Route path="/sign-in" element={<SignIn/>} />

        </Routes>

        <Toaster richColors/>

      </main>

    </BrowserRouter>


  )

}
