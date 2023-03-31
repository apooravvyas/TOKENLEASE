import {
  Box,
  Button,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName, useNetwork } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { Link } from "react-router-dom";

function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // const shortAddress = `${address?.slice(0, 5)}.....${address?.slice(-5)}`;
  return (
    <>
      <Nav />
      <Box
        bgGradient="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(0,0,0,1) 100%)"
        height={window.innerHeight - 56}
        width="100%"
        color={"white"}
        position={"relative"}
      >
        {!window.ethereum ? (
          <Alert status="error" color={"black"}>
            <AlertIcon />
            <AlertTitle>No metamask connection</AlertTitle>
            <AlertDescription>
              Your may not be able to interact with the app.
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <Box position={"absolute"} top={"25%"} left={40}>
          <Box color={"white"} fontWeight="extrabold" fontSize={"xl"}>
            <img
              src="https://see.fontimg.com/api/renderfont4/dKK/eyJyIjoiZnMiLCJoIjo0OCwidyI6MTI1MCwiZnMiOjM4LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/WW91ciBHYXRld2F5IHRv/nervous.png"
              alt=""
            />
          </Box>
          <Box
            className="lending"
            color={"white"}
            fontWeight="extrabold"
            fontSize={"5xl"}
            fontFamily={"'Poppins', sans-serif"}
          >
            {" "}
            NFT Lending
          </Box>
          <Box marginTop={4} fontSize={"md"} fontWeight={"bold"}>
            NFT Loans | Financing | Refinancing
          </Box>
          <Link to={"/borrow"}>
            <Button
              _hover={{
                boxShadow: "rgba(var(--primary-color), 0.5) 0px 0px 20px 0px",
                background: "RGBA(255, 255, 255, 0.80)",
              }}
              bg={"white"}
              borderRadius="0"
              padding={"25px 32px"}
              margin={"5rem 1rem"}
              cursor={"pointer"}
              color={"#221354"}
              onClick={() => {
                if (!isConnected) {
                  connect();
                }
              }}
            >
              Get a loan
            </Button>
          </Link>
          <Link to={"/lending"}>
            <Button
              _hover={{
                boxShadow: "rgba(var(--primary-color), 0.5) 0px 0px 20px 0px",
                background: "#221354",
              }}
              bg={"none"}
              borderRadius="0"
              padding={"25px 32px"}
              margin={"5rem 1rem"}
              cursor={"pointer"}
              color={"white"}
              onClick={() => {
                if (!isConnected) {
                  connect();
                }
              }}
            >
              Want to lend
            </Button>
          </Link>
        </Box>
        <Box
          position={"absolute"}
          top={"25%"}
          right={40}
          width={"80"}
          height={"60"}
        ></Box>
      </Box>
    </>
  );
}

export default Home;
