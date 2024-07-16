import { Button, Col, Row, Typography, Dropdown, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  MoreOutlined,
  ShareAltOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Paragraph } = Typography;
import { DeleteObject } from "@/pages/api/APIs";
import toast from "react-hot-toast";
import Note from "../Modals/Note";

const ObjectCard = ({ object }) => {
  const [items, setItems] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setItems(ownerItems);
    if (object.title) {
      setShareUrl(`localhost:3000/shared/${object.id}_${object.edit_key}`);
    }
  }, []);

  const ownerItems = [
    {
      key: "1",
      icon: <ShareAltOutlined className="text-[#F9AB72]" />,
      label: "Share",
      onClick: (e) => {
        console.log(object);
        setShareOpen(true);
      },
    },
    {
      key: "2",
      icon: <EditOutlined className="text-[#7288FA]" />,
      label: "Edit",
      onClick: () => {
        setVisible(true);
      },
    },
    {
      key: "3",
      icon: <DeleteOutlined className="text-red-600" />,
      label: "Delete",
      onClick: async () => {
        console.log(object.object_id);
        try {
          const response = DeleteObject(object.object_id);
          toast.success("Object deleted successfully!");
          window.location.reload();
        } catch (err) {
          toast.error(err.message);
        }
      },
    },
  ];
  return (
    <Row
      className="bg-white py-2 px-4 rounded-lg gap-5 items-center h-full"
      align="center"
      justify="space-between"
    >
      <Note
        isUpdate={true}
        isCreate={false}
        visible={visible}
        setVisible={setVisible}
        object={object}
      />

      <Col span={12}>
        <Typography className="font-semibold">{object.title} </Typography>
        <Typography className="text-[#717984] text-nowrap	">
          {object.content}
        </Typography>
      </Col>
      <Col span={2} className="pl-2">
        <Dropdown trigger={["click"]} menu={{ items }}>
          <Button type="borderless">
            <MoreOutlined className="text-black" />
          </Button>
        </Dropdown>
      </Col>
      <Modal
        open={shareOpen}
        title="Share Url"
        onCancel={() => setShareOpen(false)}
        onOk={() => setShareOpen(false)}
      >
        <Paragraph copyable>{shareUrl}</Paragraph>
      </Modal>
    </Row>
  );
};

export default ObjectCard;
