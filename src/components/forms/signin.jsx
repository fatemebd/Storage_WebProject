import { useAuth } from "@/contexts/AuthContext";
import { Button, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";

const SignIn = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();

  const { login } = useAuth();

  const handleSubmit = () => {
    login(data);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      title="Login"
      className="md:px-10 p-5 justify-between"
      onFinish={handleSubmit}
    >
      <Typography className="text-5xl font-extrabold mb-12">Login</Typography>
      <Form.Item
        label="Username | Email"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          className="shadow"
          size="large"
          variant="borderless"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your Username or Email"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter Password"
          className="shadow"
          size="large"
          variant="borderless"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full h-12 mt-10 bg-primary-1000 rounded-full hover:bg-primary-1000 shadow-md"
        // onClick={() => {
        //   setChangePassOpen(false);
        //   setPopUp("login");
        // }}
      >
        Login
      </Button>
      <Row justify="center" className="mt-5">
        <Typography>Don't have an account? </Typography>
        <Link href="/signup" className="text-primary-1000">
          {" "}
          Create Account
        </Link>
      </Row>
    </Form>
  );
};

export default SignIn;
