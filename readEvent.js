const { ethers, Wallet } = require("ethers");
const transfer = require("./transfer.json");

const RPC = "https://goerli.infura.io/v3/4f24be74b94441fdb593ad181a978f0b"; // your rpc url here
const provider = new ethers.providers.JsonRpcProvider(RPC);
const contractAddress = "0x9f0fCF7257c7e1415DAAA73d7C6c8d7803d31f84";

const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transaction",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
    ],
    name: "_transfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "callOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

async function call() {
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const block = await provider.getBlockNumber();
  //If you want to see few specific transactions:
  
//   const transactions = await contract.queryFilter("Transaction",block-20, block);
  const transactions = await contract.queryFilter("Transaction");
  transactions.map((item) => {
    console.log(item.args.to, ": " , ethers.utils.formatEther(item.args.amount));// according to the event names mentioned in solidity code
  });
}

call();
