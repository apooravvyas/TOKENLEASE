import React from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { Box } from "@chakra-ui/react";

function About() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const shortAddress = `${address?.slice(0, 5)}.....${address?.slice(-5)}`;
  return (
    <>
      <Nav
        isConnected={isConnected}
        ensName={ensName}
        shortAddress={shortAddress}
      />
      <Box
        bgGradient="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(0,0,0,1) 100%)"
        height={window.innerHeight - 56}
        width="100%"
        color={"white"}
      ></Box>
    </>
  );
}

export default About;
