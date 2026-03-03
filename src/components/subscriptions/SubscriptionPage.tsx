"use client";

import { use, useState } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import type { Subscription } from "@/types";
import { SubscriptionCard } from "./SubscriptionCard";
import SubscriptionForm from "./SubscriptionForm";
import { Modal } from "../shared/Modal";

export function SubscriptionsPage({
  subscriptionsPromise,
}: {
  subscriptionsPromise?: Promise<{
    data: Subscription[];
  }>;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Subscription | undefined>(undefined);

  const subscriptions = use(
    subscriptionsPromise || Promise.resolve({ data: [] }),
  ).data;

  function openCreate() {
    setEditing(undefined);
    setSheetOpen(true);
  }
  function openEdit(sub: Subscription) {
    setEditing(sub);
    setSheetOpen(true);
  }

  function handleDelete(id: string) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Subscription Packages
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage the plans available to users
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Package
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <Package className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            No packages yet
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Click New Package to create one.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {subscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              subscription={sub}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        content={<SubscriptionForm subscription={editing} />}
        trigger={null}
        title={editing ? "Edit Subscription" : "New Subscription"}
      />
    </div>
  );
}
