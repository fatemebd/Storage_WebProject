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
} from "antd";
import {
  SearchOutlined,
  CloudUploadOutlined,
  InboxOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetObjects, GetUser, PostObject } from "../api/APIs";
import ObjectCard from "@/components/Objects/ObjectCard";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
// import MyModal from "@/components/Inputs/Editor";
import Note from "@/components/Modals/Note";


const Dashboard = () => {
  // const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const { token, getUser, user } = useAuth();
  const [page, setPage] = useState(1);
  const [objects, setObjects] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [totalObjects, setTotalObj] = useState(0);


  // const getUser = async () => {
  //   try {
  //     const response = await GetUser();
  //     console.log(response);
  //     setUser(response.data.user);
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, [token]);
  const getObjects = async () => {
    try {
      const response = await GetObjects(page);
      setObjects(response.data.objects);
      setTotalObj(response.data.count);
      console.log(response.data.objects);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const calculateTotalSize = (array) => {
    if (array.length > 0) {
      return array.reduce((total, item) => {
        console.log(item);
        return (
          Math.round((total + (item.size || 0) / (1024 * 1024 * 1024)) * 100) /
          100
        );
      }, 0);
    }
    return 0;
  };

  useEffect(() => {
    if (objects != undefined) {
      const size = calculateTotalSize(objects);
      setTotalSize(size);
    }
  }, [objects]);
  const showModal = () => {
    setVisible(true);
  };

  
  return (
    <main className="bg-white h-full md:h-screen p-5 ">
  <Note visible={visible} setVisible={setVisible} />
      {/* <Modal
        title="Upload"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            disabled={uploadLoading}
            className="mt-3"
            type="primary"
            onClick={handleOk}
          >
            {uploadLoading ? "Uploading" : "Upload"}
            {uploadLoading && (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            )}
          </Button>
        }
      >
        <MyModal
          visible={visible}
          onClose={() => setVisible(false)}
          initialText={text}
          onSave={setTesxt}
        ></MyModal>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click to pick a file, or simply drag and drop{" "}
          </p>
        </Dragger>
      </Modal> */}
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
              icon={<CloudUploadOutlined />}
            >
              Upload
            </Button>
            <Col>
              <Row justify="center" className="gap-2 items-center">
                <Image width={45} src={avatar} className="rounded-full" />
                <Typography>{user?.username}</Typography>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Flex className=" mt-10 flex flex-col justify-start p-5 w-full min-h-10 gap-5 items-start rounded-xl bg-grey-1000 px-5 py-10 shadow-lg">
        <Typography className="text-5xl font-bold">Objects</Typography>
        <Typography className=" text-lg">
          Total:
          <Typography className="font-semibold inline">
            {" "}
            {totalSize}
            GB
          </Typography>{" "}
        </Typography>
        <Row gutter={[20, 16]} className="w-full">
          {objects.map((object, index) => (
            <Col md={6} sm={12} xs={24} key={index}>
              <ObjectCard className="h-full w-full" object={object} />
            </Col>
          ))}
        </Row>
        <Row className="w-full flex justify-center">
          <Pagination
            align="center"
            current={page}
            onChange={(p) => setPage(p)}
            total={totalObjects}
          />
        </Row>
      </Flex>
    </main>
  );
};

export default Dashboard;
