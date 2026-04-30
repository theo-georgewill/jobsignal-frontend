import { useEffect, useState } from 'react';

import StatsCard from '@/components/ingestion/StatsCard';
import RunHistoryTable from '@/components/ingestion/RunHistoryTable';

import {
  getHistory,
  IngestionRun,
} from '@/api/ingestion';

export default function HistoryPage() {
  const [runs, setRuns] =
    useState<
      IngestionRun[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    const load =
      async () => {
        try {
          const data =
            await getHistory();

          setRuns(data);
        } catch (err: any) {
          setError(
            err?.response?.data
              ?.message ||
              err?.message ||
              'Failed to load history'
          );
        } finally {
          setLoading(false);
        }
      };

    load();
  }, []);

  const successful =
    runs.filter(
      (r) =>
        r.status ===
        'completed'
    ).length;

  const failed =
    runs.filter(
      (r) =>
        r.status ===
        'failed'
    ).length;

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Run History
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor ingestion activity.
        </p>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Runs"
          value={String(
            runs.length
          )}
          subtitle="Recent activity"
        />

        <StatsCard
          title="Successful"
          value={String(
            successful
          )}
          subtitle="Completed runs"
        />

        <StatsCard
          title="Failed"
          value={String(
            failed
          )}
          subtitle="Needs review"
        />
      </div>

      <RunHistoryTable
        data={runs}
      />
    </div>
  );
}