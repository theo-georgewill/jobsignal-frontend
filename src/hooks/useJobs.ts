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
        setJobs(res.data);
        setMeta(res.meta)
      })
      .finally(() => setLoading(false));
  }, [search, role, page]);

  return { jobs, meta, loading };
}