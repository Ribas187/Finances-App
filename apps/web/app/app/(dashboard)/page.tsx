import { getUserDefaultProject } from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function Page() {
  const defaultProject = await getUserDefaultProject();

  if (defaultProject)
    redirect(`/${defaultProject}`);

  return redirect('/sign-in')
}
