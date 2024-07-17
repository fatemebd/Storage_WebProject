import { Col, Pagination, Row, Tag, Typography } from "antd";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Filter, GetObjects, GetTags } from "../api/APIs";
import ObjectCard from "@/components/Objects/ObjectCard";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [objects, setObjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState("");
  const getObjects = async () => {
    try {
      const response = await GetObjects();
      setObjects(response.data);
      console.log(response.data.objects);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getTags = async () => {
    try {
      const response = await GetTags();
      setTags(response.data.tags);
      console.log(response.data.objects);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filterNotes = async (tag) => {
    try {
      const response = await Filter(tag);
       setObjects(response.data);
      console.log(response.data.objects);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getObjects();
    getTags();
  }, []);

  useEffect(() => {
    if (filter !== "") {
      filterNotes(filter);
    }
  }, [filter]);

  return (
    <>
      <Row className="flex items-center justify-between w-full">
        <Col>
          <Typography className="text-5xl font-bold">All Notes</Typography>
        </Col>
        <Col>
          {tags.map((tag) => (
            <Tag.CheckableTag
              className="rounded-full"
              onClick={() => setFilter(tag)}
              checked={filter === tag}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
        </Col>
      </Row>

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
        />
      </Row>
    </>
  );
};

export default Dashboard;
