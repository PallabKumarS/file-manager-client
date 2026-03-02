"use server";

import { FieldValues } from "react-hook-form";
import { getValidToken } from "./utils";
import { updateTag } from "next/cache";

export const createFolder = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/folders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("folders");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const getAllFolders = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/folders`, {
      next: {
        tags: ["folders"],
      },
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });
    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const deleteFolder = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/folders/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    updateTag("folders");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const updateFolder = async (id: string, data: any) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/folders/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("folders");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};
