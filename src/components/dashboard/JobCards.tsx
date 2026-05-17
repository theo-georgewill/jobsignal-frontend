import { Badge } from "flowbite-react";
import { ApiJob } from "src/api/jobs";
type Props = {
  jobs: ApiJob[];
};

const JobCards = ({ jobs }: Props) => {
  if (!jobs.length) {
    return (
      <p className="mt-10 text-center text-gray-500">
        No jobs found
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <a
          key={job.id}
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-darkgray">
            
            <div className="flex gap-5">
              
              {/* Logo */}
              <div className="hidden h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-gray-100 md:flex items-center justify-center">
                {job.company.logoUrl ? (
                  <img
                    src={job.company.logoUrl}
                    alt={job.company.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-500">
                    {job.company.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                
                {/* Top Row */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  
                  <div>
                    {/* Title */}
                    <h2 className="text-2xl font-semibold leading-tight text-gray-900 transition-colors group-hover:text-primary dark:text-white">
                      {job.title}
                    </h2>

                    {/* Company */}
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                      {job.company.name}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>{job.location || "Remote"}</span>

                      {job.employmentType && (
                        <span>{job.employmentType}</span>
                      )}

                      {job.source && (
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          Source: {job.source}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  {job.createdAt && (
                    <span className="text-sm text-gray-400">
                      {job.createdAt}
                    </span>
                  )}
                </div>

                {/* Status Badges */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <Badge color="success" className="px-3 py-1">
                    🌍 Remote
                  </Badge>

                  <Badge color="purple" className="px-3 py-1">
                    Worldwide
                  </Badge>
                </div>

                {/* Skills */}
                {job.tags && job.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.slice(0, 5).map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {job.description && (
                  <p className="mt-6 line-clamp-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-6 font-medium text-primary group-hover:underline">
                  Apply →
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default JobCards;