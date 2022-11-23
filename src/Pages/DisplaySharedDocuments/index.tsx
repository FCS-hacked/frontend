import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable1 from '../../Components/BasicTable1';

export default function SharedDocuments() {
  return (


    <div>
      <div>
        <SignedIn_NavBar/>
        {/* <UploadFiles selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <button onClick={uploadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
        >Upload</button> */}
        <BasicTable1
          url="http://localhost:8000/documents/documents-shared/"  
        />
      </div>
    </div>
  );
}

