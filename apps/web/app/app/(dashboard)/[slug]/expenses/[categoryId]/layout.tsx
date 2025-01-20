import React from "react";

export default function CategoryExpensesLayout({
  children,
}: {
  params: { slug: string };
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col pb-6">
        <h1 className="text-3xl font-bold">Despesas</h1>
        {children}
      </div>
    </>
  );
}
