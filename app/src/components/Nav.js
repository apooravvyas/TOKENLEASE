import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Image, Avatar } from "@chakra-ui/react";
import logo from "../imgs/TokenLease.png";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function Nav() {
  const [activeItem, setActiveItem] = useState("/");
  const location = useLocation();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <Box
      bg="brand.100"
      display="flex"
      justifyContent={"space-between"}
      height={14}
      alignItems="center"
      paddingRight={20}
    >
      <Link to={"/"}>
        <Image
          src={logo}
          height={"100px"}
          width={"120px"}
          marginLeft={12}
        ></Image>
      </Link>
      <Box
        display="flex"
        justifyContent={"space-evenly"}
        width="500px"
        color={"white"}
      >
        <Link to={"/"}>
          <Box borderBottom={activeItem === "/" ? "2px solid white" : ""}>
            Home
          </Box>
        </Link>
        <Link to={"/lending"}>
          <Box
            borderBottom={activeItem === "/lending" ? "2px solid white" : ""}
            onClick={() => {
              if (!isConnected) {
                connect();
              }
            }}
          >
            Lend
          </Box>
        </Link>
        <Link to={"/borrow"}>
          <Box
            borderBottom={activeItem === "/borrow" ? "2px solid white" : ""}
            onClick={() => {
              if (!isConnected) {
                connect();
              }
            }}
          >
            Borrow
          </Box>
        </Link>
        <Link to={"/about"}>
          <Box borderBottom={activeItem === "/about" ? "2px solid white" : ""}>
            About
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
//once upon a time there was a boy named harish , he has a magical ability to hide at night
export default Nav;
