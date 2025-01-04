import { Project } from "@/lib/models";
import { Divider, Progress } from "@turbostack/ui";

export function ProjectUsage({ project }: { project?: Project }) {
  const usersOnProject = project?.users?.length ?? 0;
  const usersLimit = project?.usersLimit ?? 0;

  return (
    <div>
      <div className="border-t">
        <div className="grid grid-cols-2">
          <div className="flex flex-col p-6">
            <h3 className="font-semibold text-xl">Seats</h3>
            <p className="font-semibold mt-4 flex items-center text-2xl space-x-2">
              <span>{usersOnProject}</span>
              <Divider className="text-muted-foreground w-8 h-8" />
              <span className="text-muted-foreground">{usersLimit}</span>
            </p>
          </div>
          <div className="flex flex-col border-l p-6">
            <h3 className="font-semibold text-xl">Another Limit</h3>
            <p className="font-semibold mt-4 flex items-center text-2xl space-x-2">
              <span>5</span>
              <Divider className="text-muted-foreground w-8 h-8" />
              <span className="text-muted-foreground">10</span>
            </p>
          </div>

          <div className="flex flex-col border-t p-6 col-span-2 gap-2">
            <h3 className="font-semibold text-xl">A progress Limit</h3>
            <p className="text-sm text-muted-foreground">
              1 / 10 ({((1 / 10) * 100).toFixed(1)} %)
            </p>
            <Progress className="max-w-xl mt-3" value={10} />
          </div>
        </div>
      </div>
    </div>
  )
}