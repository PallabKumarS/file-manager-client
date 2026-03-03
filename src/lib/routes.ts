import { Role } from "@/types/enums";
import {
  User,
  CreditCard,
  FolderOpen,
  Clock,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const userNavItems: NavItem[] = [
  { id: "profile", label: "Profile", href: "/dashboard/profile", icon: User },
  {
    id: "subscriptions",
    label: "Subscriptions",
    href: "/dashboard/subscriptions",
    icon: CreditCard,
  },
  {
    id: "file-manager",
    label: "File Manager",
    href: "/dashboard/file-manager",
    icon: FolderOpen,
  },
  {
    id: "subscription-history",
    label: "Subscription History",
    href: "/dashboard/subscription-history",
    icon: Clock,
  },
];

export const adminNavItems: NavItem[] = [
  { id: "profile", label: "Profile", href: "/dashboard/profile", icon: User },
  {
    id: "packages",
    label: "Packages",
    href: "/dashboard/packages",
    icon: CreditCard,
  },
  { id: "users", label: "Users", href: "/dashboard/users", icon: Users },
];

export function getNavItems(role: Role): NavItem[] {
  return role === Role.ADMIN ? adminNavItems : userNavItems;
}
