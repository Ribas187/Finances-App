import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function AppMiddleware(req: NextRequest) {
  
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as {
    email?: string;
    user?: {
      id: string;
    };
  };
  
  if (!session?.email && !isPublic(req)) {
    return NextResponse.redirect(
      new URL(
        '/sign-in',
        req.url
      )
    )
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${req.nextUrl.pathname}${searchParamsString}`;

  return NextResponse.rewrite(new URL(`/app${fullPath}`, req.url))
}

function isPublic(req: NextRequest) {
  return ['/sign-in'].includes(req.nextUrl.pathname)
}
