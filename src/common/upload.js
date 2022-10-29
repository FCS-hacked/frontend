import axios from "axios";

//  axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-type": "application/json"
//   }
// });


class UploadFilesService {
  upload(file, onUploadProgress) {
    console.log(file);
    var formData = {
      "document": file,
      "custom_user": 0,
      "shared_with":[],
    };

    // formData.append("file", file);
    return axios.post("http://localhost:8000/documents/self/documents/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get("http://localhost:8000files");
  }
}

export default new UploadFilesService();