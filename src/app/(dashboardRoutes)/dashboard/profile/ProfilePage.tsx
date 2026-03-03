"use client";

import { use, useState } from "react";
import { FolderOpen, FileText, Shield, Pencil, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { User as UserType } from "@/types";
import { PackageType, Role } from "@/types/enums";
import { toast } from "sonner";
import { updateUser } from "@/services/UserService";

function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${(bytes / 1e3).toFixed(1)} KB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const pkgVariants: Record<string, { badge: string; dot: string }> = {
  [PackageType.FREE]: {
    badge: "bg-slate-100 text-slate-700",
    dot: "bg-slate-400",
  },
  [PackageType.SILVER]: {
    badge: "bg-indigo-50 text-indigo-700",
    dot: "bg-indigo-500",
  },
  [PackageType.GOLD]: {
    badge: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  [PackageType.DIAMOND]: {
    badge: "bg-pink-50 text-pink-700",
    dot: "bg-pink-500",
  },
};

interface ProfilePageProps {
  getMePromise: Promise<{ data: UserType }>;
}

//  Component
export function ProfilePage({ getMePromise }: ProfilePageProps) {
  const user = use(getMePromise)?.data || null;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const pkg = pkgVariants[user?.subscription?.type ?? PackageType.FREE];
  const initials = getInitials(name);

  async function handleSave() {
    const toastId = toast.loading("Saving changes...");

    try {
      const res = await updateUser(user.id, name);

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
        setEditing(false);
      } else {
        toast.error(
          res.message || "Failed to update profile. Please try again.",
          {
            id: toastId,
          },
        );
      }
      // biome-ignore lint/suspicious/noExplicitAny: <>
    } catch (error: any) {
      toast.error(
        error.message || "Failed to update profile. Please try again.",
        {
          id: toastId,
        },
      );
    }
  }

  function handleDiscard() {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setEditing(false);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/*  Hero banner  */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 text-white shadow-xl">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold tracking-tight backdrop-blur-sm ring-2 ring-white/30">
              {initials}
            </div>
            <span
              className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full ring-2 ring-indigo-700 ${pkg.dot}`}
            />
          </div>

          {/* Name / badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{name}</h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${pkg.badge}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${pkg.dot}`} />
                {user?.subscription?.type ?? "FREE"}
              </span>

              {user?.role === Role.ADMIN && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/90 px-3 py-0.5 text-xs font-semibold text-amber-900">
                  <Shield className="h-3 w-3" />
                  Admin
                </span>
              )}
            </div>
            <p className="mt-1 text-indigo-200 text-sm">{email}</p>
            <p className="mt-0.5 text-indigo-300 text-xs">
              Member since {formatDate(user?.createdAt)}
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setEditing(!editing)}
            className="shrink-0 bg-white/15 text-white border-0 hover:bg-white/25 backdrop-blur-sm"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            {editing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {/*  Inline edit form  */}
      {editing && (
        <Card className="border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Edit Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled
                  readOnly
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Check className="h-3.5 w-3.5 mr-1.5" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleDiscard}>
                <X className="h-3.5 w-3.5 mr-1.5" />
                Discard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/*  Stats grid  */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Total Files",
            value: user?.totalFiles,
            icon: FileText,
            color: "text-indigo-600 bg-indigo-50",
          },
          {
            label: "Total Folders",
            value: user?.totalFolders,
            icon: FolderOpen,
            color: "text-violet-600 bg-violet-50",
          },
          {
            label: "Max Folders",
            value: user?.subscription?.maxFolder ?? "—",
            icon: FolderOpen,
            color: "text-sky-600 bg-sky-50",
          },
          {
            label: "Max File Size",
            value: formatBytes(user?.subscription?.fileSize ?? 0),
            icon: FileText,
            color: "text-emerald-600 bg-emerald-50",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-slate-100 shadow-sm">
            <CardContent className="p-4">
              <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-2xl font-bold text-slate-800 leading-none">
                {value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/*  Active subscription  */}
      {user?.subscription && (
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Active Subscription
              </CardTitle>
              <Badge
                variant="outline"
                className={`text-xs font-bold ${pkg.badge} border-0`}
              >
                {user?.subscription?.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Folder Nesting Levels", user?.subscription?.nestFolderLevel],
                ["Files per Folder", user?.subscription?.filePerFolder],
                ["Total Files Allowed", user?.subscription?.totalFiles],
                ["Max File Size", formatBytes(user?.subscription?.fileSize)],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-2">Allowed File Types</p>
              <div className="flex flex-wrap gap-2">
                {user.subscription.allowedFileTypes.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/*  Account info  */}
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Account Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-0">
            {[
              ["User ID", user?.id],
              ["Created", formatDate(user?.createdAt)],
              [
                "Last Updated",
                user?.updatedAt ? formatDate(user?.updatedAt) : "—",
              ],
              ["Status", user?.isDeleted ? "Deactivated" : "Active"],
            ].map(([key, val], i, arr) => (
              <div key={key as string}>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-500">{key}</dt>
                  <dd
                    className={`text-sm font-medium ${
                      key === "Status"
                        ? user?.isDeleted
                          ? "text-red-500"
                          : "text-emerald-600"
                        : "text-slate-700"
                    }`}
                  >
                    {val}
                  </dd>
                </div>
                {i < arr.length - 1 && <Separator />}
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
