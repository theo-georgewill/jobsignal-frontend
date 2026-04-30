import { useState } from "react";
import { useJobs } from "src/hooks/useJobs";
import JobCards from "src/components/dashboard/JobCards";
import JobPagination from "src/components/jobs/JobPagination";

const JobsPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  const { jobs, loading, meta } = useJobs(search, role, page);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Job Board</h1>

      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All</option>
          <option value="law">Law</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <JobCards jobs={jobs} />
          <JobPagination
            page={page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
   
        </>
      )}
    </div>
  );
};

export default JobsPage;