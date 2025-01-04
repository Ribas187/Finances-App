import { getSession } from "./auth/session";
import prisma from './prisma'

export async function getUserDefaultProject() {
  const session = await getSession();
  return prisma.project.findFirst({
    where: {
      default: true,
      users: {
        some: {
          userId: session?.user?.id
        }
      }
    },
    select: {
      slug: true
    }
  }).then(project => project?.slug)
}