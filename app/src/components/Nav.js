import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Avatar } from "@chakra-ui/react";
import logo from "../imgs/TokenLease.png";
import Jazzicon from "react-jazzicon";

function Nav({ isConnected, ensName, shortAddress }) {
  //amit randwa
  return (
    <Box
      bg="brand.100"
      display="flex"
      justifyContent={"space-between"}
      height={14}
      alignItems="center"
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
        <Link to={"/lending"}>
          <div>Lend</div>
        </Link>
        <Link to={"/lending"}>
          <div>Borrow</div>
        </Link>
        <Link to={"/about"}>
          <div>About</div>
        </Link>
        <Link to={"/profile"}>
          <Box display={"flex"} flexDir={"row"}>
            <Jazzicon diameter={25} seed={Math.round(2)} />
            <Box paddingLeft={"5px"}>
              {isConnected ? `${ensName ?? shortAddress}` : ""}
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
//once upon a time there was a boy named harish , he has a magical ability to hide at night
export default Nav;
