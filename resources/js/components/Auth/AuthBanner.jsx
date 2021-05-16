import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function AuthBanner(){


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
          Login required!
        </AlertTitle>
        <AlertDescription maxWidth="sm" className="qfont">
         You need to login to access this content.
          <br />
        
        </AlertDescription>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button ml={1}>Sign Up</Button>
            </Link>
          </Box>
      </Alert>
    )
}