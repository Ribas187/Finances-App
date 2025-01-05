"use client";

import { AddCategory } from "@/components/categories/add-category";
import { CategoriesList } from "@/components/categories/categories-list";

export function ProjectCategoriesPageClient() {
  return (
    <>
      <AddCategory />
      <div className="mt-6" />
      <CategoriesList />
    </>
  );
}
