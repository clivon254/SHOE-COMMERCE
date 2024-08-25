

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


function LayOut()
{
  return(

    <div className="w-full min-h-screen">

      <Header/>

      <div className="min-h-screen w-full px-4 md:px-10 2xl:px-28">

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

            <Route path="/about" element={<About/>}/>

            <Route path="/contact" element={<Contact/>}/>

            <Route path="/search" element={<Search/>}/>

            <Route path="/profile" element={<Profile/>}/>

          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/sign-up" element={<SignUp/>}/>

        </Routes>

        <Toaster richColors />

      </main>


    </BrowserRouter>
    
  )

}
