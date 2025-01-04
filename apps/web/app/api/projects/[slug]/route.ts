import { withAuth } from "@/lib/auth/session";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export const GET = withAuth(async ({ project }) => {
  return NextResponse.json(project);
});

export const PUT = withAuth(async ({ project, req }) => {
  const { name, budget } = await req.json();

  try {
    const response = await prisma.project.update({
      where: {
        slug: project.slug
      },
      data: {
        ...(name && { name }),
        ...(budget && { budget: Number(budget) })
      }
    })

    return NextResponse.json(response)
  } catch (error) {
    return new Response(error.message, {
      status: 500
    })
  }
}, { requiredRole: ['owner'] })

export const DELETE = withAuth(async ({ project }) => {
  // TODO: perform deletion of all data of a given project_id.

  await prisma.project.delete({
    where: {
      id: project.id
    }
  })

  return new Response(null, { status: 204 })
}, { requiredRole: ['owner'] })