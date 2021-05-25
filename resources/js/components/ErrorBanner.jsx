import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Flex,
    Box,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ErrorBanner({ message, retry }) {
    return (
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
                An error occurred!
            </AlertTitle>
            <AlertDescription maxWidth="sm" className="qfont">
                {message || "Something ain't right somewhere, just try again"}
                <br />
            </AlertDescription>
            <Box
                display="flex"
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Button onClick={retry}>Try Again</Button>
            </Box>
        </Alert>
    );
}
