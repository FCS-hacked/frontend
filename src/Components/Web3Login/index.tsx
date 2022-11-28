//@ts-nocheck
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState} from "react";
import {
  BlockchainContext,
} from "../context/BlockchainContext";
import web3 from "web3";
import * as jose from "jose";
import axios from "axios";
import {WriteDirectory, ReadDirectory} from "../context/blockchain";

const Login = () => {

  let navigate = useNavigate();

  const { connectedAccount, connectWallet, getProvider } =
  useContext(BlockchainContext);

  console.log('aksudfjasgf', connectedAccount);

  const initiate_connection = async () => {
    const handleMetamaskLogin = async () => {
      const {payload, unix_timestamp, wallet_address} = (await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/authentication/get-address-verification-payload/`,
          {headers:{"Authorization": localStorage.getItem("token")}})).data;
      if (wallet_address !== connectedAccount) {
        await WriteDirectory(getProvider, payload);
        await axios.patch(process.env.REACT_APP_BACKEND_URL + "/authentication/patch-custom-user/",
            {"fetch_wallet_address": true, "unix_timestamp": unix_timestamp},
            {headers: {"Authorization": localStorage.getItem("token")}})
      }
       navigate("/Profile");
    };

    if (connectedAccount) {
      await handleMetamaskLogin();
    }
  };


  async function handleCheck() {
    let chainId = 11155111;

    if (window.ethereum.networkVersion !== chainId) {
      try {
        console.log("trying to connect to network");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
      } catch (errny) {
        console.log(err, "error");
        // This error code indicates that the chain has not been added to MetaMask.
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Sepolia test network",
                chainId: web3.utils.toHex(11155111),
                nativeCurrency: {
                  name: "SepoliaETH",
                  decimals: 18,
                  symbol: "SepoliaETH",
                },
                rpcUrls: ["https://sepolia.infura.io/v3/"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        }
      }
    }
  }

  useEffect(() => {
    handleCheck();
    if (connectedAccount) {
      console.log(connectedAccount, " is the account");
    }
  });
  const [user, setUser] = useState(null);
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
  return (
    (user!==null) ? (<>
      <div className="flex justify-center mx-5 md:mx-0">
        {/* <Image src={LoginSvg} alt="Login" /> */}
        <div>Login image</div>
      </div>
      <div className="mx-auto flex flex-col justify-center">
        <div className="mx-auto md:-mt-32">
          <div>Metamask image</div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center text-xl space-y-5 md:-mt-24 mb-10 border border-OurBlue rounded-lg p-3 hover:cursor-pointer">
            {!connectedAccount ? (
              <>
                <p className="text-OurBlue text-center">
                  Log in with your{" "}
                  <span className="text-[#f8911e]">Metamask</span>
                </p>
                <button onClick={() =>connectWallet(true)}>
                  <div> Click here to initiate connect </div>
                </button>
              </>
            ) : (
              <>
                <p className="text-OurBlue text-center  hover:cursor-pointer">
                  Connecting to &nbsp;
                  <span className="text-[#f8911e]">{connectedAccount}</span>
                </p>
                <button onClick={async () => {
                  await initiate_connection()
                }
                }>
                  <div> Click here to finalize connection </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-respct h-24 md:h-48 bg-contain bg-no-repeat mx-5 md:mx-0"></div>
      <style jsx>{`
        .connectBtn {
          box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>) : null
  );
};

export default Login;
