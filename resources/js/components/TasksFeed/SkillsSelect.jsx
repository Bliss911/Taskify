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
        <Box as="label" px={2}>
            <input {...input} />
            <Box
                onClick={() => {
                    props.searchCategories(props.v);
                    props.setShow(false);
                }}
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
export default function SkillsSelect({ searchCategories, setShow }) {
    const [loading, setLoading] = useState(false);
    const { skills, setSkills } = useAuth();

    const fetchhJobs = async () => {
        setLoading(true);
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
        if (skills.length == 0) {
            fetchhJobs();
        }
    }, []);
    return (
        <>
            {!loading && (
                <>
                    {" "}
                    <Stack {...group}>
                        {skills.map((v, i) => {
                            const radio = getRadioProps({ value: v.name });
                            if (v.name == "All") {
                                return (
                                    <RadioCard
                                        v={{ id: null, name: "All" }}
                                        setShow={setShow}
                                        searchCategories={searchCategories}
                                        key={"all"}
                                        {...radio}
                                    >
                                        All
                                    </RadioCard>
                                );
                            } else {
                                return (
                                    <RadioCard
                                        v={v}
                                        setShow={setShow}
                                        searchCategories={searchCategories}
                                        key={v.name}
                                        {...radio}
                                    >
                                        {v.name}
                                    </RadioCard>
                                );
                            }
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
