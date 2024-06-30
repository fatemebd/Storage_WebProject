import PublicLayout from "@/components/layouts/PublicLayout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Dashboard from "./Dashboard";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        components: {
          Button: {
            colorPrimary: "#7288FA",
            algorithm: true, // Enable algorithm
            defaultHoverColor: "#7288FA",
          },
        },
        token: {},
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
  const token = true;
  // const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    if (
      !token &&
      router.pathname !== "/login" &&
      !router.pathname.startsWith("/validation") &&
      router.pathname !== "/signup"
    ) {
      router.push("/login");
    }
  }, [token, router.pathname]);

  if (!token || token === "undefined") {
    return <PublicLayout>{children}</PublicLayout>;
  }

  return <Dashboard>{children}</Dashboard>;
};
