import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  useDebounce,
} from '@turbostack/ui';

import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import slugify from 'slugify';
import { toast } from 'sonner';
import { mutate } from 'swr';

export function AddProjectModal() {
  const router = useRouter();
  const [slugError, setSlugError] = useState<string | null>(null);
  const [data, setData] = useState<{ name: string, slug: string }>({
    name: '',
    slug: ''
  })
  const { name, slug } = data;

  useEffect(() => {
    setSlugError(null);
    setData(prev => ({
      ...prev,
      slug: slugify(name, { lower: true, replacement: '-' })
    }))
  }, [name]);

  const debouncedSlug = useDebounce(slug, 500);

  useEffect(() => {
    if (!debouncedSlug.value || debouncedSlug.value.length === 0)
      return;

    fetch(`/api/projects/${debouncedSlug.value}/exists`).then(async res => {
      if (res.status === 200) {
        const { data: exists } = await res.json();
        setSlugError(exists ? 'Slug already exists' : null);
      }
    })
  }, [debouncedSlug])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (slugError) return;
    
    const { data: createdProject } = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        slug
      })
    }).then(res => res.json());

    mutate('/api/projects')
    toast('Successfully created project!')
    router.push(`/${createdProject.slug}`)
  }, [name, slug, slugError, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-0 bg-transparent text-foreground hover:bg-muted transition-all flex space-x-3 p-2 w-full justify-start items-center">
          <PlusCircle className="h-6 w-6 text-accent-foreground" />
          <p>Create new Project</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a new project</DialogTitle>
          <DialogDescription>
            Start a brand new project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              value={name}
              onChange={e => setData(prev => ({ ...prev, name: e.target.value }))} autoFocus placeholder="TurboStack"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Slug</Label>
            <Input
              value={slug}
              placeholder="turbo-stack"
              onChange={e => {
                setSlugError(null);
                setData(prev => ({ ...prev, slug: e.target.value }))
              }}
            />
          </div>
          {slugError && <span className="text-sm text-danger">{slugError}</span>}
          <Button disabled={!!slugError || !name}>Create project</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}