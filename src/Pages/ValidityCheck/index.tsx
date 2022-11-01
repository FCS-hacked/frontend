// @ts-nocheck

import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

const contractAddress = "0xC00F0eEc3b65f3050EAB65d3bc6017626aE8252a";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "file",
				"type": "uint256"
			}
		],
		"name": "sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "file",
				"type": "uint256"
			}
		],
		"name": "Signed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "file",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"name": "check_signature",
		"outputs": [
			{
				"internalType": "bool",
				"name": "result",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "file_signers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "file",
				"type": "uint256"
			}
		],
		"name": "get_file_signers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "signers",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ad",
				"type": "address"
			}
		],
		"name": "get_signed_files",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "files",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "signed_files",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const [neededArray, setNeededArray] = useState([]);


	const [ sha, setSha ] = useState('');
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

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
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.sign(sha);

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://sepolia.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const button2Handler = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.get_file_signers(sha);
        console.log(nftTxn," is here");
        setNeededArray(nftTxn);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

	console.log(neededArray," is her validie");
  
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
             <div>Hello </div>
            )}
            {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}

            {isConnected ? (
              <button onClick={()=>{button1handler()}} className='cta-button mint-nft-button'>
              Sign File
            </button>
            ) : null}

            {isConnected ? (
             <button onClick={button2Handler} className='cta-button mint-nft-button'>
            See signers
           </button>
            ) : null}   
          
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
}

export default App;



// // @ts-nocheck
// import { useEffect, useState } from 'react';
// import { ethers } from 'ethers';

// const contractAddress = "0xA660D29F026A6181d049E9B6c5D9a597E21BF284";
// const abi = [
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "signer",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "file",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Signed",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "file",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "signer",
// 				"type": "address"
// 			}
// 		],
// 		"name": "check_signature",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "result",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "file_signers",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "file",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "sign",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "signed_files",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];

// function App() {

//   const [currentAccount, setCurrentAccount] = useState(null);

//   console.log("currentAccount", currentAccount);

//   const checkWalletIsConnected = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log("Make sure you have Metamask installed!");
//       return;
//     } else {
//       console.log("Wallet exists! We're ready to go!")
//     }

//     const accounts = await ethereum.request({ method: 'eth_accounts' });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account: ", account);
//       setCurrentAccount(account);
//     } else {
//       console.log("No authorized account found");
//     }
//   }

//   const connectWalletHandler = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       alert("Please install Metamask!");
//     }

//     try {
//       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//       console.log("Found an account! Address: ", accounts[0]);
//       setCurrentAccount(accounts[0]);
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const mintNftHandler = async () => {
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const nftContract = new ethers.Contract(contractAddress, abi, signer);

//         console.log("Initialize payment");
//         let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

//         console.log("Mining... please wait");
//         await nftTxn.wait();

//         console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

//       } else {
//         console.log("Ethereum object does not exist");
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const connectWalletButton = () => {
//     return (
//       <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
//         Connect Wallet
//       </button>
//     )
//   }

//   const mintNftButton = () => {
//     return (
//       <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
//         Mint NFT
//       </button>
//     )
//   }

//   useEffect(() => {
//     checkWalletIsConnected();
//   }, [])

//   return (
//     <div className=''>
//       <h1>Scrappy Squirrels Tutorial</h1>
//       <div>
//         {currentAccount ? mintNftButton() : connectWalletButton()}
//       </div>
//     </div>
//   )
// }

// export default App;
