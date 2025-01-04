import React from "react";

export default function ProjectSettingsLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </>
  )
}