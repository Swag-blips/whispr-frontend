import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();
  url.pathname = "/auth";

  if (!accessToken) {
    return NextResponse.redirect(url);
  }

  try {
    const tokenVerified = await jwtVerify(
      accessToken as string,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    console.log(tokenVerified);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", "/login"],
};
