import { withAuth } from "@/lib/auth/session";
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = withAuth(async ({ project }) => {
  const users = await prisma.projectUsers.findMany({
    where: { 
      projectId: project.id
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      createdAt: true,
    }
  })

  return NextResponse.json(users.map(user => ({
    ...user.user,
    role: user.role
  })))
})