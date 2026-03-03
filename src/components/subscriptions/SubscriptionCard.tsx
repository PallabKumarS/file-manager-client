"use client";

import {
  Pencil,
  Trash2,
  FolderOpen,
  FileText,
  Layers,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Subscription } from "@/types";
import { PackageType } from "@/types/enums";

const formatBytes = (bytes: number) => {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${(bytes / 1e3).toFixed(1)} KB`;
};

const tierConfig: Record<
  PackageType,
  {
    topBar: string;
    badge: string;
    accent: string;
    ring: string;
    label: string;
    icon: string;
  }
> = {
  [PackageType.FREE]: {
    topBar: "bg-slate-300",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    accent: "text-slate-500",
    ring: "ring-slate-200",
    label: "Free",
    icon: "FREE",
  },
  [PackageType.SILVER]: {
    topBar: "bg-gradient-to-r from-slate-300 to-slate-500",
    badge: "bg-slate-200 text-slate-800 border-slate-300",
    accent: "text-slate-600",
    ring: "ring-slate-300",
    label: "Silver",
    icon: "SILVER",
  },
  [PackageType.GOLD]: {
    topBar: "bg-gradient-to-r from-amber-300 to-yellow-400",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    accent: "text-amber-700",
    ring: "ring-amber-200",
    label: "Gold",
    icon: "GOLD",
  },
  [PackageType.DIAMOND]: {
    topBar: "bg-gradient-to-r from-indigo-400 to-violet-500",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    ring: "ring-indigo-200",
    label: "Diamond",
    icon: "DIAMOND",
  },
};

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit?: (sub: Subscription) => void;
  onDelete?: (id: string) => void;
}

export function SubscriptionCard({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) {
  const cfg = tierConfig[subscription.type];

  const stats = [
    { icon: FolderOpen, label: "Max Folders", value: subscription.maxFolder },
    { icon: Layers, label: "Nest Levels", value: subscription.nestFolderLevel },
    {
      icon: FileText,
      label: "Files/Folder",
      value: subscription.filePerFolder,
    },
    {
      icon: HardDrive,
      label: "File Size",
      value: formatBytes(subscription.fileSize),
    },
    { icon: FileText, label: "Total Files", value: subscription.totalFiles },
  ];

  return (
    <Card
      className={`relative overflow-hidden ring-1 ${cfg.ring} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className={`h-1.5 w-full ${cfg.topBar}`} />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-black tracking-wider ${cfg.badge}`}
            >
              {cfg.icon}
            </div>
            <div>
              <p className="text-base font-bold text-foreground">{cfg.label}</p>
              <p className="text-[11px] text-muted-foreground">
                Created{" "}
                {new Date(subscription.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => onEdit?.(subscription)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete {cfg.label} package?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove the {cfg.label} subscription.
                    Users on this plan will be affected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete?.(subscription.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
            >
              <Icon className={`h-3.5 w-3.5 shrink-0 ${cfg.accent}`} />
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground truncate">
                  {label}
                </p>
                <p className="text-sm font-semibold text-foreground leading-none mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Allowed Types
          </p>
          <div className="flex flex-wrap gap-1.5">
            {subscription.allowedFileTypes.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="text-[11px] px-2 py-0.5"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3 pb-3">
        <p className="text-[11px] text-muted-foreground">
          Last updated{" "}
          {new Date(subscription.updatedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
}
