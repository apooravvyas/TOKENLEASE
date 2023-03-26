import React, { useState } from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Box, SimpleGrid } from "@chakra-ui/react";
const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
  apiKey: "wGSDRVbkICs8ErAzz1YpFOoh0p-Gg2Ov", // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

export const alchemy = new Alchemy(settings);

function Lending() {
  const { address, isConnected } = useAccount();
  console.log(address);
  // const getNfts = async () => {
  //   const nfts = await alchemy.nft.getNftsForOwner(address);
  //   console.log(nfts);
  // };
  return (
    <Box>
      <Nav />
      <Box>NFTs available:</Box>
      <SimpleGrid columns={4} spacing={50} margin={12}>
        <Box border={"1px solid black"} height={"100px"}>
          s
        </Box>
        <Box border={"1px solid black"} height={"100px"}>
          s
        </Box>
        <Box border={"1px solid black"} height={"100px"}>
          s
        </Box>
        <Box border={"1px solid black"} height={"100px"}>
          s
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Lending;
