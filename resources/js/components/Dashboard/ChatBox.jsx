import {
  Stack,
  Box,
  Avatar,
  Text,
  Flex,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import cogoToast from "cogo-toast";
import { useGenCtx } from "../../contexts/GeneralProvider";
import axios from "axios";

export default function ChatBox() {
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const {
    msgs,
    setmsgs,
    fetchMessagesForChat,
    loadingChatMessages,
    err,
    recipient,
  } = useGenCtx();

  const scrollToBottom = () => {
    const chat = document.getElementById("chat-bx-scll");
    if (chat == null) return;
    chat.scrollTop = chat.scrollHeight;
  };

  const sendMessage = async () => {
    if (message.trim() == "") {
      cogoToast.error("Type something...");
      return;
    }
    try {
      const dt = await axios.post("/api/messages/send", {
        message: message,
        recipient: recipient.id,
      });
      const { data } = dt.data;
      setmsgs(data.messages);
      setMessage("");
      scrollToBottom();
    } catch (error) {
      cogoToast.error(error.message);
    }
  };

  useEffect(() => {
    Echo.private("chat." + user.id).listen(".MessageSent", (e) => {
      cogoToast.info("New message from " + e.user.firstname, {
        position: "bottom-right",
      });
      setmsgs(e.message.messages);
      scrollToBottom();
    });

    scrollToBottom();
  }, []);

  return (
    <>
      <Stack
        px={"3"}
        spacing="15px"
        overflowY="scroll"
        pb="100px"
        id="chat-bx-scll"
      >
        {recipient != null &&
          !loadingChatMessages &&
          msgs.map((m, i) => {
            if (user.id === m.sender.id) {
              return (
                <Stack
                  spacing="10px"
                  key={i}
                  width="80%"
                  align="top"
                  direction="row-reverse"
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <Avatar
                    size="sm"
                    name={m.sender.firstname + " " + m.sender.lastname}
                    src=""
                  ></Avatar>
                  <Box p="3" rounded="lg" bg="white">
                    <Text as="span" className="afont" fontWeight="light">
                      {m.message}
                    </Text>
                  </Box>
                </Stack>
              );
            } else {
              return (
                <Stack
                  spacing="10px"
                  width="80%"
                  key={i}
                  align="top"
                  direction="row"
                >
                  <Avatar
                    size="sm"
                    name={m.sender.firstname + " " + m.sender.lastname}
                    src=""
                  ></Avatar>
                  <Box p="3" rounded="lg" bg="white" fontSize="14px">
                    <Text as="span" className="afont" fontWeight="light">
                      {m.message}
                    </Text>
                  </Box>
                </Stack>
              );
            }
          })}
      </Stack>
      {recipient == null && <Box>Select a user to see messages</Box>}
      {loadingChatMessages && (
        <Box>
          <Spinner size="lg" />
        </Box>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Flex
          position="absolute"
          bottom="0px"
          zIndex="99"
          width="100%"
          bg="gray.200"
          p="3"
          alignItems="center"
        >
          <Input
            disabled={recipient == null}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            roundedLeft="50px"
            bg="white"
            value={message}
            placeholder="Type a message"
          />
          <Button size="sm" type="submit" colorScheme="green">
            Send
          </Button>
        </Flex>
      </form>
    </>
  );
}
