import { FieldValues } from "react-hook-form";
import { getValidToken } from "./utils";
import { updateTag } from "next/cache";

export const createFile = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/files`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("files");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const deleteFile = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/files/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    updateTag("files");

    const resData = await res.json();
    return resData;
  } catch (error: any) {
    return error;
  }
};

export const updateFile = async (id: string, data: any) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/files/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("files");

    const resData = await res.json();
    return resData;
  } catch (error: any) {
    return error;
  }
};

export const getAllFiles = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/files`, {
      next: {
        tags: ["files"],
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
