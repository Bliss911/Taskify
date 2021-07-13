import React, { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import axios from "axios";
import { useGenCtx } from "../contexts/GeneralProvider";
import { useAuth } from "../contexts/AuthProvider";
import {
  Box,
  Flex,
  Avatar,
  Stack,
  Center,
  HStack,
  Divider,
  Text,
  StackDivider,
} from "@chakra-ui/react";

import ReactTimeAgo from "react-time-ago";
import ChatBox from "../components/Dashboard/ChatBox";

function Messages() {
  const [allMessages, setAllMessages] = useState([]);
  const [err, setErr] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const { setRecipient, setmsgs, msgs, fetchMessagesForChat } = useGenCtx();

  const fetchChat = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/messages");
      const { data } = dt.data;
      setAllMessages(data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [msgs]);
  return (
    <Flex bg="white">
      <Stack
        width={["100%", "100%", "60%", "70%"]}
        position="relative"
        overflowY="hidden"
        bg="gray.100"
      >
        <ChatBox />
      </Stack>

      <Stack
        id="user-scrll"
        zIndex="10"
        bg="white"
        h="calc(100vh - 83px)"
        position={["absolute", "absolute", "relative", "relative"]}
        right="0"
        overflowY="scroll"
        transition="all .4s ease"
        zIndex="9"
        transform={{
          base: showUsers ? "translateX(0%)" : "translateX(101%)",
          md: "none",
        }}
        width={["50%", "50%", "40%", "30%"]}
      >
        <Box py="2">
          <Text textAlign="center">Chats</Text>
        </Box>
        <Divider />
        {allMessages && allMessages.length == 0 && (
          <Center px="2" py="2" bg="gray.100">
            <Text textAlign="center" color="red">
              No chats yet
            </Text>
          </Center>
        )}

        {allMessages &&
          allMessages.map((m, i) => {
            return (
              <HStack
                key={i}
                px="2"
                pt="1"
                spacing="2"
                cursor="pointer"
                bg="white"
                _hover={{
                  bg: "gray.100",
                }}
                lineHeight="1.1"
                onClick={() => {
                  setShowUsers(false);
                  setRecipient({
                    id: user.id === m.sender.id ? m.recipient.id : m.sender.id,
                    firstname:
                      user.id === m.sender.id
                        ? m.recipient.firstname
                        : m.sender.firstname,
                    lastname:
                      user.id === m.sender.id
                        ? m.recipient.lastname
                        : m.sender.lastname,
                    chat: m.id,
                  });
                  setmsgs([]);
                  fetchMessagesForChat(m.id);
                }}
                align="top"
              >
                <Avatar
                  size="sm"
                  name={
                    user.id === m.sender.id
                      ? m.recipient.firstname + " " + m.recipient.lastname
                      : m.sender.firstname + " " + m.sender.lastname
                  }
                  src=""
                ></Avatar>
                <Box py="1">
                  <Text py="0" className="qfont" textTransform="capitalize">
                    {user.id === m.sender.id
                      ? m.recipient.firstname + " " + m.recipient.lastname
                      : m.sender.firstname + " " + m.sender.lastname}
                  </Text>
                  <Text
                    py="0"
                    as="p"
                    pt="1"
                    fontSize="12px"
                    className="afont"
                    textOverflow="ellipsis"
                    width="100%"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    color="gray.600"
                  >
                    {m.messages[m.messages.length - 1].message}
                  </Text>
                  <Text
                    py="0"
                    as="small"
                    className="qfont"
                    fontSize="10px"
                    color="gray.600"
                  >
                    <ReactTimeAgo
                      date={m.messages[m.messages.length - 1].created_at}
                    />
                  </Text>
                </Box>
              </HStack>
            );
          })}
      </Stack>
    </Flex>
  );
}

export default Messages;
