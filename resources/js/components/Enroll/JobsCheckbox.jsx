import React, { useState, useEffect } from "react";

import axios from "axios";
import {
    Text,
    CheckboxGroup,
    Stack,
    Checkbox,
    Button,
    Skeleton,
} from "@chakra-ui/react";

export default function JobsCheckBox({ setJobs, jobs }) {
    const [l, setL] = useState(true);
    const [joblist, setJobList] = useState([]);
    const [ERR, setERR] = useState(null);
    let jobsCHECKED = jobs;

    const handleChecks = ({ checked, value }) => {
        if (checked) {
            jobsCHECKED.push(value);
            let ns = new Set(jobsCHECKED);
            jobsCHECKED = [...ns];
            setJobs(jobsCHECKED);
        } else {
            let nJList = [];
            jobsCHECKED.forEach((v) => {
                if (value != v) {
                    nJList.push(v);
                }
            });
            jobsCHECKED = nJList;
            setJobs(jobsCHECKED);
        }
    };

    const fetchhJobs = async () => {
        try {
            const dt = await axios.get("/api/jobslist");
            const { data } = dt.data;
            setJobList(data);
            setL(false);
        } catch (error) {
            setERR(error.message);
            setL(false);
        }
    };
    useEffect(() => {
        fetchhJobs();
    }, []);
    return (
        <>
            <Text className="qfont">
                Select one or more jobs you can complete
            </Text>
            <Text className="afont" as={"small"}>
                *You can change this later
            </Text>

            <Skeleton isLoaded={!l && !ERR}>
                <Stack>
                    {joblist
                        ? joblist.map((d, i) => {
                              return (
                                  <Checkbox
                                      onChange={(e) => {
                                          handleChecks(e.target);
                                      }}
                                      key={i}
                                      value={d.id}
                                  >
                                      {d.name}
                                  </Checkbox>
                              );
                          })
                        : "Loading..."}
                </Stack>
            </Skeleton>
            {l && (
                <Text as={"small"}>
                    Fetching job categories, please wait...
                </Text>
            )}
            {ERR && (
                <>
                    <Text as={"small"}>An Error occurred, please</Text>
                    <Button
                        onClick={() => {
                            setL(true);
                            setERR(false);
                            fetchhJobs();
                        }}
                        s={"sm"}
                    >
                        TRY AGAIN
                    </Button>
                </>
            )}
        </>
    );
}
