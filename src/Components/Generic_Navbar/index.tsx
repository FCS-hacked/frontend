 // @ts-nocheck 
import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../Images/logo.png'
import {useState} from 'react';
import { useLocation } from "react-router-dom";
function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();
  return (
    <>
    <nav className="w-full bg-[white] shadow large:hidden z-40 fixed">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 z-50">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="md:hidden z-50">
              <button
                  className="p-2 z-50 text-gray-700 rounded-md outline-none "
                  onClick={() => setNavbar(!navbar)} 
              >
                {navbar ? (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                      <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                      />
                  </svg>
                ) : (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                      />
                  </svg>
                )}
              </button>
            </div>
            <Link className=' font-nunitoBold' to={'/'}>
              Project Name
            </Link>
            
          </div>
        </div>
          <div  className='z-50  bg-white absolute bg-[white] w-full'>
              <div
                  className={`flex-1 justify-self-center pb-3 mt-[2vmax] md:block md:pb-0 md:mt-0 ${
                      navbar ? "block" : "hidden"
                  }`}
              >
                  <ul className="flex flex-col w-full items-center opacity-100 z-[100] text-textSecondary bg-white justify-center space-y-5">
                    <a href="#" className="whitespace-nowrap text-base font-nunitoSemiBold">
                      Sign in
                    </a>
                    <a
                      href="#"
                      className=" inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-googleBlue bg-opacity-25 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-googleBlue hover:bg-opacity-20"
                    >
                      Sign up
                    </a>
                  </ul>
              </div>
          </div>
      </div>
    </nav>
    <div className="flex w-full justify-between items-center top-0 bg-[white] z-50 shadow p-[1.4vmax] sticky small:hidden small:pt-[3vmax]">
      <div className="space-y-2 z-40 large:hidden small:hidden">
        <span className="block w-7 h-1 bg-textMain z-40"></span>
        <span className="block w-7 h-1 bg-textMain z-40"></span>
        <span className="block w-7 h-1 bg-textMain z-40"></span>
      </div>
      <Link to={'/'} className='font-nunitoBold w-1/3 ml-[2vmax] small:w-10/12 small:ml-[4vmax] small:hidden'>Project Name</Link>
      <div className="flex w-2/6 justify-end small:hidden mr-[2.5vmax] text-[1.3vmax] font-google font-semibold">
        <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
          <a href="#" className="whitespace-nowrap text-base font-nunitoSemiBold">
            Sign in
          </a>
          <a
            href="#"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-googleBlue bg-opacity-25 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-googleBlue hover:bg-opacity-20"
          >
            Sign up
          </a>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default NavBar