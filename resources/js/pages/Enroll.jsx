import { Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { Redirect } from "react-router";
import EnrollForm from "../components/Enroll/EnrollForm";
import { useAuth } from "../contexts/AuthProvider";

export default function Enroll() {
    const { isAuth } = useAuth();

    if (isAuth) return <Redirect to="/dashboard" />;

    return (
        <>
            <Heading
                textAlign="center"
                py={8}
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            >
                <Text
                    className="qfont"
                    as={"span"}
                    position={"relative"}
                    _after={{
                        content: "''",
                        width: "full",
                        height: useBreakpointValue({
                            base: "20%",
                            md: "30%",
                        }),
                        position: "absolute",
                        bottom: 1,
                        left: 0,
                        bg: "primary.400",
                        zIndex: -1,
                    }}
                >
                    Enroll as Vendor
                </Text>
            </Heading>

            <EnrollForm />
        </>
    );
}
