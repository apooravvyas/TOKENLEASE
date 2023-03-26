import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./Lending";

function Assest() {
  const { id } = useParams();
  return <Box>Assest</Box>;
}

export default Assest;
