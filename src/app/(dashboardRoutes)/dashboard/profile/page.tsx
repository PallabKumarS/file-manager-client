import { getMe } from "@/services/UserService";
import type { Metadata } from "next";
import { ProfilePage } from "./ProfilePage";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile | Dashboard",
  description: "This is the profile page of the dashboard",
};

const page = async () => {
  const getMePromise = getMe();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <Loader2 size={40} className="animate-spin text-accent-foreground" />
        </div>
      }
    >
      <ProfilePage getMePromise={getMePromise} />
    </Suspense>
  );
};

export default page;
