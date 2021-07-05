import {
  List,
  ListItem,
  ListIcon,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { MdCheckCircle } from "react-icons/md";
import { useGenCtx } from "../contexts/GeneralProvider";

export default function Notifications() {
  const { error, loading, fetchNotifs, notifs } = useGenCtx();

  return (
    <>
      {!loading && !error && notifs.length === 0 && (
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
            You have no notifiations.
          </AlertTitle>
        </Alert>
      )}
      <List spacing={3} pt="2">
        {!loading &&
          !error &&
          notifs.map((p, i) => {
            return (
              <ListItem
                key={i}
                p={2}
                className="qfont"
                border="1px solid"
                borderColor="gray.100"
              >
                <ListIcon as={MdCheckCircle} color="green.500" />
                {p.message}
              </ListItem>
            );
          })}
      </List>

      {loading && (
        <Center width="100%">
          <Spinner size="lg" />
        </Center>
      )}
      {!loading && error && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          minHeight="220px"
        >
          <AlertIcon size="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg" className="qfont">
            Oops! Looks like an unrecoverable error occurred!
          </AlertTitle>
          <AlertDescription maxWidth="sm" className="qfont">
            {error}
            <Button onClick={fetchNotifs}>Please Retry</Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
