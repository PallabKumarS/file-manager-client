import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { accessToken, refreshToken } = body;

    const cookieStore = await cookies();

    const isProduction = process.env.NODE_ENV === "production";

    if (accessToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    if (refreshToken) {
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }

    return Response.json({
      success: true,
      message: "Success",
    });
    // biome-ignore lint/suspicious/noExplicitAny: <>
  } catch (error: any) {
    return Response.json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}
