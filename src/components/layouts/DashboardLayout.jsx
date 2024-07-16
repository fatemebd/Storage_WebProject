import Image from "next/image";
import logo from "../../../public/logo/header_logo.svg";
import avatar from "../../../public/Avatar.png";

import {
  Spin,
  Button,
  Col,
  Flex,
  Input,
  Modal,
  Pagination,
  Row,
  Typography,
  Avatar,
  Dropdown,
} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteAccount, GetObjects, GetUser, PostObject } from "@/pages/api/APIs";
import ObjectCard from "@/components/Objects/ObjectCard";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
// import MyModal from "@/components/Inputs/Editor";
import Note from "@/components/Modals/Note";
import { useRouter } from "next/router";

const DashboardLayout = ({children}) => {
  const [visible, setVisible] = useState(false);
  const { user, logout } = useAuth();
  const [page, setPage] = useState(1);
  const [objects, setObjects] = useState([]);
  const [totalObjects, setTotalObj] = useState(0);
  const router = useRouter();

  const items = [
    {
      key: 1,
      danger: true,
      label: "Log Out",

      onClick: () => {
        logout();

        // cookies.remove("access_token");
        // navigate("/");
      },
    },
    {
      key: 2,
      danger: true,
      label: "Delete Aaccount",

      onClick: async () => {
        try {
          const response = await DeleteAccount();
          localStorage.removeItem("token");

          toast.success(
            "Your account deleted succussfully, you will be redirect to main page."
          );
          window.location.reload();
        } catch (err) {
          toast.error(err.message);
        }
      },
    },
  ];
//   const getObjects = async () => {
//     try {
//       const response = await GetObjects();
//       setObjects(response.data);
//       console.log(response.data.objects);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };
//   useEffect(() => {
//     getObjects();
//   }, []);
  const showModal = () => {
    setVisible(true);
  };

  return (
    <main className="bg-white h-full md:h-screen p-5 ">
      <Row className="items-center" gutter={[16, 16]}>
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
              onClick={showModal}
              type="primary"
              className="rounded-full bg-primary-1000"
              icon={<EditOutlined />}
            >
              New Note
            </Button>
            <Col>
              <Row justify="center" className="gap-2 items-center">
                <Dropdown key="1" menu={{ items }} trigger={["click"]}>
                  <Avatar
                    src={
                      <Image width={45} src={avatar} className="rounded-full" />
                    }
                  />
                </Dropdown>
                <Typography>{user?.username}</Typography>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Flex className=" mt-10 h-fit flex flex-col justify-start p-5 w-full min-h-10 gap-5 items-start rounded-xl bg-grey-1000 px-5 py-10 shadow-lg">
        {children}
      </Flex>
    </main>
  );
};

export default DashboardLayout;