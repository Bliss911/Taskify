import { Box, Text, Flex, Stack, HStack, Badge } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

import {
  MdDescription,
  MdChevronRight,
  MdLocationOn,
  MdCollections,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useGenCtx } from "../../contexts/GeneralProvider";
import { useAuth } from "../../contexts/AuthProvider";

export default function TaskLinkBar({ s }) {
  const { user } = useAuth();

  const [bidders, setBidders] = useState([]);
  const serializeBids = () => {
    if (user && user.role == "VENDOR") {
      const bidvendors = [];
      s &&
        s.bids.forEach((bid) => {
          bidvendors.push(bid.vendor.id);
        });
      setBidders(bidvendors);
    }
  };

  const { setTask } = useGenCtx();

  useEffect(() => {
    serializeBids();
  }, []);
  return (
    <Link to="/viewtask">
      <Stack
        position="relative"
        py={6}
        boxShadow="md"
        px={3}
        bg="gray.100"
        rounded="md"
        _hover={{
          bg: "#ffffff",
          cursor: "pointer",
          transition: "all .3s ease",
          color: "black",
          boxShadow: "lg",
        }}
        my={3}
        onClick={() => {
          setTask({ ...s, bidders });
        }}
      >
        {s.status !== 'DONE' && bidders.includes(user.id) && (
          <Badge
            bg="green.500"
            color="white"
            position="absolute"
            top="0"
            right="0"
          >
            You bid for this.
          </Badge>
        )}
        {s.status == 'DONE' && (
          <Badge
            bg="green.500"
            color="white"
            position="absolute"
            top="0"
            right="0"
          >
            COMPLETED
          </Badge>
        )}
        {s.status == 'CANCELLED' && (
          <Badge
            bg="red.800"
            color="white"
            position="absolute"
            top="0"
            right="0"
          >
            CANCELLED
          </Badge>
        )}
        <Stack spacing={6}>
          <Flex justifyContent="space-between">
            <Flex>
              <Box as="span" pr={3} pt={1} fontSize="20px" color="green">
                <MdChevronRight />
              </Box>
              <Text fontWeight="bold" as="h4" className="qfont">
                {s.title}
              </Text>
            </Flex>
            <Box width="20%" px={2}>
              <Text fontWeight="bold" color="green.500" className="qfont">
                Offer: ${s.offer}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="flex-start">
            <Box as="span" pr={3} pt={1} fontSize="18px" color="green">
              <MdDescription />
            </Box>

            <Text as="p" fontSize="15px" className="afont" fontWeight="light">
              {s.description}
            </Text>
          </Flex>

          <HStack className="qfont" pl={"30px"}>
            {s.skill.map((k, i) => {
              return (
                <Text key={i} as="h4" color="#0ca25f" textTransform="uppercase">
                  {k.name}
                </Text>
              );
            })}
            ;
            <Flex alignItems="flex-start">
              <Box as="span" pt={1} fontSize="18px" color="green">
                <MdLocationOn />
              </Box>

              <Text
                as="h4"
                color="gray"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {s.location}
              </Text>
            </Flex>
            <Flex alignItems="flex-start">
              <Box as="span" pt={1} fontSize="18px" color="green">
                <MdCollections />
              </Box>

              <Text
                as="h4"
                color="gray"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {s.bids.length + "bids"}
              </Text>
            </Flex>
          </HStack>
        </Stack>
      </Stack>
    </Link>
  );
}
