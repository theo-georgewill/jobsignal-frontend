const BASE_URL = 'http://localhost:3000';

export async function fetchJobs(params?: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number; 
}) {
  const query = new URLSearchParams();

  if (params?.search) query.append('search', params.search);
  if (params?.role) query.append('role', params.role);
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));

  const res = await fetch(`${BASE_URL}/jobs?${query.toString()}`);

  if (!res.ok) throw new Error('Failed to fetch jobs');

  return res.json();
}