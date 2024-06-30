import { Button, Col, Row, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import ValidationImage from "../../../public/Validation.png";
import Image from "next/image";

const Validation = () => {
  const router = useRouter();
  const email = useRouter().query.email;

  return (
    <Row justify="center" align="center">
      <Col className="flex flex-col items-center">
        <Typography className="text-5xl font-extrabold mb-12">
          Check your email
        </Typography>
        <Image src={ValidationImage} alt="validation" />
        <Typography>
          We've sent an email to {email} to verify your
          account.
        </Typography>
        <Button
          type="primary"
          className="w-full h-12 mt-10 bg-primary-1000 rounded-full hover:bg-primary-1000 shadow-md"
          onClick={() => {
            router.push("/login"); // Redirect to login if no token found
          }}
        >
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default Validation;
