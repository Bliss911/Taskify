import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import cogoToast from "cogo-toast";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function SignupForm() {
    const [show, setShow] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSucc] = useState(false);
    const handleClick = () => setShow(!show);

    const handleSubmit = () => {
        if (
            firstname == "" ||
            lastname == "" ||
            email == "" ||
            password == ""
        ) {
            cogoToast.error("Please fill all fields");
        } else {
            const data = {
                lastname,
                firstname,
                email,
                password,
            };

            setLoading(true);
            axios
                .post("/api/auth/join", data)
                .then((response) => {
                    let { data } = response.data;
                    console.log(data);
                    cogoToast.success("Registration successful");
                    setSucc(true);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);

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

    if (success) return <Redirect to="/login" />;

    // useEffect(() => {
    //     console.log(jobs);
    // }, [jobs]);
    return (
        <Flex
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={7} px={6}>
                    <Stack align={"center"}>
                        {/* <Heading fontSize={"4xl"}>Sign in to your account</Heading> */}
                        <Text
                            className="qfont"
                            fontSize={"lg"}
                            color={"gray.600"}
                        >
                            Enter your details and get Tasking!
                        </Text>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4} className="qfont">
                            <FormControl id="firstname">
                                <FormLabel>Firstname</FormLabel>
                                <Input
                                    required
                                    value={firstname}
                                    onChange={(e) => {
                                        setFirstname(e.target.value);
                                    }}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl id="lastname">
                                <FormLabel>Lastname</FormLabel>
                                <Input
                                    required
                                    value={lastname}
                                    onChange={(e) => {
                                        setLastname(e.target.value);
                                    }}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    required
                                    autoComplete={false}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    type="email"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        minLength={5}
                                        required
                                        autoComplete={false}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        pr="4.5rem"
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleClick}
                                        >
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText>
                                    *Enter at least six characters
                                </FormHelperText>
                            </FormControl>
                            <Stack spacing={10}>
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
                                    Sign up now
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    );
}
