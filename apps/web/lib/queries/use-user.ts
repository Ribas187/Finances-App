import { fetcher } from "@turbostack/utils";
import useSWRImmutable from "swr/immutable";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
}

export default function useUser() {
  const { data, isLoading } = useSWRImmutable<UserProps>("/api/user", fetcher);

  return {
    user: data,
    loading: isLoading,
  };
}
