import React, { useEffect, useState } from "react";
import {
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Text,
    Flex,
    Stack,
    Heading,
    Tag,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    useDisclosure,
    FormControl,
    FormLabel,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Textarea,
} from "@chakra-ui/react";
import { useGenCtx } from "../contexts/GeneralProvider";
import { FaPlaneArrival } from "react-icons/fa";
import { Alert, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { MdLocationOn, MdCollections } from "react-icons/md";
import cogoToast from "cogo-toast";
import { useAuth } from "../contexts/AuthProvider";

function SingleTask() {
    const { task, setTask } = useGenCtx();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [bid, setBid] = useState(0);
    const [bidSubmitted, setBidSubmitted] = useState(false);
    const [comment, setComment] = useState("");
    const [bidders, setBidders] = useState(
        task && task.bidders ? task.bidders : []
    );
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const deleteBid = (data) => {
        setLoading(true);
        axios
            .post("/api/bids/delete", data)
            .then((response) => {
                let { data } = response.data;
                console.log(data);
                setBidSubmitted(false);
                setTask(data[0]);
                const bidvendors = [];

                data[0].bids.forEach((bid) => {
                    bidvendors.push(bid.vendor.id);
                });
                setBidders(bidvendors);
                cogoToast.success("Bid deleted");
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                onClose();

                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
                    if (err.errors) {
                        for (const [key, value] of Object.entries(err.errors)) {
                            const { hide } = cogoToast.error(value, {
                                onClick: () => {
                                    hide();
                                },
                            });
                        }
                    } else {
                        cogoToast.error(err.message || "An error occurred");
                    }
                } else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
                    cogoToast.error("An error occurred, please try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
                    cogoToast.error(
                        err || "An error occurred, please try again"
                    );
                }
            });
    };
    const submitBid = () => {
        if (comment == "" || bid == 0) {
            cogoToast.error("Please fill all fields");
        } else {
            const data = {
                bid,
                comment,
                task: task.id,
            };

            setLoading(true);
            axios
                .post("/api/bids/create", data)
                .then((response) => {
                    let { data } = response.data;
                    console.log(data);
                    setTask(data[0]);
                    cogoToast.success("Bid submitted");
                    setBidSubmitted(true);
                    onClose();
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    onClose();

                    if (error.response) {
                        // The request was made and the server responded with a status code that falls out of the range of 2xx
                        let err = error.response.data;
                        if (err.errors) {
                            for (const [key, value] of Object.entries(
                                err.errors
                            )) {
                                const { hide } = cogoToast.error(value, {
                                    onClick: () => {
                                        hide();
                                    },
                                });
                            }
                        } else {
                            cogoToast.error(err.message || "An error occurred");
                        }
                    } else if (error.request) {
                        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                        let err = error.request;
                        cogoToast.error("An error occurred, please try again");
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        let err = error.message;
                        cogoToast.error(
                            err || "An error occurred, please try again"
                        );
                    }
                });
        }
    };
    useEffect(() => {
        if (task && bidders.includes(user.id)) {
            setBidSubmitted(true);
        }
    }, [task]);

    return (
        <>
            {!task && (
                <Alert
                    status="info"
                    variant="subtle"
                    flexDirection="column"
                    justifyContent="center"
                    textAlign="center"
                    minHeight="220px"
                >
                    <AlertIcon size="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg" className="qfont">
                        Looks like you just landed <FaPlaneArrival />
                    </AlertTitle>
                    <AlertDescription maxWidth="sm" className="qfont">
                        Go back to{" "}
                        <Link to="/tasks">
                            <Button>Feed page</Button>
                        </Link>
                        and select a task to view
                    </AlertDescription>
                </Alert>
            )}
            <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader className="qfont" borderBottomWidth="1px">
                        Place Bid
                    </DrawerHeader>
                    <DrawerBody>
                        <p className="afont">
                            To bid, name your price and leave a convincing
                            comment for the client
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitBid();
                            }}
                        >
                            <FormControl id="bid" className="qfont" py={4}>
                                <FormLabel>Bid ($)</FormLabel>
                                <Input
                                    required
                                    value={bid}
                                    onChange={(e) => {
                                        setBid(e.target.value);
                                    }}
                                    type="number"
                                />
                            </FormControl>
                            <Textarea
                                required
                                placeholder="Write a convincing comment"
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />

                            <Flex>
                                <Button
                                    bg="green.500"
                                    color="white"
                                    ml="auto"
                                    _hover={{
                                        bg: "green",
                                    }}
                                    disabled={loading}
                                    type="submit"
                                >
                                    {" "}
                                    Submit Bid
                                </Button>
                            </Flex>
                        </form>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {task && (
                <>
                    <Box py={4} minH={"80Vh"}>
                        <Box>
                            <Stack
                                maxW="lg"
                                borderWidth="1px"
                                borderRadius="lg"
                                className="qfont"
                                p={4}
                            >
                                <Flex>
                                    <Text as="h4">Posted by : </Text>
                                    <Text as="b" textTransform="capitalize">
                                        {task &&
                                            task.user.firstname +
                                                " " +
                                                task.user.lastname}
                                    </Text>
                                </Flex>
                                <Text as="small" textTransform="italic">
                                    {task && (
                                        <ReactTimeAgo date={task.created_at} />
                                    )}
                                </Text>
                                <Flex alignItems="flex-start">
                                    <Box
                                        as="span"
                                        pt={1}
                                        fontSize="18px"
                                        color="green"
                                    >
                                        <MdLocationOn />
                                    </Box>

                                    <Text
                                        as="h4"
                                        color="gray"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                    >
                                        {task && task.location}
                                    </Text>
                                </Flex>
                                <Flex alignItems="flex-start">
                                    <Box
                                        as="span"
                                        pt={1}
                                        fontSize="18px"
                                        color="green"
                                    >
                                        <MdCollections />
                                    </Box>

                                    <Text
                                        as="h4"
                                        color="gray"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                    >
                                        {task && task.bids.length + "bids"}
                                    </Text>
                                </Flex>
                            </Stack>

                            <Box>
                                <Text
                                    color="green.500"
                                    as="h5"
                                    p={3}
                                    className="afont"
                                >
                                    Details
                                </Text>
                                <Box
                                    maxW="lg"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                >
                                    <Box my="5">
                                        <Text
                                            className="afont"
                                            m="3"
                                            mb="0"
                                            as="h4"
                                            size="md"
                                        >
                                            What client wants :
                                        </Text>
                                        <Text
                                            m="3"
                                            pl={2}
                                            className="qfont"
                                            fontSize="18px"
                                            mb="0"
                                            as="h4"
                                            size="md"
                                        >
                                            {task && task.title}
                                        </Text>
                                        {task &&
                                            task.skill.map((st, i) => {
                                                return (
                                                    <Tag
                                                        ml={4}
                                                        bg="green.500"
                                                        className="qfont"
                                                        key={i}
                                                        color="white"
                                                    >
                                                        {" "}
                                                        in {st.name}
                                                    </Tag>
                                                );
                                            })}
                                    </Box>
                                    <Box my="5">
                                        <Text
                                            className="afont"
                                            m="3"
                                            mb="0"
                                            as="h4"
                                            size="md"
                                        >
                                            Description :
                                        </Text>
                                        <Text
                                            m="3"
                                            pl={2}
                                            className="qfont"
                                            fontSize="18px"
                                            mb="0"
                                            as="h4"
                                            size="md"
                                        >
                                            {task && task.description}
                                        </Text>
                                    </Box>
                                    <Box my="5">
                                        <Text
                                            className="afont"
                                            m="3"
                                            mb="0"
                                            as="h4"
                                            size="md"
                                        >
                                            What client offered :
                                        </Text>
                                        <Text
                                            m="3"
                                            pl={2}
                                            className="qfont"
                                            fontSize="18px"
                                            mb="0"
                                            as="h4"
                                            size="md"
                                        >
                                            {task && "$" + task.offer}
                                        </Text>
                                    </Box>
                                    {user.role == "VENDOR" && !bidSubmitted && (
                                        <Button
                                            ml={4}
                                            mb={4}
                                            bg="green.500"
                                            color="white"
                                            onClick={onOpen}
                                        >
                                            Bid for this task
                                        </Button>
                                    )}

                                    {user.role == "VENDOR" && bidSubmitted && (
                                        <Alert status="success">
                                            <AlertIcon />
                                            You have submitted a bid
                                        </Alert>
                                    )}
                                </Box>
                            </Box>

                            <Box>
                                <Text
                                    color="green.500"
                                    as="h5"
                                    p={3}
                                    className="afont"
                                >
                                    Bids
                                </Text>
                                <Stack
                                    maxW="lg"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    className="qfont"
                                    p={4}
                                >
                                    <Accordion allowToggle>
                                        {task &&
                                            task.bids.map((b, i) => {
                                                return (
                                                    <AccordionItem>
                                                        <h2>
                                                            <AccordionButton
                                                                _expanded={{
                                                                    bg: "green.500",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                <Box
                                                                    flex="1"
                                                                    textAlign="left"
                                                                >
                                                                    Bid from{" "}
                                                                    {" " +
                                                                        b.vendor
                                                                            .firstname}{" "}
                                                                    - ${b.bid}
                                                                </Box>
                                                                <AccordionIcon />
                                                            </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                            <Heading
                                                                as="h6"
                                                                fontSize="16px"
                                                                color="green.500"
                                                            >
                                                                Comment
                                                            </Heading>
                                                            <Text className="afont">
                                                                {b.comment}
                                                            </Text>
                                                            {bidSubmitted && (
                                                                <Flex py={3}>
                                                                    <Button
                                                                        onClick={() => {
                                                                            deleteBid(
                                                                                {
                                                                                    bid: b.id,
                                                                                    task: task.id,
                                                                                }
                                                                            );
                                                                        }}
                                                                        colorScheme="red"
                                                                    >
                                                                        Delete
                                                                        Your Bid
                                                                    </Button>
                                                                </Flex>
                                                            )}
                                                            {user.role ==
                                                                "CLIENT" && (
                                                                <Button
                                                                    ml={4}
                                                                    mb={4}
                                                                    colorScheme="green"
                                                                    variant="outline"
                                                                    bg="green.500"
                                                                    color="white"
                                                                >
                                                                    Negotiate
                                                                </Button>
                                                            )}
                                                        </AccordionPanel>
                                                    </AccordionItem>
                                                );
                                            })}
                                    </Accordion>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
}

export default SingleTask;
