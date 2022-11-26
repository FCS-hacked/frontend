import { useState, useEffect, useMemo } from "react";
import SignedIn_NavBar from '../Components/SignedIn_NavBar'
import * as jose from 'jose'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Settings() {
    const [user, setUser] = useState(undefined);
    const [userType, setUserType] = useState("");
//   useEffect(() => 
//   {
//     console.log(url, " is defind");
//     (async () => {
//       const result = await axios(url, {headers:{"Authorization": localStorage.getItem("token")}});
//       setData(result.data);
//       setData2(result.data[0].custom_user_detailed);
//     })();
//   }, [url]);
  
    let navigate = useNavigate();
    const handleChange = (
      event: React.ChangeEvent<{ value: string }>
      ) => {
        console.log(event.target.value);
        setUserType(event.target.value);
        if(event.target.value === "true"){
            axios.patch(process.env.REACT_APP_BACKEND_URL + '/authentication/patch-custom-user/', {two_factor_enabled: true}, {headers:{"Authorization": localStorage.getItem("token")}})
            .then((response) => {
                console.log(response);
                localStorage.clear();
            window.location.reload();
            navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });

        }else if(event.target.value === "false"){
            axios.patch('http://localhost:8000/authentication/patch-custom-user/', {two_factor_enabled: false}, {headers:{"Authorization": localStorage.getItem("token")}})
            .then((response) => {
                console.log(response);
                localStorage.clear();
            window.location.reload();
            navigate("/");
            })
            .catch((error) => {
                console.log(error);
            }
            );
        }
    };


  return (
    (
        <div>
            <SignedIn_NavBar/>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='flex flex-row items-center justify-center text-sm font-nunitoExtraBold pt-2'>
                    Do you want to disable two factor authentication?
                    <div className='flex flex-row items-center justify-center w-1/2'>
                        <input type="radio" id="Yes" name = "user_type" value="false"
                        onChange={handleChange}
                        checked={userType === "false"}
                        />
                        <label htmlFor="Yes" className='pl-1'>Yes</label>
                    </div>
                    <div className='flex flex-row items-center justify-center w-1/2'>
                        <input type="radio" id="No" name = "user_type" value="true" className='ml-5'
                        onChange={handleChange}
                        checked={userType === "true"}
                        />
                        <label htmlFor="No" className='pl-1'>No</label>
                    </div>
                </div>
            </div>
        </div>
  ))
}
