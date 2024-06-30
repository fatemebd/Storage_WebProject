import Image from "next/image";
import logo from "../../../public/logo/header_logo.svg";
import avatar from "../../../public/Avatar.png";

import { Avatar, Button, Col, Flex, Input, Row, Typography } from "antd";
import { SearchOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetUser } from "../api/APIs";
const Dashboard = () => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await GetUser();
      console.log(response);
      setUser(response.data.user);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <main className="bg-white h-screen p-5">
      <Row className="items-center">
        <Col md={8}>
          <Image md={6} src={logo} className="bg-transparent" />
        </Col>
        <Col md={10} xs={24} className="px-5">
          <Input
            placeholder="search ..."
            prefix={<SearchOutlined className=" mr-2" />}
            size="large"
            variant="borderless"
            className="rounded-full shadow items-center"
          />
        </Col>
        <Col md={6}>
          <Row justify="end" className="gap-5 items-center">
            <Button
              type="primary"
              className="rounded-full bg-primary-1000"
              icon={<CloudUploadOutlined />}
            >
              Upload
            </Button>
            <Col>
              <Row justify="center" className="gap-2 items-center">
                <Image width={45} src={avatar} className="rounded-full" />
                <Typography>{user.username}</Typography>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Flex className=" mt-10 flex w-full min-h-10 items-center justify-center rounded-xl bg-grey-1000 px-5 py-10 shadow-lg">
        khsdbcksdcbsd klv
      </Flex>
    </main>
  );
};

export default Dashboard;
