import { useEffect, useState } from "react";
import { Button, Col, Modal, Spin } from "antd";
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
const Note = ({ visible, setVisible }) => {
  const [fileList, setFileList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [text, setTesxt] = useState("hiiiiiiiiii");
  const [hasFile, setHasFile] = useState(false);
  const [tags, setTags] = useState([]);

  const handleUploadFile = async () => {
    const formData = new FormData();
    console.log(fileList);
    fileList.forEach((file) => {
      // console.log(file);
      formData.append("file", fileList);
    });
    setUploadLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/objects/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
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

  const handleOk = async () => {};
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
        <Editor
          className="mb-5"
          visible={visible}
          onClose={() => setVisible(false)}
          initialText={text}
          onSave={setTesxt}
        ></Editor>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click to pick a file, or simply drag and drop{" "}
          </p>
        </Dragger>
        <Tags tags={tags} setTags={setTags} />
      </Col>
    </Modal>
  );
};

export default Note;
