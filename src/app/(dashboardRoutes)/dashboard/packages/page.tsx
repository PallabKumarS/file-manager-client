import { SubscriptionsPage } from "@/components/subscriptions/SubscriptionPage";
import { getAllSubscriptions } from "@/services/SubscriptionService";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

const page = async () => {
  const subscriptionsPromise = getAllSubscriptions();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      }
    >
      <SubscriptionsPage subscriptionsPromise={subscriptionsPromise} />
    </Suspense>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Subscriptions | Dashboard",
  description: "This is the subscriptions page of the dashboard",
};
