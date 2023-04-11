import { ethers } from "ethers";
// import Escrow from "./artifacts/contracts/Escrow.sol/Escrow";
import merge from "../artifacts/contracts/merge.sol/NFTLoan.json";

export default async function deployF(
  signer,
  loanAmount,
  loanDuration,
  nftAddress,
  borrowerAddress,
  tokenId
) {
  const factory = new ethers.ContractFactory(merge.abi, merge.bytecode, signer);
  const deployedFactory = await factory.deploy(
    loanAmount,
    loanDuration,
    nftAddress,
    borrowerAddress,
    tokenId
  );
  return deployedFactory;
}
