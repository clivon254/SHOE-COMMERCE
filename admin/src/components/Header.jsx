

import { Avatar, Button, Drawer, Dropdown, Navbar } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MdClose, MdMenu, MdSunny } from "react-icons/md"
import { FaMoon, FaSun } from "react-icons/fa"
import Logo from './logo'
import { toggleTheme } from '../redux/theme/themeSlice'
import { StoreContext } from '../context/Store'
import DashSidebar from './DashSidebar'

export default function Header() {

  const {theme} = useSelector(state => state.theme)

  const {currentUser} = useSelector(state => state.user)

  const {handleSignOut} = useContext(StoreContext)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  return (

    <>

      <Navbar className="border-b sticky top-0 z-[100]" >

          <div className="">
            {
              isOpen ? 
                (
                  <Button 
                    gradientMonochrome="failure"
                    className='md:hidden'
                    onClick={() => setIsOpen(false)}
                  >
                    <MdClose/>
                  </Button>
                ) 
                : 
                (
                  <Button 
                    gradientMonochrome="success"
                    className='md:hidden'
                    onClick={() => setIsOpen(true)}
                  >
                    <MdMenu/>
                  </Button>
                )
            }
          </div>

          <div className="hidden lg:block">

            <Logo />

          </div>

          <div className="flex items-center gap-x-2 md:order2">

            <button 
              className="w-10 h-10 flex items-center justify-center border rounded-full border-gray-300"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === 'light' ? <FaSun/> : <FaMoon/>}
            </button>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>

                <span className="block text-sm">{currentUser.name}</span>

                <span className="block text-sm font-meduim truncate">{currentUser.email}</span>

              </Dropdown.Header>

              <Link to="/profile">
                <Dropdown.Item>
                  Profile
                </Dropdown.Item>
              </Link>

              <Dropdown.Item onClick={() => handleSignOut}>
                SignOut
              </Dropdown.Item>

            </Dropdown>

          </div>

      </Navbar>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="md:hidden mt-6"
      >
          <Drawer.Header titleIcon={() => <></>}/>

          <Drawer.Items>

            <DashSidebar />

          </Drawer.Items>

      </Drawer>

    </>
    
  )

}
