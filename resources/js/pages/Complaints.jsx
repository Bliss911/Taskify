import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { MdContacts } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import cogoToast from "cogo-toast";

export default function Complaints() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const sendComplaints = async () => {
    setSending(true);
    let res = await axios.post("/api/auth/complaints", {
      name,
      email,
      message,
    });
    cogoToast.success("message sent");
    setSending(false);
    setMessage("");
    setName("");
    setEmail("");
  };

  return (
    <>
      {user && user.role !== "ADMIN" ? (
        <Stack
          bg={"white"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          justify="center"
          maxW="600px"
          m="auto"
        >
          <Stack spacing={4} w="100%" textAlign="center" className="qfont">
            <Heading
              className="qfont"
              color={"textDark.100"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Send us a message
              <Text as={"span"} bg="secondary.100" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              If you're not satisfied with the services or behaviour of a client
              /vendor, please send us a message explaining what happened.
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={5}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pl="2"
                    py="6"
                    pointerEvents="none"
                    children={
                      <Icon as={MdContacts} fontSize="24px" color="green.500" />
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Full Name of offender"
                    py="6"
                    pl="45px"
                    rounded="full"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    bg="white"
                  />
                </InputGroup>
              </FormControl>

              {/* email */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pl="2"
                    py="6"
                    pointerEvents="none"
                    children={
                      <Icon
                        as={FaUserCircle}
                        fontSize="24px"
                        color="green.500"
                      />
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Email of offender"
                    py="6"
                    pl="45px"
                    rounded="full"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    bg="white"
                  />
                </InputGroup>
              </FormControl>
              {/* message box */}
              <Textarea
                placeholder="Write Your complaints"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <Button
                size="md"
                rounded="34px"
                color="white"
                colorScheme="green"
                isLoading={sending}
                onClick={sendComplaints}
                bg="green.500"
                px={"40px"}
                w="full"
                disabled={
                  name.trim().length == 0 ||
                  email.trim().length == 0 ||
                  message.trim().length == 0
                }
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Box>Admin</Box>
      )}
    </>
  );
}
