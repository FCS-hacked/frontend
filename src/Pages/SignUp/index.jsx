import React, {useState} from 'react'
import NavBar from '../../Components/Generic_Navbar'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar'
import axios, { Axios } from 'axios';
export default function SignUp() {

  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    	setSelectedFile(event.target.files[0]);
    };
    
    //make an object to store the data
    const [data, setData] = React.useState({
      email: "anismishra200@gmail.com",
      password1: "inshallahboysplayedwell",
      password2: "inshallahboysplayedwell",
      first_name: "sjcndscd",
      last_name: "scdkdscn",
      address: "sdsdfd",
      date_of_birth: "21/07/2001",
      category: "1",
      proof_of_identity: undefined,
      proof_of_address: undefined,
    //   username: "",
    //   password1: "",
    //   password2: "",
    //   email: "",
    });
    
    // function selectFile(event:any) {
    //     // this.setState({
    //     //   selectedFiles: event.target.files,
    //     // });
    //     console.log(event.target.files[0]);
    //     let file = event.target.files[0];
    //     console.log(file);
    //     setData((prevState) => ({ ...prevState, proof_of_identity:file}));
    // }

    console.log(selectedFile,"selectedFile");
    
    function OnSubmit(){
        axios.post('http://localhost:8000/dj-rest-auth/registration/', {
            username: data.email,
            password1: data.password1,
            password2: data.password2,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            date_of_birth: data.date_of_birth,
            category: data.category,
            proof_of_identity: selectedFile,
            proof_of_address: data.proof_of_address,
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
            {/* <SignedIn_NavBar/> */}
            <NavBar/>
            <div className='flex flex-col items-center justify-center w-full'>
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
                    <input type='email' placeholder='Email' value={data.email} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, email: e.target.value}))}
                    />
                    <input type='password' placeholder='Password' value={data.password1} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, password1: e.target.value}))}
                    />
                    <input type='password' placeholder='Confirm Password' value={data.password2} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, password2: e.target.value}))}
                    />
                    <input type='text' placeholder='First Name' value={data.first_name} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full' 
                    onChange={(e) => setData((prevState) => ({ ...prevState, first_name: e.target.value}))}
                    />
                    <input type='text' placeholder='Last Name' value={data.last_name} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, last_name: e.target.value}))}
                    />
                    <input type='text' placeholder='Address' value={data.address} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, address: e.target.value}))}
                    />
                    <input type='date' placeholder='Date of Birth' value={data.date_of_birth} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, date_of_birth: e.target.value}))}
                    />
                    <input type='text' placeholder='Category' value={data.category} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData((prevState) => ({ ...prevState, category: e.target.value}))}
                    />
                    {/* //Upload a document as a proof of Identity  */}
                    <input type="file" name="file" onChange={changeHandler} />
                    {/* <input type='file' placeholder='Proof of Identity' value={data.proof_of_identity} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => setData({...data, proof_of_identity: e.target.value})}
                    /> */}
                    {/* //Upload a document as a proof of Address */}
                    {/* <input type='file' placeholder='Proof of Address' value={data.proof_of_address} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
                    onChange={(e) => {
                        setData((prevState) => ({ ...prevState, proof_of_identity: e.target.files}));
                    }}
                    /> */}
                    <button className='bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:opacity-75 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold' type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>

  )
}
