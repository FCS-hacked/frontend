import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';

export default function MyDocuments() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  console.log(selectedFile, " is the selected file");
  var formData = {
    "document": selectedFile,
    "custom_user": 0,
    "shared_with":[],
  };
  function uploadFile() {
    if (selectedFile) {
      console.log("uploading file", selectedFile);
      axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        <button onClick={uploadFile}>Upload</button>
        <BasicTable/>
      </div>
    </div>
  );
}
