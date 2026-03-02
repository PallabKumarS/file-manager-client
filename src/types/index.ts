import type { FileType, PackageType, Role } from "./enums";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  subscriptionId: string;

  totalFolders: number;
  totalFiles: number;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string | null;
}

export interface Folder {
  id: string;
  name: string;

  userId: string;
  parentId: string | null;
  nestLevel: number;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: string;
  name: string;
  url: string;
  size: number;
  type: FileType;

  userId: string;
  folderId: string;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  type: PackageType;

  maxFolder: number;
  nestFolderLevel: number;
  filePerFolder: number;

  fileSize: number;
  totalFiles: number;
  allowedFileTypes: FileType[];

  createdAt: string;
  updatedAt: string;
}

export interface UserWithSubscription extends User {
  subscription: Subscription;
}

export interface FolderTree extends Folder {
  children: FolderTree[];
  files: File[];
}
