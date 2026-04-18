import { Badge } from "flowbite-react";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  url: string;
  tags?: string[];
};

type Props = {
  jobs: Job[];
};

const JobCards = ({ jobs }: Props) => {
  if (!jobs.length) {
    return <p className="text-center mt-10">No jobs found</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {jobs.map((job) => (
        <div key={job.id} className="lg:col-span-4 col-span-12">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 hover:shadow-lg transition-all duration-200 h-full flex flex-col justify-between">
              
              {/* Title */}
              <h5 className="text-lg font-semibold group-hover:text-primary line-clamp-2">
                {job.title}
              </h5>

              {/* Company */}
              <p className="text-sm text-gray-500 mt-2">
                {job.company}
              </p>

              {/* Location */}
              <p className="text-sm text-gray-400">
                {job.location || "Remote"}
              </p>

              {/* Tags */}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} color="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-4 text-primary font-medium group-hover:underline">
                Apply →
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobCards;