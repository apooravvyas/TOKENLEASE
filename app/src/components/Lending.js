import React, { useState } from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { useLocation } from "react-router-dom";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button } from "@chakra-ui/react";
import { mainnet, optimism } from "wagmi/chains";
function Lending() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div>
      <Nav />
      <Button onClick={() => connect()}>abc</Button>
    </div>
  );
}

export default Lending;
