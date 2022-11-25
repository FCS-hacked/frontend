import React from 'react'
import NavBar from '../../Components/Generic_Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export default function Login() {
  
  let navigate = useNavigate();
  const [keyboardVisibility, setKeyboardVisibility] = useState(true);
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
          navigate("/profile");
          console.log(localStorage.getItem("token"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  return (
    //create a login page
    <div>
      <div>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
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
            <input
              type="text"
              disabled={true}
              value={data.otp}
              placeholder="OTP"
              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
              onChange={(e) => setData({ ...data, otp: e.target.value })}
              // onFocus={() => {
              //   setKeyboardVisibility(true);
              // }}
            />
            {
                keyboardVisibility && (
                    <Keyboard
                      keyboardRef={r => (keyboard.current = r)}
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
          <div className="flex flex-col items-center justify-center w-[300px]">
            <div className="font-nunitoSemiBold text-sm">Or login with</div>
            <button className="bg-googleBlue bg-opacity-20 text-white rounded-md p-2 my-2 w-1/2 font-nunitoSemiBold">
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
