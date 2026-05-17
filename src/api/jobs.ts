import { apiClient } from './client';

export type ApiJob = {
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

export type FetchJobsResponse = {
  data: ApiJob[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function fetchJobs(params?: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}): Promise<FetchJobsResponse> {
  const res =
    await apiClient.get<FetchJobsResponse>(
      '/jobs',
      {
        params,
      }
    );

  return res.data;
}