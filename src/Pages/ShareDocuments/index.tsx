import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';

export default function MyDocuments() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  console.log(selectedFile, " is the selected file");
  const [otp, setOtp] = React.useState("");
  var formData = {
    document: selectedFile,
    custom_user: 0,
    shared_with:[],
    
  };
  function uploadFile() {
    if (selectedFile) {
      console.log("uploading file", selectedFile);
      axios.post("http://localhost:8000/documents/self/documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "hotp": otp,
          "Authorization":localStorage.getItem("token")
        },
      }).then((res) => {
        console.log(res);
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
              value={otp}
              placeholder="OTP"
              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
              onChange={(e) => setOtp(e.target.value)}
          />0
        <button onClick={uploadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
        >Upload</button>
      </div>
    </div>
  );
}
