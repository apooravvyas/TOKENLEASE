import {
  Box,
  cookieStorageManager,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { alchemy } from "./Lending";
import { Link } from "react-router-dom";

function Borrow() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    const getNfts = async () => {
      const _nfts = await alchemy.nft.getNftsForOwner(
        "0xf1BD144885df4231A9B25276C0a1231c3d2cBFF4"
      );
      // console.log(_nfts);
      setNfts(_nfts);
      console.log(nfts);
    };
    getNfts();
  }, [address]);

  useEffect(() => {
    const getUrl = async () => {
      const _url = [];
      if (nfts) {
        for (let nft of nfts?.ownedNfts) {
          const nftMetaData = await alchemy.nft.getNftMetadata(
            nft.contract.address,
            nft.tokenId
          );
          _url.push(nftMetaData);
        }
      }

      setUrl(_url);
    };
    getUrl();
  }, [nfts]);

  return (
    <Box>
      <Nav />
      <Heading margin={"1px auto"}>Your Assests:</Heading>
      {!url ? (
        <Stack>
          {console.log("timeee")}
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <SimpleGrid columns={3} spacing={50} margin={12}>
          {console.log(url)}

          {url?.map((x, i) => {
            return (
              <Box
                key={i}
                border={"2px solid black"}
                // borderRadius={4}
                // _active={{ transform: "scale(0.9)", transition: "all 0.1s" }}
                _hover={{
                  border: "4px solid transparent",
                  borderImage:
                    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(14,11,64,1) 50%, rgba(0,0,0,1) 100%) 1",
                  animation: "rotate 3s linear infinite",
                }}
              >
                <Link to={`/asset/${i}`} target="_blank">
                  <img
                    src={x.media.length == 1 ? x?.media[0]?.gateway : "null"}
                    alt="No Media"
                  />
                  <Box>{x?.rawMetadata.name}</Box>
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Borrow;
