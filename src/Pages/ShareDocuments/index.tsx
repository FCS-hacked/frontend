//@ts-nocheck
import React from "react";
import SignedIn_NavBar from "../../Components/SignedIn_NavBar";
import axios from "axios";
import UploadFiles from "../../Components/UploadFile";
import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as jose from "jose";
import "react-simple-keyboard/build/css/index.css";

export default function MyDocuments() {
  let navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [layout, setLayout] = useState("default");
  const [user, setUser] = useState(null);
  const keyboard = useRef();
  console.log(selectedFile, " is the selected file");
  const [otp, setOtp] = React.useState("");
  function PromptUser() {
    alert("Your document has been uploaded successfully.");
  }
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
      } else {
        navigate("/login");
      }
    })();
  }, [setUser]);
  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };
  const onKeyPress = (button: any) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{bksp}") {
      setOtp((prevOtp) => prevOtp.slice(0, -1));
    } else {
      setOtp((prevOtp) => prevOtp + button);
    }
  };
  var formData = {
    document: selectedFile,
    custom_user: 0,
    shared_with: [],
  };
  function uploadFile() {
    if (selectedFile) {
      console.log("uploading file", selectedFile);
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/documents/self/documents/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              hotp: otp,
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            PromptUser();
          }
          console.log(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return user !== null ? (
    <div>
      <div>
        <SignedIn_NavBar />
        <UploadFiles
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        {user !== null && user.two_factor_enabled && (
          <input
            type="text"
            disabled={true}
            value={otp}
            placeholder="OTP"
            className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
            onChange={(e) => setOtp((prevOtp) => prevOtp + e.target.value)}
          />
        )}
        {user !== null && user.two_factor_enabled && (
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
            // onChange={(e:any) => }
            onKeyPress={onKeyPress}
          />
        )}
        <button
          onClick={uploadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
        >
          Upload
        </button>
      </div>
    </div>
  ) : null;
}
