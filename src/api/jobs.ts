import { apiClient } from './client';

export async function fetchJobs(params?: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}) {
  const res = await apiClient.get('/jobs', {
    params,
  });

  return res.data;
}