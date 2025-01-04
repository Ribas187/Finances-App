'use client';

import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@turbostack/ui";

import { Check, ChevronsUpDown, } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useProjects } from "@/lib/queries/use-projects";
import Link from "next/link";
import { AddProjectModal } from "@/components/projects/add-project-modal";
import { BlurImage } from '@turbostack/ui';
import { ProjectSelectPlaceholder } from "./project-select-placeholder";

const INITIALS_DICEBEAR_URL = `https://api.dicebear.com/9.x/initials/svg?fontSize=40&seed=`

export function ProjectSelect() {
  const { projects, loading } = useProjects();
  const { slug } = useParams() as { slug: string };

  const selected = useMemo(() => {
    return projects?.find(project => project.slug === slug);
  }, [projects]);

  if (!projects || loading) {
    return <ProjectSelectPlaceholder />
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          <div className="flex space-x-3 w-full items-center">
            <BlurImage
              width={20}
              height={20}
              alt={selected!.name}
              src={selected!.logo || `${INITIALS_DICEBEAR_URL}${selected!.name}`}
              className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
            />
            <p className="flex-1 text-start">{selected!.name}</p>
            <ChevronsUpDown
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        {projects?.map(project => (
          <Link href={`/${project.slug}`} key={project.id} className="flex space-x-3 w-full p-2 rounded items-center bg-background text-foreground hover:bg-muted hover:text-accent-foreground transition-all">
            <BlurImage
              width={20}
              height={20}
              alt={project!.name}
              src={project!.logo || `${INITIALS_DICEBEAR_URL}${project!.name}`}
              className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
            />
            <p className="flex-1 text-start">{project?.name}</p>
            {selected?.id === project.id && <Check className="h-4 w-4" />}
          </Link>
        ))}
        <AddProjectModal />
      </PopoverContent>
    </Popover>
  )
}