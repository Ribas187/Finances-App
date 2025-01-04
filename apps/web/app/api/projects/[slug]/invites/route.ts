import { withAuth } from "@/lib/auth/session";
import { sendEmail } from "@/lib/emails";
import { hash } from "@/lib/hash";
import prisma from '@/lib/prisma'
import { ProjectInviteEmail } from "@turbostack/emails";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

export const GET = withAuth(async ({ project }) => {
  const invites = await prisma.projectInvite.findMany({
    where: { projectId: project.id },
    select: { email: true, createdAt: true }
  })

  return NextResponse.json(invites)
});

export const POST = withAuth(async ({ project, req, session }) => {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + ONE_WEEK_IN_SECONDS * 1000);

  const { email } = await req.json();
  const [existingUserInTeam, userCount, inviteCount] = await Promise.all([
    prisma.projectUsers.findFirst({
      where: {
        projectId: project.id,
        user: {
          email
        }
      }
    }),
    prisma.projectUsers.count({
      where: {
        projectId: project.id
      }
    }),
    prisma.projectInvite.count({
      where: {
        projectId: project.id
      }
    })
  ]);

  if (existingUserInTeam) {
    return new Response('User already exists', {
      status: 400
    })
  }

  if (userCount + inviteCount >= project.usersLimit) {
    return new Response(`You can't invite more teammates`,  {
      status: 400
    })
  }

  // create invite
  // send email with the code
  await prisma.projectInvite.create({
    data: {
      email,
      expiresAt,
      projectId: project.id
    }
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hash(token, process.env.NEXTAUTH_SECRET),
      expires: expiresAt
    }
  })

  const params = new URLSearchParams({
    callbackUrl: `${process.env.NEXTAUTH_URL}/${project.slug}`,
    email,
    token,
  });

  const url = `${process.env.NEXTAUTH_URL}/api/auth/callback/email?${params}`;

  await sendEmail({
    subject: `You've been invited to a project on TurboStack.io`,
    to: email,
    react: ProjectInviteEmail({
      invitedByUsername: session.user?.name,
      invitedByEmail: session.user?.email,
      inviteLink: url,
      projectName: project.name,
    })
  })

  return NextResponse.json({ message: 'Invite sent successfully' })
}, {
  requiredRole: ['owner']
})