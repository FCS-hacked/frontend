import React, {useState} from 'react'
import NavBar from '../../Components/Generic_Navbar'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar'
import Form from '../../Components/Form';
import axios from 'axios';
export default function SignUp() {
  
  const [userType, setUserType] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  
  const changeHandler = (event) => {
    	setSelectedFile(event.target.files[0]);
    };
    const handleChange = event => {
      console.log(event.target.value);
      setUserType(event.target.value);
    };
    function PromptUser(){
      alert("Your account has been created succesfully! You will receive HOTP secret on email. You can login after admin approves your account.");
    }
  
    
  const [selectedFile2, setSelectedFile2] = useState();
  const changeHandler2 = (event) => {
    	setSelectedFile2(event.target.files[0]);
    };
    
    //make an object to store the data
    
    
    

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
    
    

  return (
    <div>
            
        <div>
            {/* <SignedIn_NavBar/> */}
            <NavBar/>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='font-nunitoExtraBold text-2xl pt-10'>
                    Sign Up
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                  <div className='flex flex-row items-center justify-center text-sm font-nunitoExtraBold pt-2'>
                    <div className='flex flex-row items-center justify-center w-1/2'>
                      <input type="radio" id="Individual" name = "user_type" value="Individual"
                        onChange={handleChange}
                        checked={userType === 'Individual'}
                      />
                      <label htmlFor="Individual" className='pl-1'>Individual</label>
                    </div>
                    <div className='flex flex-row items-center justify-center w-1/2'>
                      <input type="radio" id="Organisationr" name = "user_type" value="Organisation" className='ml-5'
                        onChange={handleChange}
                        checked={userType === 'Organisation'}
                      />
                      <label htmlFor="Organisation" className='pl-1'>Organisation</label>
                    </div>
                  </div>
                </div>
                <Form formType={userType} />               
            </div>
        </div>
    </div>

  )
}
