import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
} from "react-icons/io5";

const Feature = ({ text, icon, iconBg }) => {
    return (
        <Stack direction={"row"} align={"center"}>
            <Flex
                w={8}
                h={8}
                align={"center"}
                justify={"center"}
                rounded={"full"}
                bg={iconBg}
            >
                {icon}
            </Flex>
            <Text className="qfont" fontWeight={600}>
                {text}
            </Text>
        </Stack>
    );
};

export default function SplitWithImage() {
    return (
        <Container maxW={"5xl"} py={12} mb={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={"uppercase"}
                        color={"blue.400"}
                        fontWeight={600}
                        fontSize={"sm"}
                        bg={useColorModeValue("blue.50", "blue.900")}
                        p={2}
                        alignSelf={"flex-start"}
                        rounded={"md"}
                        className="afont"
                    >
                        We Rock!
                    </Text>
                    <Heading className="qfont">We are the biggest gig.</Heading>
                    <Text className="afont" color={"gray.500"} fontSize={"lg"}>
                        Sidegig.ng is a platform created for the main purpose of
                        helping you out. There is no limit to how much you can
                        make from this platform.{" "}
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue(
                                    "gray.100",
                                    "gray.700"
                                )}
                            />
                        }
                    >
                        <Feature
                            icon={
                                <Icon
                                    as={IoAnalyticsSharp}
                                    color={"yellow.500"}
                                    w={5}
                                    h={5}
                                />
                            }
                            iconBg={useColorModeValue(
                                "yellow.100",
                                "yellow.900"
                            )}
                            text={"Grow your income"}
                        />
                        <Feature
                            icon={
                                <Icon
                                    as={IoLogoBitcoin}
                                    color={"green.500"}
                                    w={5}
                                    h={5}
                                />
                            }
                            iconBg={useColorModeValue("green.100", "green.900")}
                            text={"Fulfil Your Passion"}
                        />
                        <Feature
                            icon={
                                <Icon
                                    as={IoSearchSharp}
                                    color={"purple.500"}
                                    w={5}
                                    h={5}
                                />
                            }
                            iconBg={useColorModeValue(
                                "purple.100",
                                "purple.900"
                            )}
                            text={"Find Favorite Tasks"}
                        />
                    </Stack>
                </Stack>
                <Flex>
                    <Image
                        rounded={"md"}
                        alt={"feature image"}
                        src="/images/feature.jpg"
                        objectFit="cover"
                    />
                </Flex>
            </SimpleGrid>
        </Container>
    );
}
