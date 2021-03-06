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
  Badge,
  AccordionIcon,
  SimpleGrid,
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
import CompleteTaskDialog from "../components/Dashboard/CompleteTaskDialog";
import CancelTaskDialog from "../components/Dashboard/CancelTaskDialog";

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

  const rejectBid = (data) => {
    setLoading(true);
    axios
      .post("/api/bids/reject", data)
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
        cogoToast.success("Bid rejected");
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
          cogoToast.error(err || "An error occurred, please try again");
        }
      });
  };
  const acceptBid = (data) => {
    setLoading(true);
    axios
      .post("/api/bids/accept", data)
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
        cogoToast.success("Bid accepted");
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
          cogoToast.error(err || "An error occurred, please try again");
        }
      });
  };
  const deleteBid = (data) => {
    setLoading(true);
    setBidSubmitted(false);
    axios
      .post("/api/bids/delete", data)
      .then((response) => {
        let { data } = response.data;
        console.log(data);
        setBidSubmitted(false);
        const bidvendors = [];

        data[0].bids.forEach((bid) => {
          bidvendors.push(bid.vendor.id);
        });
        setBidders(bidvendors);
        setTask(data[0]);
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
          cogoToast.error(err || "An error occurred, please try again");
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
            cogoToast.error(err || "An error occurred, please try again");
          }
        });
    }
  };
  useEffect(() => {
    if (task && bidders.includes(user.id)) {
      setBidSubmitted(true);
    }
  }, [task]);

  const { setRecipient } = useGenCtx();

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
            <Link to="/dashboard">
              <Button>Dashboard</Button>
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
              To bid, name your price and leave a convincing comment for the
              client
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
          <SimpleGrid
            columns={[1, 1, 2, 2]}
            py={4}
            spacing="40px"
            minH={"80Vh"}
            templateColumns="40% 60%"
            pb="80px"
          >
            <Stack
              maxW="lg"
              borderWidth="1px"
              borderRadius="lg"
              className="qfont"
              p={4}
              h="fit-content"
            >
              <>
                <Flex justifyContent="space-between">
                  <Flex>
                    <Text as="h4">Posted by : </Text>
                    <Text as="b" textTransform="capitalize">
                      {task && task.user.firstname + " " + task.user.lastname}
                    </Text>
                  </Flex>
                  <Box>
                    {task.client == user.id &&
                      task.status == "PENDING" &&
                      task.bids.length !== 0 && (
                        <CompleteTaskDialog
                          task={task}
                          setTask={setTask}
                          setBidders={setBidders}
                        />
                      )}
                    {task.client == user.id && task.status == "PENDING" && (
                      <CancelTaskDialog
                        task={task}
                        setTask={setTask}
                        setBidders={setBidders}
                      />
                    )}
                    {task.status == "DONE" && (
                      <Button
                        mb={4}
                        size="sm"
                        colorScheme="green"
                        variant="outline"
                        _hover={{
                          bg: "green.500",
                        }}
                        bg="green.500"
                        disabled
                        color="white"
                      >
                        COMPLETED
                      </Button>
                    )}
                    {task.status == "CANCELLED" && (
                      <Button
                        mb={4}
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        _hover={{
                          bg: "red.700",
                        }}
                        bg="red.700"
                        disabled
                        color="white"
                      >
                        CANCELLED
                      </Button>
                    )}
                  </Box>
                </Flex>
                <Text as="small" textTransform="italic">
                  {task && <ReactTimeAgo date={task.created_at} />}
                </Text>
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
                    {task && task.location}
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
                    {task && task.bids.length + "bids"}
                  </Text>
                </Flex>
              </>
              <Box>
                {/* stopped here */}
                <Text color="green.500" as="h5" p={3} className="afont">
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
                                <Box flex="1" textAlign="left">
                                  Bid from {" " + b.vendor.firstname} - ${b.bid}
                                </Box>
                                <Box flex="1" textAlign="right">
                                  <Badge
                                    variant="outline"
                                    color={
                                      b.status === "ACCEPTED"
                                        ? "green"
                                        : b.status === "CANCELLED"
                                        ? "red"
                                        : "yellow"
                                    }
                                  >
                                    {b.status}
                                  </Badge>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {user.role == "CLIENT" &&
                                user.id === task.client &&
                                b.status == "ACCEPTED" && (
                                  <Box as="small" color="green.500">
                                    You accepted this bid
                                  </Box>
                                )}
                              {user.role == "CLIENT" &&
                                user.id === task.client &&
                                b.status == "CANCELLED" && (
                                  <Box as="small" color="red.700">
                                    You rejected this bid
                                  </Box>
                                )}
                              <Heading
                                as="h6"
                                fontSize="16px"
                                color="green.500"
                              >
                                Comment
                              </Heading>
                              <Text className="afont" mb="20px" mt="10px">
                                {b.comment}
                              </Text>

                              {task.status !== "DONE" &&
                                task.status !== "CANCELLED" && (
                                  <>
                                    {/* delete bid button */}
                                    {bidSubmitted && (
                                      <Flex py={3}>
                                        <Button
                                          size="sm"
                                          onClick={() => {
                                            deleteBid({
                                              bid: b.id,
                                              task: task.id,
                                            });
                                          }}
                                          colorScheme="red"
                                        >
                                          Delete Your Bid
                                        </Button>
                                      </Flex>
                                    )}
                                    {/* buttons for client */}
                                    {user.role == "CLIENT" &&
                                      user.id === task.client && (
                                        <>
                                          <Button
                                            mb={4}
                                            size="sm"
                                            colorScheme="green"
                                            variant="outline"
                                            bg="green.500"
                                            _hover={{
                                              bg: "green.500",
                                            }}
                                            onClick={() => {
                                              setRecipient(b.vendor);
                                            }}
                                            color="white"
                                          >
                                            <Link
                                              style={{
                                                display: "flex",
                                                width: "100%",
                                                height: "100%",
                                                alignItems: "center",
                                              }}
                                              to="/messages"
                                            >
                                              Negotiate
                                            </Link>
                                          </Button>
                                          {/* accept bidd button */}
                                          {b.status != "ACCEPTED" && (
                                            <Button
                                              ml={4}
                                              _hover={{
                                                bg: "green.500",
                                              }}
                                              mb={4}
                                              size="sm"
                                              colorScheme="green"
                                              variant="outline"
                                              bg="green.500"
                                              color="white"
                                              onClick={() => {
                                                acceptBid({
                                                  bid: b.id,
                                                  task: task.id,
                                                });
                                              }}
                                            >
                                              Accept Bid
                                            </Button>
                                          )}
                                          {bid.status != "CANCELLED" && (
                                            <Button
                                              ml={4}
                                              _hover={{
                                                bg: "red.700",
                                              }}
                                              mb={4}
                                              size="sm"
                                              colorScheme="green"
                                              variant="outline"
                                              bg="red.600"
                                              color="white"
                                              onClick={() => {
                                                rejectBid({
                                                  bid: b.id,
                                                  task: task.id,
                                                });
                                              }}
                                            >
                                              Reject Bid
                                            </Button>
                                          )}
                                        </>
                                      )}
                                  </>
                                )}
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                  </Accordion>
                </Stack>
              </Box>
            </Stack>
            {/* right hand side begins */}
            <Box>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Text color="green.500" as="h5" p={3} className="afont">
                  Details
                </Text>
                <Box my="5">
                  <Text className="afont" m="3" mb="0" as="h4" size="md">
                    What client wants :
                  </Text>
                  <Text
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
                  <Text className="afont" m="3" mb="0" as="h4" size="md">
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
                  <Text className="afont" m="3" mb="0" as="h4" size="md">
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
                {user.role == "VENDOR" &&
                  task.status !== "DONE" &&
                  task.status !== "CANCELLED" &&
                  !bidSubmitted && (
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
          </SimpleGrid>
        </>
      )}
    </>
  );
}

export default SingleTask;
