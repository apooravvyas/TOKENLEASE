import React, { useState } from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Box } from "@chakra-ui/react";

function Lending() {
  return (
    <div>
      <Nav />
      <Box>{window.ethereum ? "sss" : ""}</Box>
    </div>
  );
}

export default Lending;
