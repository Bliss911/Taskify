import { Box, SimpleGrid, Text, Stack, Flex, Heading } from "@chakra-ui/react";
import { vendor, user } from "./data";

const Feature = ({ title, text, icon }) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                alignItems="center"
                justifyContent="center"
                rounded={"full"}
                bg={"gray.100"}
                mb={1}
            >
                <Box as={"span"} fontSize="30px" color="primary.500">
                    {icon}
                </Box>
            </Flex>
            <Text className="qfont" fontWeight={600}>
                {title}
            </Text>
            <Text className="afont" color={"gray.600"}>
                {text}
            </Text>
        </Stack>
    );
};

export default function SimpleThreeColumns() {
    return (
        <Box p={4}>
            <Box py={10}>
                <Heading
                    textAlign="center"
                    color="#1c4d1d"
                    py={5}
                    fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}
                >
                    <Text className="qfont" as={"span"} position={"relative"}>
                        For Clients:
                    </Text>
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {user.map((s, i) => {
                        return (
                            <Feature
                                key={i}
                                icon={s.icon}
                                title={s.title}
                                text={s.caption}
                            />
                        );
                    })}
                </SimpleGrid>
            </Box>

            <Box py={10}>
                <Heading
                    fontWeight="semibold"
                    textAlign="center"
                    color="#1c4d1d"
                    py={5}
                    fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}
                >
                    <Text className="qfont" as={"span"} position={"relative"}>
                        For Vendors
                    </Text>
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {vendor.map((s, i) => {
                        return (
                            <Feature
                                key={i}
                                icon={s.icon}
                                title={s.title}
                                text={s.caption}
                            />
                        );
                    })}
                </SimpleGrid>
            </Box>
        </Box>
    );
}
