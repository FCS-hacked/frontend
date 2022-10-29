import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
export default function MyDocuments() {
  // function to upload files and send them using axios
  const uploadFile = (e:any) => {
    console.log("clicked")
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  return (


    <div>
      <div>
        <SignedIn_NavBar/>
        <button 
          onClick={uploadFile}
        >Upload</button>
        <BasicTable/>
      </div>
    </div>
  );
}
