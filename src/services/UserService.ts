/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
"use server";

import { updateTag } from "next/cache";
import { getValidToken } from "./utils";

export const createUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("users");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users/${id}`, {
      next: {
        tags: ["user"],
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

export const getMe = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users/me`, {
      next: {
        tags: ["me"],
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

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users`, {
      next: {
        tags: ["users"],
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

export const updateUser = async (id: string, data: any) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("users");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    updateTag("users");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};
