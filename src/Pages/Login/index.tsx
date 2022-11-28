//@ts-nocheck
import React from 'react'
import NavBar from '../../Components/Generic_Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import * as jose from "jose";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import ForgotPassword from './ChangePassword';

export default function Login() {
  
  let navigate = useNavigate();
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const handleShift = () => {
    const newLayoutName = (
      (layout === "default") ?
       "shift" : 
       "default");
    setLayout(newLayoutName);
  };
  const onKeyPress = (button:any) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{bksp}") {
      setData((prevState) => {
        return { ...prevState, otp : prevState.otp.slice(0, -1) };
      });
    }
    else {
      setData((prevState) => {
        return { ...prevState, otp : prevState.otp + button };
      });
    }
  };
  
    const [data, setData] = React.useState({
        // username: "",
        // email:"",
        // password: "",
        email:"anismishra2001@gmail.com",
        password:"inshallahboysplayedwell",
        username:"anismishra2001@gmail.com",
        otp:""
    });
    const onChange = (input:any) => {
      setData({ ...data, otp: input.target.value })
    };
    function OnSubmit(){
      console.log(data);
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/unauth/login/",
          {
            email: data.email,
            password: data.password,
          },
          { headers: { "Content-Type": "application/json", "hotp":data.otp } }
        )
        .then(function (response) {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          navigate("/Web3Login");
          console.log(localStorage.getItem("token"));
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
    const [user, setUser] = useState(undefined);
    useEffect(() => {
      (async () => {
        const jwt = localStorage.getItem("token");
        // console.log(jwt);
        // const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmlzbWlzaHJhMjAwMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoic2pjbmRzY2QiLCJsYXN0X25hbWUiOiJzY2RrZHNjbiIsInR5cGUiOiIxIiwiY2F0ZWdvcnkiOiIxIiwiZXhwIjoxNjY3MzA5NTU4fQ.yi4lBOJXn5VbxJ71lg9-uvPqxYwHUA_2CMr4k73a2QC1Nd5T2BZMb0EZBqldSFI4NQagfheW-7ZhelLOAdGANKtTWdsh-2__3ukUi3sTsENvgIhHPhCXQ0e5spDD1dsCGAgqD8h40vjyoZ7Pk-h0OZ_1M_WFA6wSMo6Ruxxpedv7WEM_yoZwSVwSk4fkKFCo87RfvwvkP0UqIPEjXtliNJ_yg2NgWt6KkcXDhpO1iJDc_FSqiRhvfIMWRnp0wrlLRi7asMxI-nOKWbmTcdEiKqIE5fVzYDFpjdiOTPGyOqrKRFvvpQ93qLqZzx9md_OXczKb2VoeZ8ufVDigkZoVmH0emrr36xjylWwQWx8AHdJeT7GVhYsoSKMxAdIHCa4TehkZGWVADYMynHbVdG-t9ZmvB9ZFwI16j1rF7yn1-3qdAlFcQsydOtKPJb_zW8h19BxVDc-Z7hf34ciQhlSoOJNvgHaXkjppvy4UqzkS6GdUMiIMLIPDSbpsbabDL0Wz"
        const algorithm = "RS256";
        const spki = `-----BEGIN PUBLIC KEY-----
              MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0P2/AuXsa6Hk+XmVRNn2056bGub44ODuaQgkgs4VCedqZMY8kFHVf1uV8s4leGHKzDiykGcyuvFf5IaUd30wVbT+FFY6aao4spfbCF6kUcAF/xGTPRDycOjHuQxXbon3M3Dyc463Jw57NzYu6blJDe0uYwlRSIMp+pq1yeZtRGHwixx/OnobB0NtXxONyBUMD3X4NYrZbFv6yyVWYSbOuuvi+dIPIr/oQtq+ktXhLKprXixA0ksc+W+fkjFDipnZc8YEVwISu8To3c9G60aCG/ElpOwbu2SytPdV1Xa1xY9IqLSe+6K84aXEHzX5QhkX4zEb0io1toIjiS5RocP68grTnCi+1FM6WkPRr0XgHXyubm02QRY0xRe0MJmW5erOlGZXlDatDInxqpRNeN+BvA2H6fZD0rot8fEP+DlCc2BdgzS1c8GmKLn7ZQcEoQlhj+JzVtsiAEcuaAKkyHxszfsQlRipQkCj6yG7HRyKHneNQrArWLpFAn9fWvExbY8BAgMBAAE=
              -----END PUBLIC KEY-----`;
        const ecPublicKey = await jose.importSPKI(spki, algorithm);
        // console.log(ecPublicKey);
        if (jwt != null) {
          const { payload, protectedHeader } = await jose.compactVerify(
            jwt,
            ecPublicKey
          );
          setUser(JSON.parse(new TextDecoder().decode(payload)));
          console.log(new TextDecoder().decode(payload), " payload");
        }else{
          navigate("/login")
        }
      })();
    }, [setUser]);
    console.log(user, " user");
  return (
    //create a login page
    <div>
      <div>
        <NavBar />
        <div className="flex flex-col items-center justify-center mt-5 w-full">
          <div className="font-nunitoExtraBold text-2xl">Login</div>
          {/* //create a form */}
          <form
            className="flex flex-col items-center justify-center w-[500px]"
            onSubmit={(e) => {
              e.preventDefault();
              OnSubmit();
            }}
          >
            <input
              type="email"
              value={data.email}
              placeholder="Email"
              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              value={data.password}
              placeholder="Password"
              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            If you have disabled 2 factor authentication, please enter the 000000 in otp section
            <input
              type="text"
              disabled={true}
              value={data.otp}
              placeholder="OTP"
              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
              onChange={(e) => setData({ ...data, otp: e.target.value })}
            />
            {
                (
                    <Keyboard
                      keyboardRef={(r : any) => (keyboard.current = r)}
                      layoutName={layout}
                      // onChange={(e:any) => }
                      onKeyPress={onKeyPress}
                    />
                )
            }
            <button
              type="submit"
              className="bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:bg-opacity-80 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
