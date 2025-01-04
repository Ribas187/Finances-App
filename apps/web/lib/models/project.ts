export type ProjectUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'owner' | 'member';
}

export type Project = { 
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  usersLimit: number;
  plan: string;
  budget: number;
  users: {
    id: string;
    role: string;
  }[];
  externalReferenceId?: string;
}