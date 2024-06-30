import Image from "next/image";
import { Inter } from "next/font/google";
import SignIn from "@/components/forms/signin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   <SignIn />
  );
}
