import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./Lending";

import Nav from "./Nav";
import { ethers, providers } from "ethers";
// import { useSigner, useNetwork } from "wagmi";
// import { IERC721 } from "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import IERC721 from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import deployF from "./deployF";

function Asset() {
  // const {
  //   data: signer,
  //   isError,
  //   isLoading,
  // } = useSigner({
  //   chainId: 80001,
  //   onError(error) {
  //     console.log("Signer error: ", error);
  //   },
  // });

  const { id } = useParams();
  const [nfts, setNfts] = useState();
  const [url, setUrl] = useState();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [showNFT, setShowNFT] = useState(false);

  useEffect(() => {
    const getNfts = async () => {
      const _nfts = await alchemy.nft.getNftsForOwner(
        "0x650746857359fa5CA5745Ca1A1F4B77cAe611282"
      );
      // console.log(_nfts);
      setNfts(_nfts);
      // console.log(nfts);
    };
    setTimeout(changeShowNft, 25000);
    getNfts();
  }, []);

  useEffect(() => {
    const getUrl = async () => {
      const _url = [];
      if (nfts) {
        for (let nft of nfts?.ownedNfts) {
          const nftMetaData = await alchemy.nft.getNftMetadata(
            nft.contract.address,
            nft.tokenId
          );
          _url.push(nftMetaData);
        }
      }

      setUrl(_url);
    };
    getUrl();
  }, [nfts]);
  // console.log(url);
  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const changeShowNft = () => {
    setShowNFT(true);
  };
  const approve = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    //deploying the contract
    // console.log("address", await signer.getAddress());
    // console.log(signer);
    console.log("loan amount type", typeof parseInt(Number(amount)));
    console.log("loan amount type", typeof parseInt(Number(duration)));
    // console.log(duration);
    console.log(url[id].contract.address);
    const signerf = await signer.getAddress();
    console.log(signerf);
    // console.log(url[id].tokenId);
    // console.log(signer);

    const mergeContract = await deployF(
      signer,
      parseInt(Number(amount)),
      parseInt(Number(duration)),
      url[id].contract.address,
      signerf,
      parseInt(Number(url[id].tokenId))
    );
    console.log(mergeContract.address);

    //calling approve function on the nft contract of the borrower
    // const contract = new ethers.Contract(
    //   url[id].contract.address,
    //   IERC721.interface,
    //   signer
    // );
    // await contract.approve(mergeContract.address, url[id].tokenId);
  };
  return (
    <Box>
      <Nav />
      {!url || !showNFT ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          height={window.innerHeight - 224}
          justifyContent={"center"}
        >
          <Spinner size="lg" thickness="2px" />
          <Text fontSize={"2sm"}>Fetching your NFTs on Polygon Network</Text>
        </Box>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          flexDir={"column"}
          borderRadius={4}
          marginTop={8}
        >
          <Box
            width={"20%"}
            objectFit="contain"
            border={"2px solid black"}
            borderRadius={4}
          >
            <img
              src={
                url[id]?.media.length == 1 ? url[id]?.media[0]?.gateway : "null"
              }
              alt="No Media"
            />
          </Box>
          <Box>{url[id]?.rawMetadata.name}</Box>
          <Box
            marginTop={4}
            display="flex"
            flexDir={"column"}
            fontWeight="bold"
          >
            <Box marginBottom={4}>Specify the following properties</Box>
            <Input
              placeholder="Loan amount in ETH"
              width={"100%"}
              marginY={4}
              value={amount}
              onChange={handleChangeAmount}
            />
            <Input
              placeholder="Loan duration in Days"
              width={"100%"}
              value={duration}
              onChange={handleChangeDuration}
            />
            <Button marginTop={2} onClick={approve}>
              Approve NFT
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Asset;
