import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
  apiKey: "wGSDRVbkICs8ErAzz1YpFOoh0p-Gg2Ov", // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

export const alchemy = new Alchemy(settings);

function Lending() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    const getNfts = async () => {
      const _nfts = await alchemy.nft.getNftsForOwner(
        "0xf1BD144885df4231A9B25276C0a1231c3d2cBFF4"
      );
      // console.log(_nfts);
      setNfts(_nfts);
    };
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
      const pseudo_Url = _url.slice(0, 1);
      console.log(pseudo_Url);
      setUrl(pseudo_Url);
    };
    getUrl();
  }, [nfts]);
  return (
    <Box>
      <Nav />

      <Box>NFTs available:</Box>
      <SimpleGrid columns={4} spacing={50} margin={12}>
        {url?.map((x, i) => {
          return (
            <Link to={`/asset/${i}`} target="_blank">
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDir={"column"}
                key={i}
                border={"2px solid black"}
                height={"350px"}
                // borderRadius={4}
                // _active={{ transform: "scale(0.9)", transition: "all 0.1s" }}
                _hover={{
                  border: "4px solid transparent",
                  borderImage:
                    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(0,0,0,1) 100%) 1",
                  animation: "rotate 3s linear infinite",
                }}
              >
                <img
                  src={x.media.length == 1 ? x?.media[0]?.gateway : "null"}
                  alt="No Media"
                  maxH={"300px"}
                />
                <Box>{x?.rawMetadata.name}</Box>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Lending;
