import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Button,
  IconButton,
  DrawerOverlay,
  DrawerContent,
  Alert,
  AlertIcon,
  DrawerCloseButton,
} from "@chakra-ui/react";
import cogoToast from "cogo-toast";
import { FcCheckmark } from "react-icons/fc";

export default function CompleteTaskDialog({ task, setTask, setBidders }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const [submitting, setSubmitting] = useState(false);

  const markAsDone = (data) => {
    console.log(data);
    setSubmitting(true);
    axios
      .post("/api/tasks/done", data)
      .then((response) => {
        let { data } = response.data;
        console.log(data);
        setTask(data[0]);
        const bidvendors = [];

        data[0].bids.forEach((bid) => {
          bidvendors.push(bid.vendor.id);
        });
        setBidders(bidvendors);
        cogoToast.success("Done!");
      })
      .catch((error) => {
        setSubmitting(false);
        onClose();

        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          let err = error.response.data;
          console.log(err);
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

  return (
    <>
      <Button
        title="complete task"
        mb={4}
        size="sm"
        ml="auto"
        mr="2"
        fontSize="20px"
        color="green"
        onClick={() => setIsOpen(true)}
      >
        <FcCheckmark />
      </Button>

      <Drawer
        width={["100%", "100%", "70%", "70%"]}
        placement="top"
        size="sm"
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" className="qfont">
            Complete Task
          </DrawerHeader>
          <DrawerBody className="qfont">
            <Alert status="warning">
              <AlertIcon />
              Are you sure? Make sure the task is completed. You can't undo this
              action afterwards.
              <br />
              Completeing task automatically transfers the accepted bid amount
              to the bidder.
            </Alert>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={submitting}
              loadingText="Submitting"
              colorScheme="green"
              variant="outline"
              onClick={() => {
                markAsDone({ task: task.id });
              }}
            >
              Continue
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
