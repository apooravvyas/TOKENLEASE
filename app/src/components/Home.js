import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import Nav from "./Nav";

function Home() {
  const connect = () => {};
  return (
    <>
      <Nav />
      <Box
        // bgGradient="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(252,176,69,1) 100%)"
        bgGradient="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(0,0,0,1) 100%)"
        height={window.innerHeight - 56}
        width="100%"
        color={"white"}
        position={"relative"}
      >
        <Box position={"absolute"} top={"25%"} left={40}>
          <Box color={"white"} fontWeight="extrabold" fontSize={"5xl"}>
            Your Gateway to
          </Box>

          <Box
            className="lending"
            color={"white"}
            fontWeight="extrabold"
            fontSize={"5xl"}
          >
            {" "}
            NFT Lending
          </Box>
          <Box marginTop={4} fontSize={"md"} fontWeight={"bold"}>
            NFT Loans | Financing | Refinancing
          </Box>
          <Button
            _hover={{
              boxShadow: "rgba(var(--primary-color), 0.5) 0px 0px 20px 0px",
            }}
            bg={
              "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
            }
            borderRadius={"50px"}
            padding={"25px 32px"}
            margin={"5rem 1rem"}
            cursor={"pointer"}
            _active={{
              bg: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
              transform: "scale(0.9)",
            }}
          >
            Connect Wallet
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Home;
