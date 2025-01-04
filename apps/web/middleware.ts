import { NextRequest, NextResponse } from "next/server";
import { AppMiddleware } from "./lib/middleware/app";

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)",
  ]
}

export default async function middleware(req: NextRequest) {
  const host = req.headers.get('host') as string;
  const domain = host.replace('www.', '');
  
  if (isApp(domain)) {
    return AppMiddleware(req); // used for authentication
  }

  return NextResponse.rewrite(new URL(`/home${req.nextUrl.pathname}`, req.url));
}

function isApp(domain: string) {
  return [`app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`, 'app.localhost'].some(appDomain => domain.includes(appDomain))
}
