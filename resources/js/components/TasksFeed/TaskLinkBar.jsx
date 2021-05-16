import { Box, Text, Flex, Stack, HStack } from "@chakra-ui/layout";
import React from "react";

import { MdDescription, MdChevronRight } from "react-icons/md";

export default function TaskLinkBar() {
    return (
        <Flex
            py={6}
            boxShadow="md"
            px={3}
            _hover={{
                bg: "#f0f0f0",
                cursor: "pointer",
                transition: "all .3s ease",
                color: "black",
            }}
        >
            <Stack spacing={6}>
                <Flex>
                    <Box as="span" pr={3} pt={1} fontSize="20px" color="green">
                        <MdChevronRight />
                    </Box>
                    <Text fontWeight="bold" as="h4" className="qfont">
                        i want to move furniture
                    </Text>
                </Flex>
                <Flex alignItems="flex-start">
                    <Box as="span" pr={3} pt={1} fontSize="18px" color="green">
                        <MdDescription />
                    </Box>

                    <Text as="p" className="afont" fontWeight="light">
                        i want to move furniture from here to hjdbjcx
                        hchxhvsgsgusj ssggs syy s s sysygygx syys ts stgsg shhid
                        dydiiii ydyyd
                    </Text>
                </Flex>

                <HStack className="qfont">
                    <Text as="h4" color="#0ca25f" textTransform="uppercase">
                        Help Moving
                    </Text>
                </HStack>
            </Stack>
            <Box>
                <Text fontWeight="bold"></Text>
            </Box>
        </Flex>
    );
}
