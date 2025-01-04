import { getServerSession } from "next-auth/next";
import { authOptions } from "./options";
import prisma from '@/lib/prisma';
import { Project } from '@/lib/models/project';

type Session = {
  user: {
    email: string;
    name: string;
    image: string;
    id?: string;
  }
}

export async function getSession() {
  return getServerSession(authOptions) as Promise<Session>
}

interface WithAuthHandler {
  ({
    req,
    params,
    searchParams,
    headers,
    session,
    project
  }: {
    req: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
    headers?: Record<string, string>;
    session: Session;
    project: Project;
  }): Promise<Response>;
}

export const withAuth =
  (handler: WithAuthHandler, { requiredRole }: {
    requiredRole?: Array<'owner' | 'member'>;
  } = {}) =>
    async (
      req: Request,
      { params }: { params: Record<string, string> }
    ) => {
      const searchParams = getSearchParams(req.url);
      const session = await getSession();
      const headers = {}

      if (!session) {
        return new Response("Unauthorized", {
          status: 401,
        });
      }

      const slug = params?.slug || searchParams.projectSlug;
      const project = slug ? (await prisma.project.findUnique({
        where: { slug },
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
          plan: true,
          usersLimit: true,
          users: {
            select: {
              id: true,
              role: true
            },
            where: {
              userId: session.user.id,
            }
          },
        }
      })) : null

      if (slug) {
        if (!project) {
          return new Response("Project not found.", {
            status: 404,
            headers,
          });
        }

        if (project.users.length === 0) {
          const pendingInvites = await prisma.projectInvite.findUnique({
            where: {
              email_projectId: {
                email: session.user.email,
                projectId: project.id,
              },
            },
            select: {
              expiresAt: true,
            },
          });

          if (!pendingInvites) {
            return new Response("Project not found.", {
              status: 404,
              headers,
            });
          } else if (pendingInvites.expiresAt < new Date()) {
            return new Response("Project invite expired.", {
              status: 410,
              headers,
            });
          } else {
            return new Response("Project invite pending.", {
              status: 409,
              headers,
            });
          }
        }

        if (requiredRole && !requiredRole.includes(project.users[0].role as any)) {
          return new Response("Unauthorized: Insufficient permissions.", {
            status: 403,
            headers,
          });
        }
      }

      return handler({
        req,
        params: params ?? {},
        searchParams,
        headers,
        session,
        project: project!
      })
    }

function getSearchParams(url: string) {
  const params = {} as Record<string, string>;

  new URL(url).searchParams.forEach((key, value) => {
    params[key] = value;
  });

  return params;
}

interface WithSessionHandler {
  ({
    req,
    params,
    searchParams,
    session,
  }: {
    req: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
    session: Session;
  }): Promise<Response>;
}

export const withSession =
  (handler: WithSessionHandler) =>
  async (req: Request, { params }: { params: Record<string, string> }) => {
    const session = await getSession();
    if (!session?.user.id) {
      return new Response("Unauthorized: Login required.", { status: 401 });
    }

    const searchParams = getSearchParams(req.url);
    return handler({ req, params, searchParams, session });
  };