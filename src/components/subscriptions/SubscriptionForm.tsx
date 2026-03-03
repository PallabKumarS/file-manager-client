"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Subscription } from "@/types";
import { useAuth } from "@/provider/AuthContext";
import { FileType, PackageType } from "@/types/enums";
import {
  createSubscription,
  updateSubscription,
} from "@/services/SubscriptionService";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  type: z.enum(Object.values(PackageType) as [string, ...string[]]),

  maxFolder: z.number().min(1, "Must allow at least 1 folder"),
  nestFolderLevel: z
    .number()
    .min(1, "Must allow at least 1 nested folder level"),
  filePerFolder: z.number().min(1, "Must allow at least 1 file per folder"),

  fileSize: z.number().min(1, "Must allow at least 1 file size"),
  totalFiles: z.number().min(1, "Must allow at least 1 total file"),
  allowedFileTypes: z
    .array(z.enum(Object.values(FileType) as [string, ...string[]]))
    .min(1, "Must allow at least 1 file type"),
});

export default function SubscriptionForm({
  edit = false,
  subscription,
  onSuccess,
}: {
  edit?: boolean;
  subscription?: Subscription;
  onSuccess?: () => void;
}) {
  const { user } = useAuth();

  // loading states
  const [isSizeLoading, setIsSizeLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // main data states

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: subscription?.type || (PackageType.FREE as PackageType),
      maxFolder: subscription?.maxFolder || 5,
      nestFolderLevel: subscription?.nestFolderLevel || 2,
      filePerFolder: subscription?.filePerFolder || 10,
      fileSize: subscription?.fileSize || 5 * 1024 * 1024,
      totalFiles: subscription?.totalFiles || 50,
      allowedFileTypes: subscription?.allowedFileTypes || [
        FileType.PDF,
        FileType.IMAGE,
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const toastId = toast.loading("Saving subscription...");

    try {
      const res = edit
        ? await updateSubscription(subscription?.id as string, values)
        : await createSubscription(values);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        onSuccess?.();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        {/* Quantity */}
        <FormField
          control={form.control}
          name="filePerFolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Per Folder</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fileSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Size (MB)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxFolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Folder</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : edit ? (
            "Update Stock"
          ) : (
            "Add Stock"
          )}
        </Button>
      </form>
    </Form>
  );
}
