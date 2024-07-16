import {
  Button,
  Col,
  Flex,
  Row,
  Typography,
  Menu,
  Dropdown,
  Space,
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MoreOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import music from "../../../public/logo/music.png";
import pdf from "../../../public/logo/Logo PDF.png";
import video from "../../../public/logo/video.png";
import image from "../../../public/logo/Image.png";

import other from "../../../public/logo/Others file.png";
import UsersList from "../Modals/UsersList";
import { DeleteObject, DownloadUrl } from "@/pages/api/APIs";
import toast from "react-hot-toast";
const ObjectCard = ({ object }) => {
  const [icon, setIcon] = useState();
  const [items, setItems] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState();

  useEffect(() => {
    console.log(object);
    if (object.is_owner) {
      setItems(ownerItems);
    } else {
      setItems(userItems);
    }
  }, []);

  const getDownloadUrl = async () => {
    console.log(object.object_id);
    try {
      const response = await DownloadUrl(object.object_id);
      setDownloadUrl(response.data.link);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setSelected(object.users);
    getDownloadUrl();
    switch (object.icon) {
      case "jpg":
        setIcon(image);
        break;
      case "png":
        setIcon(image);
        break;
      case "svg":
        setIcon(image);
        break;
      case "pdf":
        setIcon(pdf);
        break;
      case "mkv":
        setIcon(video);
        break;
      case "mp3":
        setIcon(music);
        break;
      default:
        setIcon(other);
    }
  }, [object]);

  const userItems = [
    {
      key: "1",
      icon: <DownloadOutlined className="text-[#7288FA]" />,
      label: (
        <a download href={downloadUrl}>
          Download{" "}
        </a>
      ),
      //   icon: <SmileOutlined />,
    },
  ];
  const ownerItems = [
    {
      key: "1",
      icon: <ShareAltOutlined className="text-[#F9AB72]" />,
      label: "Share",
      onClick: () => {
        setListOpen(true);
      },
    },
    {
      key: "2",
      icon: <DownloadOutlined className="text-[#7288FA]" />,
      label: (
        <a download href={downloadUrl}>
          Download{" "}
        </a>
      ),
      //   icon: <SmileOutlined />,
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
      <Col>
        <Flex className="p-2 rounded-full bg-[#F1F4FF] ">
          <Image src={icon} />
        </Flex>
      </Col>
      <Col span={12}>
        <Typography className="font-semibold">{object.object_name} </Typography>
        <Typography className="text-[#717984] text-nowrap	">
          {Math.round((object.size / (1024 * 1024)) * 100) / 100}MB-{" "}
          {object.created_time.split("T")[1].split(".")[0]}, {" "}
          {object.created_time.split("T")[0]}
        </Typography>
      </Col>
      <Col span={2} className="pl-2">
        <Dropdown trigger={["click"]} menu={{ items }}>
          <Button type="borderless">
            <MoreOutlined className="text-black" />
          </Button>
        </Dropdown>
        <UsersList
          open={listOpen}
          setOpen={setListOpen}
          selected={selected}
          setSelected={setSelected}
          objectId={object.object_id}
        />
      </Col>
    </Row>
  );
};

export default ObjectCard;
