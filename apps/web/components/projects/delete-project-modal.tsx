import { useCurrentProject } from "@/lib/queries/use-current-project";
import { Dialog, DialogTrigger, Button, DialogContent, Label, Input } from "@turbostack/ui";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, FormEvent } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export function DeleteProjectModal() {
  const { slug } = useParams() as { slug: string };
  const { project, isOwner } = useCurrentProject();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      await fetch(`/api/projects/${slug}`, {
        method: 'DELETE'
      }).then(async res => {
        if (!res.ok) {
          setLoading(false);
          const text = await res.text();
          return reject(text);
        }
        
        await mutate('/api/projects')
        router.push('/');
        resolve(null);
      })
    })

    toast.promise(promise, {
      loading: 'Deleting your project',
      success: 'Project deleted sucessfully',
      error: (err) => err
    })
    
  }, [slug, router])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger" className="w-32" disabled={!isOwner}>
          <p>Delete Project</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-border px-4 pt-4 pb-8 sm:px-16">
          <h3 className="text-lg font-medium">Delete Project {project?.name}</h3>
          <p className="text-center text-muted-foreground text-sm">
            Warning: this action cannot be undone.
            All your data, including team associations will be deleted.
          </p>
        </div>
        <form
          className="flex flex-col px-8 py-4 space-y-4 text-muted-foreground"
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="verification">
              To perform deletion, type <span className="font-semibold text-foreground">delete project {slug}</span> below
            </Label>
            <Input
              pattern={`delete project ${slug}`}
              id="verification"
              name="verification"
              required
              disabled={!isOwner}
            />
          </div>
          <Button variant="danger" loading={loading}>Delete Project Permanently</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}