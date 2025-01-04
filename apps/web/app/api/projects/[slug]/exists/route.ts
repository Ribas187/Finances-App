import { withSession } from "@/lib/auth/session";
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = withSession(async ({ params }) => {
  const { slug } = params;

  return prisma.project.findUnique({
    where: { slug },
    select: { slug: true }
  }).then(res => NextResponse.json({ data: !!res }))
});