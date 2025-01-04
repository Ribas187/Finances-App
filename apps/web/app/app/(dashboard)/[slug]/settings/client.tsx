'use client'

import { DeleteProject } from "@/components/projects/delete-project"
import { ProjectSettingsForm } from "@/components/projects/settings"

export function ProjectSettingsPageClient() {
  return (
    <>
      <ProjectSettingsForm />
      <DeleteProject />
    </>
  )
}