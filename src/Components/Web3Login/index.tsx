//@ts-nocheck
import LoginSvg from "../public/images/login.svg";
import { useNavigate } from 'react-router-dom';
import React, { Fragment, useContext, useEffect, useState } from "react";
import Profile from "../public/svg/Profile.svg";
import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext";
import web3 from "web3";
import axios from "axios";

const Login = () => {

  let navigate = useNavigate();

  const { connectedAccount, connectWallet, disconnect } =
  useContext(BlockchainContext);
 
  useEffect(() => {
    const handleMetamaskeLogin = async () => {
      axios.patch("http://localhost:8000/authentication/patch-custom-user/", { "wallet_address": connectedAccount } ,{headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
        if(res.status === 201){
          alert("Wallet Address Updated Successfully please procced");
        }
        navigate("/Profile");
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    };
  
    if (connectedAccount) {
      handleMetamaskeLogin();
    }
  }, [connectedAccount]);


  async function handlCheck() {
    let chainId = 80001;

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
                chainName: "Mumbai Testnet",
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: {
                  name: "MATIC",
                  decimals: 18,
                  symbol: "MATIC",
                },
                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        }
      }
    }
  }

  useEffect(() => {
    handlCheck();
    if (connectedAccount) {
      console.log(connectedAccount, " is the account");
    }
  });
 
  return (
    <>
      <div className="mx-auto flex justify-center mx-5 md:mx-0">
        {/* <Image src={LoginSvg} alt="Login" /> */}
        <div> Login image</div>
      </div>
      <div className="mx-auto flex flex-col justify-center">
        <div className="mx-auto md:-mt-32">
          <div> Metamask image</div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center text-xl space-y-5 md:-mt-24 mb-10 border border-OurBlue rounded-lg p-3 hover:cursor-pointer">
            {connectedAccount ? (
              <>
                <p className="text-OurBlue text-center  hover:cursor-pointer">
                  Disconnect from &nbsp;
                  <span className="text-[#f8911e]">{connectedAccount}</span>
                </p>
                <button onClick={() => disconnect()}>
                  <div> click please</div>
                </button>
              </>
            ) : (
              <>
                <p className="text-OurBlue text-center">
                  Log in with your{" "}
                  <span className="text-[#f8911e]">Metamask</span>
                </p>
                <button onClick={() => connectWallet(true)
                }>
                  <div> yahan logo aaega</div>
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
    </>
  );
};

export default Login;