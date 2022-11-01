 // @ts-nocheck 
import React, {useEffect, useState} from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar'
import * as jose from 'jose'
import userEvent from '@testing-library/user-event';
import axios from 'axios';

export default function Profile() {
    //decode token
    //get user details
    //display user details
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        (async () => {
            const jwt = localStorage.getItem("token")
            console.log(jwt)
            // const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmlzbWlzaHJhMjAwMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoic2pjbmRzY2QiLCJsYXN0X25hbWUiOiJzY2RrZHNjbiIsInR5cGUiOiIxIiwiY2F0ZWdvcnkiOiIxIiwiZXhwIjoxNjY3MzA5NTU4fQ.yi4lBOJXn5VbxJ71lg9-uvPqxYwHUA_2CMr4k73a2QC1Nd5T2BZMb0EZBqldSFI4NQagfheW-7ZhelLOAdGANKtTWdsh-2__3ukUi3sTsENvgIhHPhCXQ0e5spDD1dsCGAgqD8h40vjyoZ7Pk-h0OZ_1M_WFA6wSMo6Ruxxpedv7WEM_yoZwSVwSk4fkKFCo87RfvwvkP0UqIPEjXtliNJ_yg2NgWt6KkcXDhpO1iJDc_FSqiRhvfIMWRnp0wrlLRi7asMxI-nOKWbmTcdEiKqIE5fVzYDFpjdiOTPGyOqrKRFvvpQ93qLqZzx9md_OXczKb2VoeZ8ufVDigkZoVmH0emrr36xjylWwQWx8AHdJeT7GVhYsoSKMxAdIHCa4TehkZGWVADYMynHbVdG-t9ZmvB9ZFwI16j1rF7yn1-3qdAlFcQsydOtKPJb_zW8h19BxVDc-Z7hf34ciQhlSoOJNvgHaXkjppvy4UqzkS6GdUMiIMLIPDSbpsbabDL0Wz"
            const algorithm = 'RS256'
            const spki = `-----BEGIN PUBLIC KEY-----
            MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0P2/AuXsa6Hk+XmVRNn2056bGub44ODuaQgkgs4VCedqZMY8kFHVf1uV8s4leGHKzDiykGcyuvFf5IaUd30wVbT+FFY6aao4spfbCF6kUcAF/xGTPRDycOjHuQxXbon3M3Dyc463Jw57NzYu6blJDe0uYwlRSIMp+pq1yeZtRGHwixx/OnobB0NtXxONyBUMD3X4NYrZbFv6yyVWYSbOuuvi+dIPIr/oQtq+ktXhLKprXixA0ksc+W+fkjFDipnZc8YEVwISu8To3c9G60aCG/ElpOwbu2SytPdV1Xa1xY9IqLSe+6K84aXEHzX5QhkX4zEb0io1toIjiS5RocP68grTnCi+1FM6WkPRr0XgHXyubm02QRY0xRe0MJmW5erOlGZXlDatDInxqpRNeN+BvA2H6fZD0rot8fEP+DlCc2BdgzS1c8GmKLn7ZQcEoQlhj+JzVtsiAEcuaAKkyHxszfsQlRipQkCj6yG7HRyKHneNQrArWLpFAn9fWvExbY8BAgMBAAE=
            -----END PUBLIC KEY-----`
            const ecPublicKey = await jose.importSPKI(spki, algorithm)
            console.log(ecPublicKey)
            const { payload, protectedHeader } = await jose.compactVerify(jwt, ecPublicKey)
            // console.log(protectedHeader)
            // console.log(new TextDecoder().decode(payload))
            setUser(JSON.parse(new TextDecoder().decode(payload)));
            // if(user.)
            // const decoded = await jose.jwtDecrypt(jwt, ecPublicKey)
            // console.log(protectedHeader)
            // console.log(payload)
        })();
    }, [setUser]);
    const [userDetails, setUserDetails] = useState(undefined);
    useEffect(() => {
        (async () => {
            if(user!==undefined)
                console.log(user.type)
            if(user!==undefined && user.type === "1"){
            console.log(user.type)
            const response = await axios.get("http://localhost:8000/authentication/self/personal-user/", {headers:{"Authorization": localStorage.getItem("token")}})
                console.log(response)
                setUserDetails(response)
            }else if(user!==undefined && user.type === "2"){
            console.log(user.type)
            const response = await axios.get("http://localhost:8000/authentication/self/organization/", {headers:{"Authorization": localStorage.getItem("token")}})
                console.log(response)
                setUserDetails(response)
            }
        })();
    }, [user])
    function Form(props){
        const formType = props.formType;
        // console.log(typeof formType)
        if(formType==="1"){

          return (
            <form className="flex flex-col gap-1 w-4/12 ml-10 pt-5">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="userid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User ID</label>
                        <input type="number" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={user.id} disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={user.first_name}
                        onClick={PromptUser}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={user.last_name}
                        onClick={PromptUser}
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date of Birth</label>
                        <input type="text" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userDetails.data[0].date_of_birth} disabled={true} required/>
                    </div> 
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                        <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userDetails.data[0].address} disabled={true} required/>
                    </div>
                </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.email} disabled required/>
                    </div> 
                    <div className="mb-6">
                        <label htmlFor="proof_of_identity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Proof of Identity</label>
                        <input type="proof_of_identity" id="proof_of_identity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userDetails.data[0].proof_of_identity} disabled required/>
                    </div> 
                    <div className="mb-6">
                        <label htmlFor="proof_of_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Proof of Address</label>
                        <input type="proof_of_address" id="proof_of_address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userDetails.data[0].proof_of_address} disabled required/>
                    </div> 
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        </form>
          )
        }else if(formType==="2") {
        //   console.log("formType 2")
            return(
            <form className="flex flex-col gap-1 w-4/12 ml-10 pt-5">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="organisationid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Organisation ID</label>
                        <input type="number" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={user.id}
                        onClick={PromptUser}
                        />
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={user.first_name}
                        onClick={PromptUser}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={user.last_name}
                        onClick={PromptUser}
                        />
                    </div>
                    <div>
                        <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Images</label>
                        <input type="text" id="images" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={userDetails.data[0].images} disabled={true} required/>
                    </div> 
                    <div>
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location</label>
                        <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={userDetails.data[0].location} disabled={true} required/>
                    </div>
                </div>
                    <div className="mb-6">
                        <label htmlFor="licenses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Licenses</label>
                        <input type="licenses" id="licenses" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={userDetails.data[0].licenses} disabled required/>
                    </div> 
                    <div className="mb-6">
                        <label htmlFor="permits" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Permits</label>
                        <input type="permits" id="permits" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={userDetails.data[0].permits} disabled required/>
                    </div> 
                    
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>
          )      
        }
      }
    function PromptUser(){
        alert("Warning: Your Account will be freezed for admin approval if you change your name")
    }
    console.log(user, "is user")
  return (((user !== undefined) && (userDetails !==undefined)) ?
    (
    <div>
        <div>
            <SignedIn_NavBar/>
            <Form formType={user.type} />
        </div>
    </div>
  ) : null)
}
