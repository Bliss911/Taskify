// 1. Create a component that consumes the `useRadio` hook
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { Box, Stack, useRadio, useRadioGroup } from "@chakra-ui/react";
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                className="qfont"
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "#0ca25f",
                    color: "white",
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function SkillsSelect() {
    const [loading, setLoading] = useState(true);
    const { skills, setSkills } = useAuth();

    const fetchhJobs = async () => {
        try {
            const dt = await axios.get("/api/jobslist");
            const { data } = dt.data;
            setSkills(data);
            setLoading(false);
        } catch (error) {
            setERR(error.message);
            setLoading(false);
        }
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "skills",
        defaultValue: "all",
        onChange: console.log,
    });

    const group = getRootProps();

    useEffect(() => {
        if (skills.length != 0) return;
        fetchhJobs();
    }, []);
    return (
        <>
            {!loading && (
                <>
                    {" "}
                    <Stack {...group}>
                        {skills.map((v) => {
                            const radio = getRadioProps({ value: v.name });
                            return (
                                <RadioCard key={v.name} {...radio}>
                                    {v.name}
                                </RadioCard>
                            );
                        })}
                    </Stack>
                </>
            )}
            {loading && (
                <Skeleton>
                    <SkeletonText />
                    <SkeletonText />
                    <SkeletonText />
                </Skeleton>
            )}
        </>
    );
}
