import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com"
    : "script-src 'self' 'unsafe-inline' https://js.stripe.com";
  res.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; img-src 'self' data: https://img.logo.dev; connect-src 'self' https://api.openai.com wss://api.openai.com https://api.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com; ${scriptSrc}; style-src 'self' 'unsafe-inline'; media-src 'self' blob:;`
  );
  res.headers.set("Permissions-Policy", "microphone=(self)");

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > 100_000) {
      return NextResponse.json({ error: "Body too large" }, { status: 413 });
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
