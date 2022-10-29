import React from 'react'
import NavBar from '../../Components/Generic_Navbar'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar'
import axios, { Axios } from 'axios'
export default function SignUp() {
    function OnSubmit(){
        axios.post('http://localhost:8000/api/users/signup', {
            // email: 
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  return (
    <div>
            
        <div>
            <SignedIn_NavBar/>
            <NavBar/>
            <div className='flex flex-col items-center justify-center h-[85vh] w-full'>
                <div className='font-nunitoExtraBold text-2xl'>
                    Sign Up
                </div>
                <form className='flex flex-col items-center justify-center w-[300px]'>
                    {/* <input type='text' placeholder='First Name' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='text' placeholder='Last Name' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='text' placeholder='Aadhar Number' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/> */}
                    <input type='text' placeholder='Username' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='text' placeholder='Email' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='password' placeholder='Password' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='password' placeholder='Confirm Password' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <button className='bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:opacity-75 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold'>Submit</button>
                </form>
                
                
                
            </div>
        </div>
    </div>

  )
}
