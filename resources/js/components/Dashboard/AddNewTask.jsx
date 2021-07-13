import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Text,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import cogoToast from "cogo-toast";
import axios from "axios";

export default function AddNewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSucc] = useState(false);
  const [job, setJob] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [L, setL] = useState(true);
  const [err, setERR] = useState(null);

  const { user, isAuth } = useAuth();

  const handleSubmit = () => {
    if (
      location == "" ||
      description == "" ||
      offer == "" ||
      title == "" ||
      job == null
    ) {
      cogoToast.error("Please fill all fields");
    } else {
      const data = {
        location,
        description,
        offer,
        title,
        job,
      };

      setLoading(true);
      axios
        .post("/api/tasks/create", data)
        .then((response) => {
          let { data } = response.data;
          console.log(data);
          cogoToast.success("Task Submitted");
          setSucc(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

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

  const fetchhJobs = async () => {
    try {
      const dt = await axios.get("/api/jobslist");
      const { data } = dt.data;
      setJobList(data);
      setL(false);
    } catch (error) {
      setERR(error.message);
      setL(false);
    }
  };
  useEffect(() => {
    fetchhJobs();
  }, []);

  // if (!isAuth) return <Redirect to="/login" />;
  if (success) return <Redirect to="/dashboard" />;

  if (user.role != "CLIENT") {
    console.log(user);
    cogoToast.error("Route not available");
    return <Redirect to="/dashboard" />;
  }
  return (
    <Flex align={"center"} justify={"center"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{
          width: "100%",
        }}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4} className="qfont">
              <FormControl id="title">
                <FormLabel>Task Title</FormLabel>
                <Input
                  required
                  autoComplete="no"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="eg. i want to move ..."
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Task Description</FormLabel>
                <Input
                  required
                  autoComplete="no"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  placeholder="enter a detailed description"
                />
              </FormControl>
              <FormControl id="location">
                <FormLabel>Task Location</FormLabel>
                <Input
                  required
                  autoComplete="no"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  type="text"
                  placeholder="eg. Uyo"
                />
              </FormControl>
              <FormControl id="offer">
                <FormLabel>Task Offer ($)</FormLabel>
                <Input
                  required
                  autoComplete="no"
                  value={offer}
                  onChange={(e) => {
                    setOffer(e.target.value);
                  }}
                  type="number"
                  placeholder="300"
                />
              </FormControl>
              {!L && !err && (
                <Select
                  onChange={(e) => {
                    setJob(e.target.value);
                  }}
                  placeholder="Select one Category"
                >
                  {jobList.map((j, i) => {
                    return (
                      <option key={i} value={j.id}>
                        {j.name}
                      </option>
                    );
                  })}
                </Select>
              )}
              {L && (
                <Text as={"small"}>
                  Fetching job categories, please wait...
                </Text>
              )}
              {err && (
                <>
                  <Text as={"small"}>An Error occurred, please</Text>
                  <Button
                    onClick={() => {
                      setL(true);
                      setErr(false);
                      fetchhJobs();
                    }}
                    s={"sm"}
                  >
                    TRY AGAIN
                  </Button>
                </>
              )}
              <Stack spacing={5}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  required
                  disabled={loading}
                >
                  Submit
                </Button>
                <Link
                  to="/dashboard"
                  style={{
                    display: "block",
                    width: "fit-content",
                    margin: "auto",
                    paddingTop: "5px",
                  }}
                >
                  <Button
                    bg={"transparent"}
                    color={"blue.500"}
                    _hover={{
                      bg: "blue.500",
                      color: "white",
                    }}
                  >
                    Go back
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
