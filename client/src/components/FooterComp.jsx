

import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterComp() {

  return (
    
    <Footer className="border border-t-4 border-blue-300 p-4">

      <div className="w-full max-w-7xl mx-auto ">

        <div className="grid w-full justify-between sm:flex md:grid-cols-1">

          <div className="mt-5">

            <Link>

              <Logo/>

            </Link>

          </div>

          <div className="grid grid-cols-3 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              
              <div className="">

                <Footer.Title title="About"/>

                <Footer.LinkGroup col>

                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get to know Us
                  </Footer.Link>

                </Footer.LinkGroup>
                
              </div>

              <div className="">

                <Footer.Title title="Follow us"/>

                <Footer.LinkGroup col>

                  <Footer.Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Github
                  </Footer.Link>

                  <Footer.Link href="#">Discord</Footer.Link>
                  
                </Footer.LinkGroup>

              </div>

              <div className="">

                <Footer.Title title="Legal"/>

                <Footer.LinkGroup col>

                  <Footer.Link href="#">privacy Policy</Footer.Link>

                  <Footer.Link href="#">Term &amp; condition</Footer.Link>

                </Footer.LinkGroup>

              </div>

          </div>

        </div>

        <Footer.Divider/>

        <div className="w-full sm:flex sm:items-center sm:justify-between space-y-4">

          <Footer.Copyright
            href="#"
            by="Clivon Osire"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 sm:justify-center">

            <Footer.Icon href="#" icon={BsFacebook} />
                       
            <Footer.Icon href="#" icon={BsInstagram} />
            
            <Footer.Icon href="#" icon={BsTwitter} />
            
            <Footer.Icon href="#https://github.com/clivon254" icon={BsGithub} />
            
            <Footer.Icon href="#" icon={BsDribbble} />

          </div>

        </div>

      </div>

    </Footer>

  )

}
