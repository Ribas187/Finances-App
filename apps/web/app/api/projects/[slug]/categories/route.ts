import { withAuth } from "@/lib/auth/session";
import { Category } from "@/lib/models/category";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async ({ project }): Promise<NextResponse<Category[]>> => {
    const categories = await prisma.category.findMany({
      where: {
        projectId: project.id,
      },
      select: {
        id: true,
        budget: true,
        color: true,
        name: true,
        projectId: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const categoriesWithExpensesSum = await prisma.$queryRaw<Category[]>`
      SELECT c.id, c.name, c.budget, c.color, c.projectId, SUM(e.amount) as expensesSum
      FROM Category c
      LEFT JOIN CategoryExpense e ON c.id = e.categoryId`;

    console.log(categoriesWithExpensesSum);

    return NextResponse.json(categories);
  },
);

export const POST = withAuth(
  async ({ project, req }): Promise<NextResponse<Category>> => {
    const body = await req.json();

    const category = await prisma.category.create({
      data: {
        ...body,
        projectId: project.id,
      },
    });

    return NextResponse.json(category);
  },
);
