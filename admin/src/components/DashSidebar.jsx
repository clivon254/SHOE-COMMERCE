

import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiChartPie, HiCog, HiDocumentAdd, HiLogout, HiOutlineSupport } from "react-icons/hi"
import { StoreContext } from '../context/Store'

export default function DashSidebar() {

  const {currentUser} = useSelector(state => state.user)

  const {handleSignOut} = useContext(StoreContext)

  return (

   <Sidebar className="w-full h-full">

      <Sidebar.Items>

          <Sidebar.ItemGroup>

            <div className="flex flex-col gap-y-2">

              <Link to='/'>

                <Sidebar.Item
                    active={window.location.pathname === '/'}
                    icon={HiChartPie}
                    as="div"
                >
                  Dashboard
                </Sidebar.Item>

              </Link>

              <Link to='/add-products'>

                <Sidebar.Item
                    active={window.location.pathname === '/add-products'}
                    icon={HiDocumentAdd}
                    as="div"
                >
                  Add product
                </Sidebar.Item>

              </Link>

              <Link to='/list-products'>

                <Sidebar.Item
                    active={window.location.pathname === '/list-products'}
                    icon={HiOutlineSupport}
                    as="div"
                >
                  List Of Products
                </Sidebar.Item>

              </Link>

              <Link to='/list-orders'>

                <Sidebar.Item
                    active={window.location.pathname === '/list-orders'}
                    icon={HiCog}
                    as="div"
                >
                  List of Orders
                </Sidebar.Item>

              </Link>

              <Sidebar.Item
                  icon={HiLogout}
                  onClick={handleSignOut}
                  className="cursor-pointer"
                  as="div"
              >
                sign out
              </Sidebar.Item>

            </div>

          </Sidebar.ItemGroup>

      </Sidebar.Items>

   </Sidebar>

  )
  
}
