import React from "react";
import {useState, useEffect} from "react";
import * as jose from "jose";
import { useNavigate } from 'react-router-dom';
import { usePasswordValidation } from "../../Components/usePasswordValidation";

export default function ForgotPassword() {
  let navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [data, setData] = React.useState({
    email: "",
    password1: "",
    password2: "",
  });
  const [
    validLength1,
    hasNumber1,
    upperCase1,
    lowerCase1,
    match1,
    specialChar1,
  ] = usePasswordValidation({
    firstPassword: data.password1,
    secondPassword: data.password2,
    requiredLength: 8,
  });
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
  return (
    <div>
      {/* create a basic forgot password page */}
        <h1>Reset Password</h1>
        <input
          type="password"
          placeholder="Password"
          value={data.password1}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => {
            e.preventDefault();

            setData({
              ...data,
              password1: e.target.value,
            });
          }}
        />
        <ul>
          <li>
            Valid Length:{" "}
            {validLength1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Has a Number: {hasNumber1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            upperCase: {upperCase1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            lowerCase: {lowerCase1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Special Character:{" "}
            {specialChar1 ? <span>True</span> : <span>False</span>}
          </li>
        </ul>
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.password2}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => {
            e.preventDefault();

            setData({
              ...data,
              password2: e.target.value,
            });
          }}
        />
        <ul>
          <li>match: {match1 ? <span>True</span> : <span>False</span>}</li>
        </ul>
        
    </div>
  );
}
