import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Manage your subscriptions and billing information",
};

const page = () => {
  return (
    <div>
      <h1>This is page Component</h1>
    </div>
  );
};

export default page;
