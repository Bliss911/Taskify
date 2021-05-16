import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

function StatsCard({ title, stat, icon }) {
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
        >
            <Flex justifyContent={"space-between"}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel
                        className="qfont"
                        fontWeight={"medium"}
                        isTruncated
                    >
                        {title}
                    </StatLabel>
                    <StatNumber
                        className="afont"
                        fontSize={"2xl"}
                        fontWeight={"medium"}
                    >
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={"auto"}
                    color={useColorModeValue("gray.800", "gray.200")}
                    alignContent={"center"}
                >
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

export default function BasicStatistics() {
    return (
        <Box
            py={20}
            maxW="7xl"
            my={10}
            mx={"auto"}
            pt={5}
            px={{ base: 2, sm: 12, md: 17 }}
        >
            <chakra.h1
                textAlign={"center"}
                fontSize={"4xl"}
                py={10}
                fontWeight={"bold"}
                className="qfont"
            >
                Taskify has been here for a while now and is expanding! Your
                wallet could be too.
            </chakra.h1>
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={{ base: 5, lg: 8 }}
            >
                <StatsCard
                    title={"Users"}
                    stat={"1,000"}
                    icon={<BsPerson size={"3em"} />}
                />
                <StatsCard
                    title={"Tasks"}
                    stat={"5,000"}
                    icon={<FiServer size={"3em"} />}
                />
                <StatsCard
                    title={"Cities"}
                    stat={"2"}
                    icon={<GoLocation size={"3em"} />}
                />
            </SimpleGrid>
        </Box>
    );
}
