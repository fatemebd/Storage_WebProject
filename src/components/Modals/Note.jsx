import { useEffect, useState } from "react";
import { Button, Col, Input, Modal, Spin } from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Dragger from "antd/es/upload/Dragger";
const Editor = dynamic(() => import("@/components/Inputs/Editor"), {
  ssr: false,
});
import Tags from "../Display/Tags";
import Typography from "antd/es/typography/Typography";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
const Note = ({ visible, setVisible, isCreate, object, isUpdate }) => {
  const [fileList, setFileList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [data, setData] = useState({});
  const [hasFile, setHasFile] = useState(false);
  const [tags, setTags] = useState([]);
  const { token } = useAuth();

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (isUpdate) {
      setData(object);
    }
  }, [object]);

  const handleOk = async () => {
    setUploadLoading(true);
    const postData = new FormData();
    postData.append("title", data.title);
    postData.append("content", data.content);
    if (data.tags) {
      postData.append("tags", data.tags);
    }
    if (fileList.length > 0) {
      fileList.forEach((file, index) => {
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
        toast.success("Your note created successfully!");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setUploadLoading(false);
        setVisible(false);
        setData({});
        setFileList([]);
      }
    } else if (isUpdate) {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/notes/update/${data.id}/?edit_key=${data.edit_key}`,
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Your note edited successfully!");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setUploadLoading(false);
        setVisible(false);
      }
    }
  };
  const props = {
    name: "file",
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
