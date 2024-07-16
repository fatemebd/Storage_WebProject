// pages/activate.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { PostActivation } from "../api/APIs";
import toast from "react-hot-toast";
import { LoadingOutlined } from "@ant-design/icons";

const Activate = () => {
  const router = useRouter();
  const { activation } = router.query;
  const [loading, setLoading] = useState(true);
  const activeUser = async (token) => {
    try {
      const response = await PostActivation(token);
      setLoading(false);
      toast.success("Activation was successful, You will redirect to login.");
      // router.push("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (activation) {
      activeUser({ token: activation.split('/')[0] });
    }
  }, [activation]);

  return (
    <div className="text-black flex justify-center items-center h-full">
      {loading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
    </div>
  );
};

export default Activate;
