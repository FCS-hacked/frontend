import React from 'react'
import NavBar from '../../Components/Generic_Navbar'
import axios from 'axios';
export default function Login() {
    const [data, setData] = React.useState({
        // username: "",
        // email:"",
        // password: "",
        email:"jhvbfhdf@gmail.com",
        password:"scdksjndcfkjdf",
        username:"huibuhvbgh",
    });
    function OnSubmit(){
        console.log(data)
        axios.post('http://localhost:8000/dj-rest-auth/login/', {
            username: data.username,
            password: data.password,
            email: data.email,
          }, { headers: { 'Content-Type': 'application/json' } })
          .then(function (response) {
            console.log(response);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            console.log(localStorage.getItem('access_token'));
            console.log(localStorage.getItem('refresh_token'));
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  return (
    //create a login page
    <div>
        <div>
            <NavBar/>
            <NavBar/>
            <div className='flex flex-col items-center justify-center h-[70vh] w-full'>
                <div className='font-nunitoExtraBold text-2xl'>
                    Login
                </div>
                {/* //create a form */}
                
                <form className='flex flex-col items-center justify-center w-[300px]'
                onSubmit={(e) => {
                    e.preventDefault();
                    OnSubmit();
                }}
                >
                    <input type='text' value={data.username} placeholder='Username' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, username: e.target.value})}
                    />
                    <input type='email' value={data.email} placeholder='Email' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, email: e.target.value})}
                    />
                    <input type='password' value={data.password} placeholder='Password' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, password: e.target.value})}
                    />
                    <button type='submit' className='bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:bg-opacity-80 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold'>Submit</button>
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
