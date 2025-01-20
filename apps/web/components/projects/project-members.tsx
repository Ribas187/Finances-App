import { useProjectMembers } from "@/lib/queries/use-project-members";
import { Avatar, Badge, Card, CardContent, CardHeader, CardTitle } from "@turbostack/ui";
import { MoreVertical } from "lucide-react";
import { ProjectMembersPlaceholder } from "./project-members-placeholder";
import { useSession } from "next-auth/react";

export function ProjectMembers() {
  const { members, loading } = useProjectMembers();
  const { data: session } = useSession();

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Membros</CardTitle>
      </CardHeader>
      <CardContent className="border-t">
        <div className="flex flex-col space-y-4 mt-5">
          {loading && <ProjectMembersPlaceholder />}
          {members?.map(member => (
            <div key={member.id} className="flex space-x-3">
              <Avatar fallback={member.email} image={member.image} />
              <div className="flex flex-col text-sm flex-1 max-w-full truncate">
                <p className="font-semibold text-foreground">{member.name ?? member.email}</p>
                <p className="text-muted-foreground">{member.email}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <Badge className="capitalize" variant="outline">{member.role}</Badge>
                {member.email !== session?.user?.email && <MoreVertical size={20} className="text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}