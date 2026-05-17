export type Job = {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
  };
  location?: string;
  remote?: boolean;
  url: string;
  source?: string;
  description?: string;
  employmentType?: string;
  workMode?: 'remote' | 'hybrid' | 'onsite';
  createdAt?: string;
  tags?: string[];
};