

import React from 'react'
import {BrowserRouter,Routes,Route,Outlet} from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Contact from './pages/contact'
import SignUp from '../src/pages/signUp'
import Header from '../src/components/Header'
import FooterComp from './components/FooterComp'
import Search from './pages/search'
import { Toaster } from 'sonner'
import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/orders'


function LayOut()
{
  return(

    <div className="w-full min-h-screen">

      <Header/>

      <div className="min-h-screen">

         <Outlet/>

      </div>


      <FooterComp/>

    </div>

  )
}

export default function App() {

  return (

    <BrowserRouter>

      
      <main className="">

        <Routes>

          <Route element={<LayOut/>}>

            <Route path="/" element={<Home/>}/>

            <Route path="/cart" element={<Cart/>}/>

            <Route path="/about" element={<About/>}/>

            <Route path="/order" element={<Orders/>}/>

            <Route path="/contact" element={<Contact/>}/>

            <Route path="/search" element={<Search/>}/>

            <Route path="/profile" element={<Profile/>}/>

            <Route path="/place-order" element={<PlaceOrder/>}/>

            <Route path="/productDetail/:productId" element={<ProductDetails/>}/>

          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/sign-up" element={<SignUp/>}/>

        </Routes>

        <Toaster richColors />

      </main>


    </BrowserRouter>
    
  )

}
