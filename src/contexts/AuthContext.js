import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { GetUser, Signin } from "@/pages/api/APIs";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState();
  const router = useRouter();
  // useEffect(() => {
  //   if (token !== null && token !== undefined && token !== "undefined") {
  //     getUser();
  //   }
  // }, [token, router]);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else if (!router.pathname.startsWith("/activate")) {
      router.push("/login"); // Redirect to login if no token found
    }
  }, []);

  const login = async (data) => {
    // Replace with your login logic
    try {
      const response = await Signin(data);
      const tokenn = response.data.access;
      localStorage.setItem("token", tokenn);
      setToken(tokenn);
      toast.success(
        "You have successfully signed in, You will redirect to dashboard."
      );
      getUser(tokenn)
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    } 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  const getUser = async (t) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/user/details/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              t && t != "undefined" ? `Bearer ${t}` : null,
          },
        }
      );
      setUser(response.data.user);
    } catch (err) {
      toast.error(err.message);
      // getUser()
      // logout();
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { toast } from "react-hot-toast";
// import { GetUser, Signin } from "@/pages/api/APIs";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState();
//   const router = useRouter();

//   useEffect(() => {
//     const storedToken = sessionStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     } else if (!router.pathname.startsWith("/activate")) {
//       router.push("/login"); // Redirect to login if no token found
//     }
//   }, [router]);

//   useEffect(() => {
//     if (token!==null) {
//       getUser();
//     }
//   }, [token]);

//   const login = async (data) => {
//     try {
//       const response = await Signin(data);
//       const token = response.data.token;
//       sessionStorage.setItem("token", token);
//       setToken(token);
//       toast.success(
//         "You have successfully signed in, You will be redirected to the dashboard."
//       );
//       router.push("/");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const logout = () => {
//     sessionStorage.removeItem("token");
//     setToken(null);
//     router.push("/login");
//   };

//   const getUser = async () => {
//     try {
//       const response = await GetUser();
//       setUser(response.data.user);
//     } catch (err) {
//       toast.error(err.message);
//       // logout();
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout, getUser, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
