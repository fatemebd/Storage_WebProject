import Note from "@/components/Modals/Note";
import { Avatar, Col, Dropdown, Flex, Input, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import logo from "../../../public/logo/header_logo.svg";
import avatar from "../../../public/Avatar.png";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";

const Shared = () => {
  const object = useRouter().query.object;
  useEffect(() => {
    console.log(object);
  }, [object]);
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
  return (
    <>
      <Typography className="text-5xl font-bold">All Notes</Typography>
      hiiiiiiiiiiiiii
      <Row gutter={[20, 16]} className="w-full"></Row>
    </>
  );
};

export default Shared;
