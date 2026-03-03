import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Manager",
  description: "Manage your files and folders",
};

const page = () => {
  return (
    <div>
      <h1>This is page Component</h1>
    </div>
  );
};

export default page;
