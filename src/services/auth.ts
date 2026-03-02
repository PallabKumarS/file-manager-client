"use server";

import { cookies } from "next/headers";

export const getToken = async (tokenName: "accessToken" | "refreshToken") => {
  const accessToken = (await cookies()).get(tokenName)?.value;
  return accessToken;
};

export const saveToken = async (
  tokenName: "accessToken" | "refreshToken",
  token: string,
) => {
  (await cookies()).set(tokenName, token);
};

export const removeToken = async (
  tokenName: "accessToken" | "refreshToken",
) => {
  (await cookies()).delete(tokenName);
};
