import PublicLayout from "@/components/layouts/PublicLayout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Dashboard from "./Dashboard";
import { ConfigProvider } from "antd";
import "@/styles/editor.css";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        components: {
          Spin: {
            colorPrimary: "#7288FA",
          },
          Button: {
            colorPrimary: "#7288FA",
            algorithm: true, // Enable algorithm
            defaultHoverColor: "#7288FA",
          },
        },
        token: {
          colorPrimary: "#7288FA",
        },
      }}
    >
      <AuthProvider>
        <Toaster position="bottom-center" />
        {/* {token ? (
        ""
      ) : ( */}
        {/* <PublicLayout> */}
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
        {/* </PublicLayout>
      )} */}
      </AuthProvider>
    </ConfigProvider>
  );
}
const AuthWrapper = ({ children }) => {
  console.log(children);
  // const token = true;
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (
    //   !token &&
    //   router.pathname !== "/login" &&
    //   !router.pathname.startsWith("/validation") &&
    //   !router.pathname.startsWith("/activate") &&
    //   router.pathname !== "/signup"
    // ) {
    //   // console.log(router.pathname);
    //   router.push("/login");
    // } else if (token) {
    //   // router.push("/");
    // }
  }, [token, router.pathname]);

  if (!token || token === "undefined") {
    return <PublicLayout>{children}</PublicLayout>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};
