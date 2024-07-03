import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { GetUser, Signin } from "@/pages/api/APIs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } 
    else if (!router.pathname.startsWith("/activate")) {
      router.push("/login"); // Redirect to login if no token found
    }
  }, []);

  const login = async (data) => {
    // Replace with your login logic
    try {
      const response = await Signin(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      toast.success(
        "You have successfully signed in, You will redirect to dashboard."
      );
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

  const getUser = () => {
    try {
      const response = GetUser();
      return response.data.user;
    } catch (err) {
      toast.error("err.message");
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
