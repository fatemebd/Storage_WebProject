import { Register } from "@/pages/api/APIs";
import { Button, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const SignUp = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await Register(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success(
        "You have successfully registered, You will redirect to login."
      );
      router.push(`/validation/${data.email}`);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      title="Login"
      className="md:px-10 p-2 justify-between"
      onFinish={handleSubmit}
    >
      <Typography className="text-5xl font-extrabold mb-12">
        Create Account
      </Typography>
      {/* <Form.Item
        label="Username"
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
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Enter your Username"
        />
      </Form.Item> */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          className="shadow"
          size="large"
          variant="borderless"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your Email"
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm-password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Confirm Password"
          className="shadow"
          size="large"
          variant="borderless"
          onChange={(e) => {
            if (e.target.value === password) {
              setData({ ...data, password: e.target.value });
            } else {
              toast.error("please enter the same password.");
            }
          }}
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
        Create Account
      </Button>
      <Row justify="center" className="mt-5">
        <Typography>Already have an account?</Typography>
        <Link href="/login" className="text-primary-1000">
          {" "}
          Login
        </Link>
      </Row>
    </Form>
  );
};

export default SignUp;
