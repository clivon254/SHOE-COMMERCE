


import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiChartPie, HiUsers, HiOutlineHome, HiLogout, HiAnnotation } from "react-icons/hi"
import { StoreContext } from '../context/Store'
import { FaMoon, FaSun } from "react-icons/fa"
import { toggleTheme } from '../redux/theme/themeSlice'

export default function DashSidebar() {

  const {currentUser} = useSelector(state => state.user)

  const {theme} = useSelector(state => state.theme)

  const {handleSignOut} = useContext(StoreContext)

  const dispatch = useDispatch()

  return (

   <Sidebar className="w-full h-full">

      <Sidebar.Items>

          <Sidebar.ItemGroup>

            <div className="flex flex-col gap-y-2">

              <Link to='/'>

                <Sidebar.Item
                    active={window.location.pathname === '/'}
                    icon={HiOutlineHome}
                    as="div"
                >
                  Dashboard
                </Sidebar.Item>

              </Link>

              <Link to='/about'>

                <Sidebar.Item
                    active={window.location.pathname === '/about'}
                    icon={HiAnnotation}
                    as="div"
                >
                  About
                </Sidebar.Item>

              </Link>

              <Link to='/contact'>

                <Sidebar.Item
                    active={window.location.pathname === '/contact'}
                    icon={HiUsers}
                    as="div"
                >
                 Contact
                </Sidebar.Item>

              </Link>

            {currentUser && (

               <Sidebar.Item
                icon={HiLogout}
                onClick={handleSignOut}
                className="cursor-pointer"
                as="div"
               >
                sign out
              </Sidebar.Item>

            )}

             <Sidebar.Item
                className="cursor-pointer "
                as="div"
             >
                <button 
                    className="w-10 h-10 flex items-center justify-center border rounded-full border-gray-300"
                    onClick={() => dispatch(toggleTheme())}
                >
                  {theme === 'light' ? <FaSun/> : <FaMoon/>}
                </button>
              </Sidebar.Item>


             
            </div>

          </Sidebar.ItemGroup>

      </Sidebar.Items>

   </Sidebar>

  )
  
}
