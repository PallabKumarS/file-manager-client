"use server";
import { FieldValues } from "react-hook-form";
import { getValidToken } from "./utils";
import { updateTag } from "next/cache";

export const getAllSubscriptions = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/subscriptions`, {
      next: {
        tags: ["subscriptions"],
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

export const getSingleSubscription = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/subscriptions/${id}`, {
      next: {
        tags: ["subscription"],
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

export const createSubscription = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/subscriptions`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("subscriptions");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const updateSubscription = async (id: string, data: any) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/subscriptions/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    updateTag("subscriptions");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};

export const deleteSubscription = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/subscriptions/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    updateTag("subscriptions");

    const resData = await res.json();

    return resData;
  } catch (error: any) {
    return error;
  }
};
