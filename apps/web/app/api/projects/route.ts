import { withAuth } from "@/lib/auth/session";
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = withAuth(async ({ session, headers }) => {
  return prisma.project.findMany({
    where: {
      users: {
        some: {
          userId: session.user.id
        }
      }
    }
  }).then(projects => NextResponse.json(projects, headers))
});

export const POST = withAuth(async ({ req, session }) => {
  const { name, slug } = await req.json();

  const existingProject = await prisma.project.findUnique({
    where: { slug }
  })

  if (existingProject) {
    return NextResponse.json({ message: 'Project already exists' }, { status: 404 })
  }

  const createdProject = await prisma.project.create({
    data: {
      name,
      slug,
      users: {
        create: {
          userId: session.user.id!!,
          role: 'owner'
        }
      }
    },
  });

  return NextResponse.json({ data: createdProject }, { 
    status: 201
  })
})