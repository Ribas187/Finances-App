import { withAuth } from "@/lib/auth/session";
import {
  CategoryExpense,
  CreateCategoryExpenseDto,
} from "@/lib/models/category";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async ({ params }): Promise<NextResponse<CategoryExpense[]>> => {
    const { categoryId } = params;

    const expenses = await prisma.categoryExpense.findMany({
      where: {
        categoryId,
      },
    });

    return NextResponse.json(expenses);
  },
);

export const POST = withAuth(
  async ({ req }): Promise<NextResponse<CategoryExpense>> => {
    const body = (await req.json()) as CreateCategoryExpenseDto;

    const category = await prisma.categoryExpense.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(category);
  },
);

export const DELETE = withAuth(
  async ({ req }): Promise<NextResponse<CategoryExpense>> => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const category = await prisma.categoryExpense.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(category);
  },
);
