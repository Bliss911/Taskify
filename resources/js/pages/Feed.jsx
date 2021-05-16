import { Box, Text, Flex, Divider } from "@chakra-ui/layout";
import React from "react";
import { useBreakpointValue, SlideFade } from "@chakra-ui/react";
import TaskLinkBar from "../components/TasksFeed/TaskLinkBar";
import SkillsSelect from "../components/TasksFeed/SkillsSelect";

export default function Feed() {
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
                    width={useBreakpointValue({ base: "100%", md: "32%" })}
                    display={useBreakpointValue({
                        base: "none",
                        md: "initial",
                    })}
                    height="100%"
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
                    <SkillsSelect />
                </Box>
                <Box
                    width={useBreakpointValue({ base: "100%", md: "65%" })}
                    height="100%"
                    top="0"
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
                            Available Tasks
                        </Text>
                    </Box>
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
