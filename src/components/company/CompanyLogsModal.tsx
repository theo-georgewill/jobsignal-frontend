// src/components/company/CompanyLogsModal.tsx

import React from 'react';

type LogLevel =
  | 'healthy'
  | 'warning'
  | 'failed'
  | 'running';

type CompanyLog = {
  id: string;
  level: LogLevel | string;
  message: string;
  createdAt: string;
};

type Company = {
  id: string;
  name: string;
};

type Props = {
  open: boolean;
  company?: Company | null;
  logs: CompanyLog[];
  loading?: boolean;
  onClose: () => void;
};

function Badge({
  level,
}: {
  level: LogLevel | string;
}) {
  const styles: Record<
    string,
    string
  > = {
    healthy:
      'bg-green-100 text-green-700',
    warning:
      'bg-yellow-100 text-yellow-700',
    failed:
      'bg-red-100 text-red-700',
    running:
      'bg-blue-100 text-blue-700',
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
        styles[level] ||
        'bg-gray-100 text-gray-700'
      }`}
    >
      {level}
    </span>
  );
}

function formatDate(
  value: string
) {
  return new Date(
    value
  ).toLocaleString();
}

export default function CompanyLogsModal({
  open,
  company,
  logs,
  loading,
  onClose,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Logs
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {company
                ? `Recent scrape activity for ${company.name}`
                : 'Recent company activity'}
            </p>
          </div>

          <button
            onClick={
              onClose
            }
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="px-6 py-10 text-center text-sm text-gray-500">
              Loading logs...
            </div>
          ) : logs.length ===
            0 ? (
            <div className="px-6 py-10 text-center text-sm text-gray-500">
              No logs found.
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500 sticky top-0">
                <tr>
                  <th className="px-6 py-3 font-medium">
                    Level
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Message
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Time
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {logs.map(
                  (
                    log
                  ) => (
                    <tr
                      key={
                        log.id
                      }
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <Badge
                          level={
                            log.level
                          }
                        />
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {
                          log.message
                        }
                      </td>

                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(
                          log.createdAt
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={
              onClose
            }
            className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}