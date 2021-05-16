import { Link } from "react-router-dom";
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";

export default function SplitScreen() {
    return (
        <Stack minH={"90vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Stack spacing={6} w={"full"} maxW={"lg"}>
                    <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                        <Text
                            className="qfont"
                            as={"span"}
                            position={"relative"}
                            _after={{
                                content: "''",
                                width: "full",
                                height: useBreakpointValue({
                                    base: "20%",
                                    md: "30%",
                                }),
                                position: "absolute",
                                bottom: 1,
                                left: 0,
                                bg: "primary.400",
                                zIndex: -1,
                            }}
                        >
                            Freelance,
                        </Text>
                        <br />{" "}
                        <Text className="qfont" color={"blue.400"} as={"span"}>
                            Earn Income!
                        </Text>{" "}
                    </Heading>
                    <Text
                        fontSize={{ base: "md", lg: "lg" }}
                        color={"gray.500"}
                    >
                        Taskify is an exclusive resource for contract work. It's
                        perfect for freelancers, agencies, and moonlighters, and
                        everyone who wishes to earn extra income.
                    </Text>
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={4}
                    >
                        <Link to="/join">
                            <Button
                                rounded={"full"}
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                className="afont"
                            >
                                Join Taskify
                            </Button>
                        </Link>
                        <Link to="/enroll">
                            <Button className="afont" rounded={"full"}>
                                Enroll as Vendor
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={"Login Image"}
                    objectFit={"cover"}
                    src="/images/hero.jpg"
                />
            </Flex>
        </Stack>
    );
}
