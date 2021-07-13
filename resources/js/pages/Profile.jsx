import React, { useState } from "react";
import {
  Stack,
  Spinner,
  Input,
  Text,
  Flex,
  HStack,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";

function Profile() {
  const { user, isAuth, getUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const upload = async (formdata) => {
    setLoading(true);
    let res = await axios.post("/api/auth/upload", formdata);
    getUser();
    setLoading(false);
  };
  console.log(user);

  return (
    <Box>
      <HStack spacing="30px">
        <Box>
          <Avatar size="2xl" src={user.pic} name={user.name} />
        </Box>
        <Box className="qfont">
          <HStack spacing="3">
            <Editable
              defaultValue={user.firstname}
              fontSize="20px"
              fontWeight="semibold"
              onSubmit={async (value) => {
                setLoading(true);
                let res = await axios.post("/api/auth/firstname", {
                  firstname: value,
                });
                setLoading(false);
                getUser();
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>

            <Editable
              defaultValue={user.lastname}
              fontSize="20px"
              fontWeight="semibold"
              onSubmit={async (value) => {
                setLoading(true);
                let res = await axios.post("/api/auth/lastname", {
                  lastname: value,
                });
                setLoading(false);
                getUser();
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </HStack>

          <Text color={user.status === "VERIFIED" ? "green.500" : "red.500"}>
            {user.status}
          </Text>
          <Text>{user.email}</Text>
          {user.role !== "ADMIN" && (
            <Text style={{ marginTop: 0 }} className="qfont" as="small">
              Joined since{" "}
              {isAuth && (
                <ReactTimeAgo
                  date={user.created_at}
                  locale="en-US"
                  timeStyle="twitter"
                />
              )}
            </Text>
          )}
        </Box>
      </HStack>
      <Stack pt="5" className="afont">
        <Text>* Change Profile image : </Text>
        <Input
          maxW="250px"
          type="file"
          onChange={(e) => {
            let f = new FormData();
            f.append("image", e.target.files[0]);
            upload(f);
          }}
        />
        {loading && <Spinner size="md" />}
        <Text>* To change your name, click on each name to edit. </Text>
      </Stack>
    </Box>
  );
}

export default Profile;
