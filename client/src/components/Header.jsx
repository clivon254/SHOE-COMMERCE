

import { Avatar, Badge, Button, Drawer, Dropdown, Navbar ,TextInput} from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate ,NavLink} from 'react-router-dom'
import { MdClose, MdMenu, MdSunny } from "react-icons/md"
import { FaMoon, FaShoppingCart, FaSun } from "react-icons/fa"
import Logo from './Logo'
import { toggleTheme } from '../redux/theme/themeSlice'
import { StoreContext } from '../context/Store'
import { AiOutlineSearch } from "react-icons/ai"
import DashSidebar from './DashSidebar'


export default function Header() {

  const {theme} = useSelector(state => state.theme)

  const {currentUser} = useSelector(state => state.user)

  const {handleSignOut,getCartItems} = useContext(StoreContext)

  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  //   handleSubmit
  const handleSubmit = () => {}

  return (

    <>

      <Navbar className="border-b sticky top-0 z-[100]" >
        
          {/* togglebar */}
          <div className="md:hidden">
            {
              isOpen ? 
                (
                  <Button 
                    gradientMonochrome="failure"
                    className=''
                    onClick={() => setIsOpen(false)}
                  >
                    <MdClose/>
                  </Button>
                ) 
                : 
                (
                  <Button 
                    gradientMonochrome="cyan"
                    className=''
                    onClick={() => setIsOpen(true)}
                  >
                    <MdMenu/>
                  </Button>
                )
            }
          </div>

          <div className="">

            <Logo />

          </div>

          {/* search */}
          <div className="hidden md:block">

           <form onSubmit={handleSubmit} className="">

                <TextInput
                    type="text"
                    placeholder='search....'
                    rightIcon={AiOutlineSearch}
                    className=""
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

           </form>

          </div>
        
          {/*NavLinks  */}
          <div className="hidden md:flex items-center gap-5"> 

                <NavLink to="/" className={({isActive}) => isActive ? "active-link":"hover:active-link"}>Home</NavLink>

                <NavLink to="/about" className={({isActive}) => isActive ? "active-link":"hover:active-link"} >About</NavLink>

                <NavLink to="/contact" className={({isActive}) => isActive ? "active-link":"hover:active-link"}>contact</NavLink>

          </div>
            
          {/* sign-in */}
          <div className="flex items-center gap-x-4 md:order2">
            
            <Link to="/search">

                <Button 
                    className="w-12 h-10 md:hidden"
                    color="gray"
                    pill
                >

                    <AiOutlineSearch />

                </Button>

            </Link>

            <div className="relative">
              
              <Link to="/cart">

                 <FaShoppingCart size={25}/>

                 <div className="rounded-full absolute -top-4 -right-3 w-6 h-6 bg-blue-600 flex items-center justify-center text-white">
                  {0}
                 </div>

              </Link>

            </div>

            <button 
              className="hidden w-10 h-10 md:flex items-center justify-center border rounded-full border-gray-300"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === 'light' ? <FaSun/> : <FaMoon/>}
            </button>
            
            {currentUser ? 
                (
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

                        <Link to="/order">
                            <Dropdown.Item>
                            Orders
                            </Dropdown.Item>
                        </Link>

                        <Dropdown.Item onClick={() => handleSignOut()}>
                            SignOut
                        </Dropdown.Item>

                   </Dropdown>
                ) 
                : 
                (
                    <Link to="/sign-in">

                        <Button
                            gradientDuoTone="purpleToPink"
                            outline
                        >
                            sign in
                        </Button>

                    </Link>
                )
            }

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
