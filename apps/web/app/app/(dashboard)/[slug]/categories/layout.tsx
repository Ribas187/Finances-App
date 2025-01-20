import React from "react";

export default function ProjectCategoriesLayout({
  children,
}: {
  params: { slug: string };
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Categorias</h1>
        <p className="text-muted-foreground mt-2">Suas categorias de gastos</p>
        <div className="my-6">{children}</div>
      </div>
    </>
  );
}
