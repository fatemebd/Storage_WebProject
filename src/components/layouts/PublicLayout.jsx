import { Col, Row, Typography } from "antd";
import Image from "next/image";
import logo from "../../../public/logo/logo.svg";
import illustration from "../../../public/Illustration.png";
const PublicLayout = ({ children }) => {
  return (
    <Row className="h-screen w-full">
      <Col
        md={8}
        xs={0}
        className="bg-primary-1000 h-full p-10 items-start  justify-between flex-col hidden md:flex"
      >
        <Image src={logo} />
        <Typography className="text-5xl	font-extrabold	text-white">
          Manage your Notes the best way
        </Typography>
        <Typography className="text-base text-white	">
          Awesome, we've created the perfect place for you to store all your
          notes.
        </Typography>
        <Image alt="illustration" src={illustration} width={300} height={300} />
      </Col>
      <Col
        md={16}
        xs={24}
        className="h-screen bg-white md:p-20 md:px-[10rem] sm:p-2"
      >
        {children}
      </Col>
    </Row>
  );
};

export default PublicLayout;
