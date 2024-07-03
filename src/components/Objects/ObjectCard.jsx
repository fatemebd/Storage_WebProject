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
const ObjectCard = ({ object }) => {
  const [icon, setIcon] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (object.is_owner) {
      setItems(ownerItems);
    } else {
      setItems(userItems);
    }
  }, []);
  useEffect(() => {
    console.log(object.icon);
    switch (object.icon) {
      case "jpg" || "png" || "svg":
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

  useEffect(() => {
    switch (object.icon) {
      case "jpg" | "png" | "svg":
    }
  }, [object]);

  const userItems = [
    {
      key: "1",
      icon: <DownloadOutlined className="text-[#7288FA]" />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
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
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Share{" "}
        </a>
      ),
    },
    {
      key: "2",
      icon: <DownloadOutlined className="text-[#7288FA]" />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Download{" "}
        </a>
      ),
      //   icon: <SmileOutlined />,
    },
    {
      key: "3",
      icon: <DeleteOutlined className="text-red-600" />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Delete{" "}
        </a>
      ),
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
          {Math.round((object.size /( 1024*1024)) * 100) / 100}MB-{object.time},
          {object.date}
        </Typography>
      </Col>
      <Col span={2} className="pl-2">
        <Dropdown
          trigger={["click"]}
          menu={{
            items,
          }}
        >
          <a>
            <MoreOutlined className="text-black" />
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default ObjectCard;
