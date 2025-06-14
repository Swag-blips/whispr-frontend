import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();
  url.pathname = "/auth";

  if (!accessToken) {
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(
      accessToken as string,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", "/login"],
};
