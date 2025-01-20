import { getUserDefaultProject } from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function Page() {
  const defaultProject = await getUserDefaultProject();

  if (defaultProject)
    redirect(`/${defaultProject}/categories`);

  return redirect('/sign-in')
}
