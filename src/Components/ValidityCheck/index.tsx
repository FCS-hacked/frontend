import { useState, useEffect, useContext } from 'react';
import { BigNumber, ethers } from 'ethers';

import {SignFile,
  GetFileSigners} from "../context/blockchain";

import { BlockchainContext } from "../context/BlockchainContext";
function App(props: {sha : any}) {
	const {sha} = props;
  const [neededArray, setNeededArray] = useState([]);
	const { getProvider, connectedAccount } = useContext(BlockchainContext);
	// useEffect to check if the router query has sha variable and if it does, then set the sha variable to the state
	// useEffect(() => {
	// 	console.log('window.location.search',window.location.search);
	// 	if (window.location.search) {
	// 		const urlParams = new URLSearchParams(window.location.search);
	// 		const file = urlParams.get('sha');
	// 		console.log('file',file);
	// 		var q =  BigInt('0x' + file); 
	// 		console.log('q',q);
	// 		console.log(q.toString(), " is here");
	// 		setSha(q.toString());
	// 	}
	// }, []);
  const button1handler = async () => {
		console.log('sha here', sha);
		const x = await GetFileSigners(getProvider,sha);
		console.log('x', x);
		if(!x.includes(connectedAccount)){
			SignFile(getProvider,sha);
		}
		else{
			alert("You have already signed this file");
		}

  }

  const button2Handler = async () => {
    await GetFileSigners(getProvider,sha);
		console.log('sha here', sha);
  }
  
	return (
    <div>
            {connectedAccount ? (
              <button onClick={()=>{button1handler()}} className='cta-button mint-nft-button'>
              Sign File
            </button>
            ) : null}
						<br/>

            {connectedAccount ? (
             <button onClick={()=>{button2Handler()}} className='cta-button mint-nft-button'>
            See signers
           </button>
            ) : null}   
						{connectedAccount && neededArray.length > 0 ? (
							<div>
								{neededArray.map((item) => {
									return <div>{item}</div>;
								})}
							</div>
						) : null}
    </div>
  );
}

export default App;

