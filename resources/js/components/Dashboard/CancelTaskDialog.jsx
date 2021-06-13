import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Button,
  DrawerOverlay,
  DrawerContent,
  Alert,
  AlertIcon,
  DrawerCloseButton,
} from "@chakra-ui/react";

export default function CancelTaskDialog({ task, setTask, setBidders }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const [submitting, setSubmitting] = useState(false);

  const cancelTask = (data) => {
    setSubmitting(true);
    axios
      .post("/api/tasks/cancel", data)
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
        mb={4}
        size="sm"
        colorScheme="green"
        variant="outline"
        bg="red.700"
        _hover={{
          bg: "green.500",
        }}
        color="white"
        onClick={() => setIsOpen(true)}
      >
        Cancel Task
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
            Cancel Task?
          </DrawerHeader>
          <DrawerBody className="qfont">
            <Alert status="warning">
              <AlertIcon />
              Are you sure? You can't undo this action afterwards.
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
                cancelTask({ task: task.id });
              }}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
