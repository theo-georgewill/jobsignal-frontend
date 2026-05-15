import StatusBadge from "@/components/shared/StatusBadge";
import { useNavigate } from "react-router";

type Signal = {
  title: string;
  url?: string;
  type: string;
};

type Props = {
  id: string;
  companyId: string;
  companyName: string;
  logo?: string;
  score: number;
  priority: string;
  momentum: string;
  summary?: string;
  tags?: string[];
  signals?: Signal[];
};

export default function OpportunityCard({
  companyId,
  companyName,
  logo,
  score,
  priority,
  momentum,
  summary,
  tags,
  signals,
}: Props) {
  const navigate = useNavigate();

  const topSignal = signals?.[0];

  return (
    <div
      onClick={() => navigate(`/admin/companies/${companyId}`)}
      className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {logo ? (
          <img src={logo} className="w-10 h-10 rounded" />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded" />
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-sm">{companyName}</h3>

          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={priority} variant="priority" />
            <StatusBadge status={momentum} variant="momentum" />
          </div>
        </div>

        {/* Score */}
        <div className="text-right">
          <p className="text-xs text-gray-500">Score</p>
          <p className="font-bold text-lg">{score}</p>
        </div>
      </div>

      {/* 🔥 SIGNAL (replaces summary when available) */}
      {topSignal ? (
        <>
          <a
            href={topSignal.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block text-sm font-medium text-blue-600 hover:underline mt-3"
          >
            {topSignal.title}
          </a>

          <p className="text-xs text-gray-400 mt-1">
            {topSignal.type.toUpperCase()} • Source article
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-600 mt-3">{summary}</p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-4">
        <span className="text-sm text-blue-600 font-medium">
          View Details →
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          ⭐
        </button>
      </div>
    </div>
  );
}