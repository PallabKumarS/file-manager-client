"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getToken = async (tokenName: "accessToken" | "refreshToken") => {
  const accessToken = (await cookies()).get(tokenName)?.value;
  return accessToken;
};

export const setToken = async (
  tokenName: "accessToken" | "refreshToken",
  token: string,
) => {
  (await cookies()).set(tokenName, token);
};

export const setCookies = async (accessToken: string, refreshToken: string) => {
  await setToken("accessToken", accessToken);
  await setToken("refreshToken", refreshToken);
};

export const removeToken = async (
  tokenName: "accessToken" | "refreshToken",
) => {
  (await cookies()).delete(tokenName);
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")?.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;
    await setToken("accessToken", token as string);
  }

  return (token as string) || "";
};

const getNewToken = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("refreshToken")!.value,
      },
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = await getValidToken();
  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    return decodedData;
  } else {
    return null;
  }
};
