import { Button, Checkbox, Flex, Input, List, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { GetAllUsers, PostAccess } from "@/pages/api/APIs";
import toast from "react-hot-toast";

const UsersList = ({ open, setOpen, selected, setSelected, objectId }) => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    console.log(users);
    if (value === "" || value === null || users == {}) {
      setShowUsers(users);
    } else {
      const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(value)
      );
      setShowUsers(filteredUsers);
    }
  };

  const sortUsersBySelectedEmails = (users, selected) => {
    console.log(selected);
    if (selected !== undefined) {
      return users.sort((a, b) => {
        const aInSelected = selected.includes(a.email);
        const bInSelected = selected.includes(b.email);

        if (aInSelected && !bInSelected) return -1;
        if (!aInSelected && bInSelected) return 1;
        return 0;
      });
    }
  };

  const getUsers = async () => {
    try {
      const response = await GetAllUsers();
      console.log(selected);
      if (selected.length>0) {
        setUsers(sortUsersBySelectedEmails(response.data.users));
        setShowUsers(sortUsersBySelectedEmails(response.data.users));
      } else {
        console.log(selected);
        setUsers(response.data.users);
        setShowUsers(response.data.users);
      }
    } catch (err) {
      toast.error("ffffffffffff");
    }
  };

  useEffect(()=>{
    console.log(users);
  },[users])
  useEffect(() => {
    getUsers();
  }, []);

  const handleOk = async () => {
    try {
      const response = await PostAccess({
        object_id: objectId,
        emails: selected,
      });
      toast.success("Access updates successfully!");
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal
      //   title="Add People"
      className="items-center"
      open={open}
      closable={false}
      onCancel={() => setOpen(false)}
      onOk={handleOk}
    >
      <Flex gap="8rem" className="mb-3">
        <Button
          type="borderless"
          className="rounded-full shadow-md"
          onClick={() => setOpen(false)}
        >
          <ArrowLeftOutlined />
        </Button>
        <Typography className="text-center text-lg font-bold">
          Add People
        </Typography>
      </Flex>
      <Input
        type="borderless"
        className="rounded-full shadow-md my-2"
        placeholder="search people..."
        prefix={<SearchOutlined />}
        onChange={handleSearch}
      />
      <List
        header={null}
        footer={null}
        dataSource={showUsers}
        renderItem={(item) => (
          <List.Item>
            <Flex className="flex flex-row justify-end gap-3">
              <Checkbox
                checked={selected && selected.includes(item.email)}
                onChange={() => setSelected([...selected, item.email])}
              />
              <Flex className="flex-col">
                <Typography.Text className="font-semibold">
                  {item.username}
                </Typography.Text>
                <Typography className="text-[#A3B2C7]">{item.email}</Typography>
              </Flex>
            </Flex>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default UsersList;
