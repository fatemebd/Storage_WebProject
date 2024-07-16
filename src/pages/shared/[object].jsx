import Note from "@/components/Modals/Note";
import { Avatar, Col, Dropdown, Flex, Input, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logo from "../../../public/logo/header_logo.svg";
import avatar from "../../../public/Avatar.png";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { GetNote } from "../api/APIs";
import toast from "react-hot-toast";

const Shared = () => {
  const object = useRouter().query.object;

  const [noteId, setNoteId] = useState();
  const [editId, setEditId] = useState();
  const [note, setNote] = useState({});

  const getNotee = async (id) => {
    try {
      const response = await GetNote(id);
      setNote(response.data);
      console.log(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if(object){

      const IDs = object.split("_");
      setNoteId(IDs[0]);
      setEditId(IDs[1]);
      getNotee(IDs[0]);
      console.log(IDs);
    }
  }, [object]);

  
  return (
    <>
      <Typography className="text-5xl font-bold">All Notes</Typography>
      hiiiiiiiiiiiiii
      <Row gutter={[20, 16]} className="w-full"></Row>
    </>
  );
};

export default Shared;
