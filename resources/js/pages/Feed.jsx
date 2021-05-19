import { Box, Text, Flex, Divider } from "@chakra-ui/layout";
import React, { useState } from "react";
import {
    useBreakpointValue,
    SlideFade,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";
import TaskLinkBar from "../components/TasksFeed/TaskLinkBar";
import SkillsSelect from "../components/TasksFeed/SkillsSelect";
import { MdMenu } from "react-icons/md";

export default function Feed() {
    const [currentTab, setCurrentTab] = useState("All");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const searchCategories = (v) => {
        setCurrentTab(v.name);

        //search using id
    };
    return (
        <>
            <Flex
                id="feed-container"
                minHeight={"80vh"}
                height="fit-content"
                position="relative"
                pt={4}
                mb={4}
                flexDir={useBreakpointValue({ base: "column", md: "row" })}
                justifyContent="space-between"
                overflowY="scroll"
            >
                <Box
                    width={useBreakpointValue({
                        base: "60%",
                        md: "32%",
                    })}
                    position={useBreakpointValue({
                        base: "absolute",
                        md: "initial",
                    })}
                    transform={useBreakpointValue({
                        base: show ? "translateX(0)" : "translateX(-102%)",
                        md: "",
                    })}
                    transition="all 0.4s ease"
                    top="0"
                    height="100%"
                    bg={useBreakpointValue({
                        base: useColorModeValue("white", "#1a202c"),
                        md: "initial",
                    })}
                    pr={useBreakpointValue({
                        base: "15px",
                        md: "",
                    })}
                >
                    <Box p={3}>
                        <Text
                            id="top"
                            color="#0ca25f"
                            as="h1"
                            fontSize="22px"
                            fontWeight="bold"
                            className="qfont"
                        >
                            Select Category
                        </Text>
                    </Box>

                    <Divider width={"100%"} margin="auto" height="5px" />
                    <SkillsSelect
                        searchCategories={searchCategories}
                        setShow={setShow}
                    />
                </Box>

                <Box
                    width={useBreakpointValue({ base: "100%", md: "65%" })}
                    height="100%"
                    top="0"
                >
                    <Flex
                        p={3}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            id="top"
                            color="#0ca25f"
                            as="h1"
                            fontSize="22px"
                            fontWeight="bold"
                            className="qfont"
                        >
                            {currentTab + " "} Tasks
                        </Text>
                        <Box
                            onClick={() => {
                                setShow((prev) => !prev);
                            }}
                            as="span"
                            display={useBreakpointValue({
                                base: "block",
                                md: "none",
                            })}
                            color="#0ca25f"
                        >
                            <IconButton>
                                <MdMenu />
                            </IconButton>
                        </Box>
                    </Flex>
                    <Divider width={"100%"} margin="auto" height="5px" />
                    <Box>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                        <SlideFade dir="left" in>
                            <TaskLinkBar />
                        </SlideFade>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}
