import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import axios from "axios";
export default function AddProduct() {
  let navigate = useNavigate();
  const [user, setUser] = useState(undefined);
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
      }else{
        navigate("/login")
      }
    })();
  }, [setUser]);
  function PromptUser(){
    alert("Product created successfully");
  }
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
  });
  function OnSubmitIndividual(){
    axios.post(process.env.REACT_APP_BACKEND_URL + '/products/self/products/', {
        name: product.name,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url,
      }, {headers:{"Authorization": localStorage.getItem("token")}})
      .then(function (response) {
        if(response.status === 201){
            PromptUser();
          }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(product)
}
  return ((user!==undefined) && (user['type']==='2') && user['category']==='2') ? (
    <div>
        <form className='flex flex-col items-center justify-center w-[300px]' onSubmit={(e) => {
          e.preventDefault();
          OnSubmitIndividual();}
        }>
          <input type='text' placeholder='Name' value={product.name} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
          onChange={(e) => {
            e.preventDefault();
            setProduct({ ...product, name: e.target.value})
          }
          }
          />
          <input type='number' placeholder='Price' value={product.price} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
          onChange={(e) => setProduct({ ...product, price: e.target.value})}
          />
          <input type='number' placeholder='Stock' value={product.stock} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
          onChange={(e) => setProduct({ ...product, stock: e.target.value})}
          />
          <input type='text' placeholder='' value={product.image_url} className='border-2 border-gray-300 rounded-md p-2 my-2 w-full' 
          onChange={(e) => setProduct({ ...product, image_url: e.target.value})}
          />          
          <button className='bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:opacity-75 text-white rounded-md p-2 mt-2 mb- w-1/2 font-nunitoSemiBold' type="submit">Submit</button>
        </form>
    </div>
  ) : null;
}
