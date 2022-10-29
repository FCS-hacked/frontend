import axios from "axios";

//  axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-type": "application/json"
//   }
// });


class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post("http://localhost:8000/upload", formData, {
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