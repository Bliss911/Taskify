import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo(props) {
    return (
        <Box {...props}>
            <Text className="qfont" fontSize="lg" fontWeight="bold">
                <Link to="/">Taskify</Link>
            </Text>
        </Box>
    );
}
