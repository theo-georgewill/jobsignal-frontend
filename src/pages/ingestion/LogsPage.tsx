import { useEffect, useState } from 'react';

import StatusBadge from '@/components/ingestion/StatusBadge';
import StatsCard from '@/components/ingestion/StatsCard';

import { getLogs } from '@/api/ingestion';

type Log = {
  id: string;
  sourceName?: string | null;
  level:
    | 'healthy'
    | 'failed'
    | 'warning'
    | 'running'
    | 'paused'
    | 'completed';

  message: string;
  createdAt: string;
};

export default function LogsPage() {
  const [logs, setLogs] =
    useState<Log[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    const load =
      async () => {
        try {
          const data =
            await getLogs();

          setLogs(data);
        } catch (err: any) {
          setError(
            err?.response?.data
              ?.message ||
              err?.message ||
              'Failed to load logs'
          );
        } finally {
          setLoading(false);
        }
      };

    load();
  }, []);

  const warnings =
    logs.filter(
      (log) =>
        log.level ===
        'warning'
    ).length;

  const failures =
    logs.filter(
      (log) =>
        log.level ===
        'failed'
    ).length;

  const running =
    logs.filter(
      (log) =>
        log.level ===
        'running'
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Logs
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Review engine events,
          warnings, and failures.
        </p>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Events"
          value={String(
            logs.length
          )}
          subtitle="Recent logs"
        />

        <StatsCard
          title="Warnings"
          value={String(
            warnings
          )}
          subtitle="Needs review"
        />

        <StatsCard
          title="Failures"
          value={String(
            failures
          )}
          subtitle="Action required"
        />

        <StatsCard
          title="Running"
          value={String(
            running
          )}
          subtitle="Live activity"
        />
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Logs
          </h2>

          <p className="text-sm text-gray-500">
            Latest ingestion
            engine activity.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-6 py-3">
                  Source
                </th>
                <th className="px-6 py-3">
                  Level
                </th>
                <th className="px-6 py-3">
                  Message
                </th>
                <th className="px-6 py-3">
                  Time
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {logs.map(
                (log) => (
                  <tr
                    key={
                      log.id
                    }
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {log.sourceName ||
                        'System'}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={
                          log.level
                        }
                      />
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {
                        log.message
                      }
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(
                        log.createdAt
                      ).toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}