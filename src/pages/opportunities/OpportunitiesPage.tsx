import { useEffect, useState } from "react";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { getOpportunities, type Opportunity } from "@/api/opportunities";

export default function OpportunitiesPage() {
  const [data, setData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function load() {
      try {
        const res = await getOpportunities();

        // 🔥 Safety guard (prevents map crash)
        const safeData = Array.isArray(res)
          ? res
          : (res as any)?.data || [];

        setData(safeData);
      } catch (err) {
        console.error("Failed to load opportunities:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered =
    filter === "all"
      ? data
      : data.filter((o) => o.priority === filter);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Top Opportunities</h1>
          <p className="text-sm text-gray-500">
            Companies with strongest signals right now
          </p>
        </div>

        <input
          placeholder="Search companies..."
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "high", "medium", "low"].map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === p
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No opportunities found.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((o) => (
            <OpportunityCard key={o.id} {...o} />
          ))}
        </div>
      )}
    </div>
  );
}