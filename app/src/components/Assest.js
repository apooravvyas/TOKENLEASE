import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./Lending";
import deploy from "./deploy";
import Nav from "./Nav";

function Assest() {
  const { id } = useParams();
  const [nfts, setNfts] = useState();
  const [url, setUrl] = useState();
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();
  const [showNFT, setShowNFT] = useState(false);

  useEffect(() => {
    const getNfts = async () => {
      const _nfts = await alchemy.nft.getNftsForOwner(
        "0xf1BD144885df4231A9B25276C0a1231c3d2cBFF4"
      );
      // console.log(_nfts);
      setNfts(_nfts);
      console.log(nfts);
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

  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const changeShowNft = () => {
    setShowNFT(true);
  };
  const approve = () => {};
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
          {console.log(window.innerHeight)}
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
            width={"25%"}
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

export default Assest;
