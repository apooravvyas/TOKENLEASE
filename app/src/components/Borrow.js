import {
  Box,
  cookieStorageManager,
  Heading,
  SimpleGrid,
  Spinner,
  Image,
  Text,
} from "@chakra-ui/react";
import { useAccount, useConnect, useEnsName, useProvider } from "wagmi";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { alchemy } from "./Lending";
import { Link } from "react-router-dom";
import { ethers, providers } from "ethers";

function Borrow() {
  const wagmiProvider = useProvider();

  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState();
  const [url, setUrl] = useState();
  const [showNFT, setShowNFT] = useState(false);

  useEffect(() => {
    const getNfts = async () => {
      const _nfts = await alchemy.nft.getNftsForOwner(
        "0xf1BD144885df4231A9B25276C0a1231c3d2cBFF4"
      );
      // console.log(_nfts);
      setNfts(_nfts);
    };
    setTimeout(changeShowNft, 25000);

    getNfts();
  }, [address]);

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

  const changeShowNft = () => {
    setShowNFT(true);
  };

  return (
    <Box>
      <Nav />
      <Heading margin={"1px auto"} display={"flex"} justifyContent={"center"}>
        Your Assests
      </Heading>
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
        <SimpleGrid columns={3} spacing={50} marginX={28} marginY={12}>
          {url.length == 0 ? (
            <Box
              fontSize={"2sm"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={window.innerHeight - 224}
              width={window.innerWidth - 210}
              boxSizing="border-box"
            >
              <Text fontSize={"2sm"}>You don't own any NFTs on Polygon</Text>
            </Box>
          ) : (
            ""
          )}
          {url?.map((x, i) => {
            return (
              <Link to={`/asset/${i}`} target="_blank">
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDir={"column"}
                  key={i}
                  border={"2px solid black"}
                  height={"330px"}
                  // borderRadius={4}
                  // _active={{ transform: "scale(0.9)", transition: "all 0.1s" }}
                  _hover={{
                    border: "4px solid transparent",
                    borderImage:
                      "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(0,0,0,1) 100%) 1",
                    animation: "rotate 3s linear infinite",
                  }}
                >
                  <Image
                    src={x.media.length == 1 ? x?.media[0]?.gateway : "null"}
                    alt="No Media"
                    maxH={"300px"}
                  />
                  <Box display={"flex"} justifyContent={"center"}>
                    {x?.rawMetadata.name}
                  </Box>
                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Borrow;
