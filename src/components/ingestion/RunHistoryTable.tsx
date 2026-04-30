import StatusBadge from './StatusBadge';

interface Run {
  id: string;
  sourceName?: string | null;
  status:
    | 'running'
    | 'healthy'
    | 'warning'
    | 'failed'
    | 'paused'
    | 'completed';

  fetched: number;
  saved: number;

  startedAt: string;
  finishedAt?: string | null;
}

interface Props {
  data: Run[];
}

function getDuration(
  start: string,
  end?: string | null
) {
  if (!end) {
    return '-';
  }

  const ms =
    new Date(end).getTime() -
    new Date(start).getTime();

  const seconds =
    Math.floor(ms / 1000);

  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return `${mins}m ${secs}s`;
}

export default function RunHistoryTable({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Runs
        </h2>

        <p className="text-sm text-gray-500">
          Latest ingestion activity.
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
                Started
              </th>

              <th className="px-6 py-3">
                Duration
              </th>

              <th className="px-6 py-3">
                Status
              </th>

              <th className="px-6 py-3">
                Fetched
              </th>

              <th className="px-6 py-3">
                Saved
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map(
              (run) => (
                <tr
                  key={
                    run.id
                  }
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {run.sourceName ||
                      'All Sources'}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(
                      run.startedAt
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {getDuration(
                      run.startedAt,
                      run.finishedAt
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={
                        run.status
                      }
                    />
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {
                      run.fetched
                    }
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {
                      run.saved
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}