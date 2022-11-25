// @ts-nocheck

import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

import {SignFile,
  GetFileSigners} from "../../Components/context/blockchain";

import { BlockchainContext } from "../../Components/context/BlockchainContext";
function App() {

  const [neededArray, setNeededArray] = useState([]);
	const [ sha, setSha ] = useState('');

	const { getProvider, connectedAccount } = useContext(BlockchainContext);
	// useEffect to check if the router query has sha variable and if it does, then set the sha variable to the state
	useEffect(() => {
		console.log('window.location.search',window.location.search);
		if (window.location.search) {
			const urlParams = new URLSearchParams(window.location.search);
			const file = urlParams.get('sha');

			var q =  BigInt('0x' + file); 
			console.log(q.toString(), " is here");
			setSha(q.toString());

		}
	}, []);
  const button1handler = async () => {
		SignFile(getProvider,sha);
  }

  const button2Handler = async () => {
    GetFileSigners(getProvider,sha);
  }
	console.log(neededArray," is her validie");
  
	return (
    <div className="App">
            {connectedAccount ? (
              <button onClick={()=>{button1handler()}} className='cta-button mint-nft-button'>
              Sign File
            </button>
            ) : null}

            {connectedAccount ? (
             <button onClick={()=>{button2Handler()}} className='cta-button mint-nft-button'>
            See signers
           </button>
            ) : null}   
    </div>
  );
}

export default App;

