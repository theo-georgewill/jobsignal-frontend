import { runSource } from '@/api/ingestion';
import StatusBadge from './StatusBadge';

interface Source {
  id: string;
  name: string;
  type: string;
  status:
    | 'running'
    | 'healthy'
    | 'warning'
    | 'failed'
    | 'paused'
    | 'completed';

  successRate: number;
  lastRunAt?: string | null;
}

interface Props {
  data: Source[];
}

export default function SourcesTable({
  data,
}: Props) {
  const handleRun =
    async (
      name: string
    ) => {
      await runSource(name);
      window.location.reload();
    };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Sources
        </h2>

        <p className="text-sm text-gray-500">
          Manage ingestion sources.
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
                Type
              </th>
              <th className="px-6 py-3">
                Status
              </th>
              <th className="px-6 py-3">
                Last Run
              </th>
              <th className="px-6 py-3">
                Success
              </th>
              <th className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map(
              (
                source
              ) => (
                <tr
                  key={
                    source.id
                  }
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {
                      source.name
                    }
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {
                      source.type
                    }
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={
                        source.status
                      }
                    />
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {source.lastRunAt
                      ? new Date(
                          source.lastRunAt
                        ).toLocaleString()
                      : 'Never'}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {
                      source.successRate
                    }
                    %
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        handleRun(
                          source.name
                        )
                      }
                      className="text-blue-600 font-medium"
                    >
                      Run
                    </button>
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