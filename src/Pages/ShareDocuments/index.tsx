import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';
import { useState, useRef } from 'react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export default function MyDocuments() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  console.log(selectedFile, " is the selected file");
  const [otp, setOtp] = React.useState("");
  function PromptUser(){
    alert("Your document has been uploaded successfully.");
  }
  const handleShift = () => {
    const newLayoutName = (
      (layout === "default") ?
       "shift" : 
       "default");
    setLayout(newLayoutName);
  };
  const onKeyPress = (button:any) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{bksp}") {
      setOtp((prevOtp) => (prevOtp.slice(0, -1)));
    }
    else {
      setOtp((prevOtp) => (prevOtp + button));
    }
  };
  var formData = {
    document: selectedFile,
    custom_user: 0,
    shared_with:[],
  };
  function uploadFile() {
    if (selectedFile) {
      console.log("uploading file", selectedFile);
      axios.post(process.env.REACT_APP_BACKEND_URL + "/documents/self/documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "hotp": otp,
          "Authorization":localStorage.getItem("token")
        },
      }).then((res) => {
        if(res.status === 201){
          PromptUser();
        }
        console.log(res.status);
      }
      ).catch((err) => {
        console.log(err);
      }
      );
      
    }
  }

  return (


    <div>
      <div>
        <SignedIn_NavBar/>
        <UploadFiles selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <input
              type="text"
              disabled={true}
              value={otp}
              placeholder="OTP"
              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
              onChange={(e) => setOtp((prevOtp) => (prevOtp + e.target.value))}
            />
            {
                (
                    <Keyboard
                      keyboardRef={r => (keyboard.current = r)}
                      layoutName={layout}
                      // onChange={(e:any) => }
                      onKeyPress={onKeyPress}
                    />
                )
            }
        <button onClick={uploadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
        >Upload</button>
      </div>
    </div>
  );
}
