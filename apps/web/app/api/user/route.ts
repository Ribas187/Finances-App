import { withSession }from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { storage } from '@/lib/storage';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().min(1).max(64).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional()
})

export const GET = withSession(async ({ session }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  return NextResponse.json({
    ...user
  })
})

export const PATCH = withSession(async ({ session, req }) => {
  let { name, email, image } = await updateUserSchema.parseAsync(await req.json());
  try {
    if (image) {
      const { url } = await storage.upload(`avatars/${session.user.id}`, image);
      image = url;
    }
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(image && { image })
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    if (error.code === "P2002") {
      // return res.status(422).end("Email is already in use.");
      return NextResponse.json(
        {
          error: {
            code: "conflict",
            message: "Email is already in use.",
          },
        },
        { status: 422 },
      );
    }
    return NextResponse.json({ error }, { status: 500 });
  }
});

export const PUT = PATCH;