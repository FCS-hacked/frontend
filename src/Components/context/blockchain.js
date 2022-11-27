import {ethers} from "ethers";
import React from "react";

// import ParentContract from "../../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
// import ChildContract from "../../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";


const contractAddress = "0x6b7b35Ef7A7F79db71637245F96A6064c9FA7C51";
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
				"name": "hash",
				"type": "uint256"
			}
		],
		"name": "write_directory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
			}
		],
		"name": "directory",
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
				"internalType": "uint256",
				"name": "hash",
				"type": "uint256"
			}
		],
		"name": "read_directory",
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

async function useGetNecessities(getProvider) {
  const provider = await getProvider();
  const signer = provider?.getSigner();
  const nftContract = new ethers.Contract(contractAddress, abi, signer);
  return [provider, signer, nftContract];
}


async function SignFile(getProvider, sha) {
  const [provider, signer, nftContract] =
  await useGetNecessities(getProvider);
  console.log(sha, "sha256");
  let nftTxn = await nftContract.sign(sha);
  await nftTxn.wait();
  return nftTxn;
}

async function WriteDirectory(getProvider, payload) {
  const [provider, signer, nftContract] =
  await useGetNecessities(getProvider);
  const txn = await nftContract.write_directory(payload);
  window.alert("Transaction pending. Please wait...");
  await txn.wait();
  return txn;
}

async function ReadDirectory(getProvider, payload) {
  const [provider, signer, nftContract] =
  await useGetNecessities(getProvider);
  return await nftContract.read_directory(payload);
}

async function GetFileSigners(getProvider, sha){
  const [provider, signer, nftContract] =
  await useGetNecessities(getProvider);
  console.log(nftContract, sha, "nftContract");

  let nftTxn = await nftContract.get_file_signers(sha);
  console.log(nftTxn);
  await nftTxn;
  return nftTxn;
}


export {
  SignFile,
  GetFileSigners,
  WriteDirectory,
  ReadDirectory,
};
