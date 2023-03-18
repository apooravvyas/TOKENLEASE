import React from "react";
import Nav from "./Nav";
import { useAccount, useConnect, useEnsName } from "wagmi";

function About() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const shortAddress = `${address?.slice(0, 5)}.....${address?.slice(-5)}`;
  return (
    <div>
      <Nav
        isConnected={isConnected}
        ensName={ensName}
        shortAddress={shortAddress}
      />
    </div>
  );
}

export default About;
