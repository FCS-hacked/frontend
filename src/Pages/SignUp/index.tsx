import React from 'react'
import NavBar from '../../Components/Generic_Navbar'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar'
import axios, { Axios } from 'axios'
export default function SignUp() {

    //make an object to store the data
    const [data, setData] = React.useState({
      email:
      "anismishra2001@gmail.com",
      password1:
      "inshallahboysplayedwell",
      password2:
      "inshallahboysplayedwell",
      username:
      "waahbe"
    //   username: "",
    //   password1: "",
    //   password2: "",
    //   email: "",
    });

    function OnSubmit(){
        axios.post('http://localhost:8000/dj-rest-auth/registration/', {
            username: data.username,
            password1: data.password1,
            password2: data.password2,
            email: data.email,
          }, { headers: { 'Content-Type': 'application/json' } })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log(data)
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
                <form className='flex flex-col items-center justify-center w-[300px]' onSubmit={(e) => {
                  e.preventDefault();
                  OnSubmit();}
                }>
                    {/* <input type='text' placeholder='First Name' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='text' placeholder='Last Name' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/>
                    <input type='text' placeholder='Aadhar Number' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'/> */}
                    <input type='text' placeholder='Username' value={data.username} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, username: e.target.value})}
                    />
                    <input type='email' placeholder='Email' value={data.email} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, email: e.target.value})}
                    />
                    <input type='password' placeholder='Password' value={data.password1} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, password1: e.target.value})}
                    />
                    <input type='password' placeholder='Confirm Password' value={data.password2} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, password2: e.target.value})}
                    />
                    <button className='bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:opacity-75 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold' type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>

  )
}
