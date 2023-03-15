import React from "react";
import { Link } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";

function Nav() {
  return (
    <Box
      bg="teal.600"
      display="flex"
      justifyContent={"space-between"}
      height={14}
      alignItems="center"
    >
      <Image src=""></Image>
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
          <div>Lend</div>
        </Link>
        <Link to={"/abput"}>
          <div>About</div>
        </Link>
      </Box>
    </Box>
  );
}

export default Nav;
