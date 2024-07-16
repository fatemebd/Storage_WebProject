import { useEffect, useState } from "react";
import { Button, Col, Input, Modal, Spin } from "antd";
import {
  SearchOutlined,
  CloudUploadOutlined,
  InboxOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import Dragger from "antd/es/upload/Dragger";
const Editor = dynamic(() => import("@/components/Inputs/Editor"), {
  ssr: false,
});
import Tags from "../Display/Tags";
import Typography from "antd/es/typography/Typography";
import { CreateNote } from "@/pages/api/APIs";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
const Note = ({ visible, setVisible, isCreate }) => {
  const [fileList, setFileList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [data, setData] = useState({});
  const [hasFile, setHasFile] = useState(false);
  const [tags, setTags] = useState([]);
  const { token } = useAuth();

  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", []);
    fileList.forEach((file) => {
      // console.log(file);
      formData.append("file", fileList);
    });
    setUploadLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notes/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Your file uploaded successfully!");
      setUploadLoading(false);
      getObjects();
    } catch (err) {
      toast.error("An error accured");
      setUploadLoading(false);
    }

    setVisible(false);
    setFileList([]);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    setUploadLoading(true);
    const postData = new FormData();
    // postData.append(data);
    // postData = data;
    postData.append("title", data.title);
    postData.append("content", data.content);
    if (data.tags) {
      postData.append("tags", data.tags);
    }
    if (fileList.length > 0) {
      fileList.forEach((file, index) => {
        // console.log(file);
        postData.append(`files`, file);
      });
    }

    if (isCreate) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/notes/create/`,
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // const response = await CreateNote(data);
        toast.success("Your note created successfully!");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setUploadLoading(false);
        setVisible(false);
        setData({});
        setFileList([]);
      }
    }
  };
  const props = {
    name: "file",
    // className: "mt-5",
    multiple: true,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      setFileList(null);
    },
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  // useEffect(() => {
  //   if (fileList.length > 0) {
  //     setData({ ...data, files: fileList });
  //   }
  // }, [fileList]);

  useEffect(() => {
    console.log(fileList);
    if (fileList.length > 0) {
      setHasFile(true);
    } else {
      setHasFile(false);
    }
  }, [fileList]);

  return (
    <Modal
      title="New Note"
      open={visible}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <Button
          disabled={uploadLoading}
          className="mt-3"
          type="primary"
          onClick={handleOk}
        >
          {uploadLoading ? "Uploading" : "Done"}
          {uploadLoading && (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          )}
        </Button>
      }
    >
      <Col className="flex flex-col gap-2">
        <Typography className="font-bold mt-2">Title</Typography>
        <Input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        ></Input>
        <Typography className="font-bold mt-2">Content</Typography>

        <Editor
          className="mb-5"
          visible={visible}
          onClose={() => setVisible(false)}
          initialText={data.content}
          setText={(v) => setData({ ...data, content: v })}
        ></Editor>
        <Tags
          tags={data.tags ? data.tags : []}
          setTags={(v) => setData({ ...data, tags: v })}
        />
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click to pick a file, or simply drag and drop{" "}
          </p>
        </Dragger>
      </Col>
    </Modal>
  );
};

export default Note;
