import { withAuth } from "@/lib/auth/session";
import { Category, CreateCategoryDto } from "@/lib/models/category";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async ({ project }): Promise<NextResponse<Category[]>> => {
    const categoriesWithExpensesSum = await prisma.$queryRaw<Category[]>`
      SELECT c.id, c.name, c.budget, c.color, c."projectId", SUM(e.amount) as "expensesSum"
      FROM "Category" c
      LEFT JOIN "CategoryExpense" e ON c.id = e."categoryId"
      WHERE c."projectId" = ${project.id}
      GROUP BY c.id, c.name, c.budget, c.color, c."projectId"`;

    return NextResponse.json(categoriesWithExpensesSum);
  },
);

export const POST = withAuth(
  async ({ project, req }): Promise<NextResponse<Category>> => {
    const body = await req.json() as CreateCategoryDto;

    const category = await prisma.category.create({
      data: {
        ...body,
        projectId: project.id,
      },
    });

    return NextResponse.json(category);
  },
);
