import { NextAuthOptions, Profile, User } from "next-auth";
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { MagicLink, WelcomeEmail } from '@turbostack/emails';

import prisma from '@/lib/prisma';
import { addUserToNewsletter, sendEmail } from '@/lib/emails';
import { AdapterUser } from "next-auth/adapters";
import { generateSlug } from "random-word-slugs";
import { isDevelopment } from "../environment";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
const GOOGLE_PROVIDER = 'google';

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      sendVerificationRequest({ identifier, url }) {
        if (isDevelopment()) {
          console.log('Magic Link: ', url);
          return;
        }
        sendEmail({
          to: identifier,
          subject: 'Seu link para login',
          react: MagicLink({ url, email: identifier })
        })
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}` : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    }
  },
  pages: {
    error: "/sign-in",
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider == GOOGLE_PROVIDER) {
        await doSignInWithGoogle(user, profile)
      }

      return true;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.user = user;
      }

      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }

      return token;
    },
  },
  events: {
    signIn: async (message) => {
      if (message.isNewUser && !isDevelopment()) {
        // Send an welcome email and save the user in the newsletter
        const [firstName, lastName] = message.user.name?.split(' ') ?? ['', ''];
        await Promise.allSettled([
          // addUserToNewsletter({
          //   firstName,
          //   lastName,
          //   email: message.user.email!!
          // }),
          sendEmail({
            to: message.user.email!,
            subject: 'Bem vindo ao Finances App',
            react: WelcomeEmail({ name: message.user.name! })
          })
        ])
      }
    },
    createUser: async ({ user }) => {
      let projectSlug: string | undefined = undefined;

      while (!projectSlug) {
        projectSlug = generateSlug(2)
        const existingProject = await prisma.project.findFirst({ where: { slug: projectSlug } })

        if (existingProject) {
          projectSlug = undefined;
        }
      }

      await prisma.project.create({
        data: {
          name: 'Finanças de ' + user.name,
          slug: projectSlug,
          default: true,
          users: {
            create: [{
              role: 'owner',
              userId: user.id
            }]
          }
        }
      })
    }
  }
}

async function doSignInWithGoogle(
  user: User | AdapterUser,
  profile: Profile | undefined
) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { name: true }
  })

  if (existingUser && existingUser.name !== user.name) {
    await prisma.user.update({
      where: { email: user.email! },
      data: {
        name: profile?.name,
        image: profile?.image
      }
    })
  }
}
