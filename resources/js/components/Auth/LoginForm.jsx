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
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

export default function LoginForm() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = () => setShow(!show);

    const { login, loading } = useAuth();

    return (
        <Flex
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ email, password });
                }}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={7} px={6}>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4} className="qfont">
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
                                    *at least six characters
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
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    );
}
