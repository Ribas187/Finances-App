'use client'

import { InviteMemberToProject } from "@/components/projects/invite-member-to-project"
import { ProjectMembers } from "@/components/projects/project-members"

export function ProjectTeamClientPage() {
  return (
    <>
      <InviteMemberToProject />
      <ProjectMembers />
    </>
  )
}