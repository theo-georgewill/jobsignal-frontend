import { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobs';

export function useJobs(search?: string, role?: string, page = 1 ) {
  const [jobs, setJobs] = useState<any[]>([]);
  
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchJobs({ search, role, page })
      .then((res) => {
        const normalizedJobs = res.data.map((job: any) => ({
          id: job.id,
          title: job.title,
          company:
            typeof job.company === 'string'
              ? job.company
              : job.company?.name || 'Unknown',
          location: job.location,
          url: job.url,
          tags: job.tags || [],
        }));

        setJobs(normalizedJobs);
        setMeta(res.meta);
      })
      .finally(() => setLoading(false));
  }, [search, role, page]);

  return { jobs, meta, loading };
}