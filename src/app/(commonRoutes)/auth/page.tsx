import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | FileBox",
  description: "FileBox - Your Ultimate File Management Solution",
};

const page = () => {
  return (
    <main>
      <AuthPage />
    </main>
  );
};

export default page;
