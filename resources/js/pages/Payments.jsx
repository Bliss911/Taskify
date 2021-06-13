import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
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

export default function Payments() {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [error, setErr] = useState(null);

  const { user } = useAuth();

  const fetchPayments = async () => {
    setLoading(true);
    setErr(null);
    try {
      const dt = await axios.get("/api/wallet/payments");
      const { data } = dt.data;
      setPayments(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPayments();
  }, []);
  return (
    <>
      {payments.length === 0 && (
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
            You have no transactions yet.
          </AlertTitle>
        </Alert>
      )}
      {!loading &&
        !error &&
        payments.map((p, i) => {
          if (p.type === "DEPOSIT") {
            return (
              <Stat
                className="qfont"
                my="10px"
                shadow="sm"
                rounded="md"
                p="2"
                border="1px solid"
                borderColor="gray.100"
              >
                <StatLabel>DEPOSIT</StatLabel>
                <StatNumber>{p.amount}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Credit
                </StatHelpText>
              </Stat>
            );
          }
          if (p.type === "TRANSFER" && user.role === "CLIENT") {
            return (
              <Stat
                className="qfont"
                my="10px"
                shadow="sm"
                rounded="md"
                p="2"
                border="1px solid"
                borderColor="gray.100"
              >
                <StatLabel>Transfer</StatLabel>
                <StatNumber>${p.amount}</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  Debit
                  <br />
                  <Text as="b" fontSize="18px" pt="2">
                    SENT TO:{" "}
                    {p.reciever.user.firstname + " " + p.reciever.user.lastname}
                  </Text>
                </StatHelpText>
              </Stat>
            );
          }
          if (p.type === "TRANSFER" && user.role === "VENDOR") {
            return (
              <Stat
                className="qfont"
                my="10px"
                shadow="sm"
                rounded="md"
                p="2"
                border="1px solid"
                borderColor="gray.100"
              >
                <StatLabel>Transfer</StatLabel>
                <StatNumber>{p.amount}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Credit
                  <br />
                  <Text as="b" fontSize="18px" pt="2">
                    FROM:{" "}
                    {p.sender.user.firstname + " " + p.sender.user.lastname}
                  </Text>
                </StatHelpText>
              </Stat>
            );
          }
        })}

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
            <Button onClick={fetchPayments}>Please Retry</Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
