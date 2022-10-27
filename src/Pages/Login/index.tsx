import React from 'react'
import NavBar from '../../Components/Generic_Navbar'

export default function Login() {
  return (
    //create a login page
    <div>
        <div>
            <NavBar/>
            <div className='flex flex-col items-center justify-center h-[70vh] w-full'>
                <div className='font-nunitoExtraBold text-2xl'>
                    Login
                </div>
                {/* //create a form */}
                
                <form className='flex flex-col items-center justify-center w-[300px]'>
                    <input type='text' placeholder='Username' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='password' placeholder='Password' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <button className='bg-googleBlue bg-opacity-20 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold'>Submit</button>
                </form>
                <div className='flex flex-col items-center justify-center w-[300px]'>
                    <div className='font-nunitoSemiBold text-sm'>
                        Or login with
                    </div>
                    <button className='bg-googleBlue bg-opacity-20 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold'>Google</button>
                </div>
            </div>
        </div>
    </div>
  )
}
