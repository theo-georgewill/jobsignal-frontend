import {
  useEffect,
  useState,
} from 'react';

import {
  MoreHorizontal,
  ChevronRight,
  Play,
  Pause,
  Loader2,
  Globe,
} from 'lucide-react';

import {
  getSources,
  runSource,
  IngestionSource,
} from '@/api/ingestion';

interface Props {
  onRefresh?: () => void;
}

export default function SourceScheduling({
  onRefresh,
}: Props) {
  const [sources, setSources] =
    useState<
      IngestionSource[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [
    runningId,
    setRunningId,
  ] = useState<
    string | null
  >(null);

  const loadSources =
    async () => {
      try {
        setLoading(true);

        const data =
          await getSources();

        setSources(data);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSources();
  }, []);

  const handleRun =
    async (
      source:
        IngestionSource
    ) => {
      try {
        setRunningId(
          source.id
        );

        await runSource(
          source.name
        );

        await loadSources();

        onRefresh?.();
      } finally {
        setRunningId(
          null
        );
      }
    };

  const getSchedule =
    (
      type: string
    ) => {
      switch (
        type.toLowerCase()
      ) {
        case 'linkedin':
          return 'Every 15 minutes';
        case 'indeed':
          return 'Every 30 minutes';
        case 'company':
          return 'Every 1 hour';
        case 'reddit':
          return 'Every 2 hours';
        case 'rss':
          return 'Every 6 hours';
        default:
          return 'Manual';
      }
    };

  const getNextRun =
    (
      source:
        IngestionSource
    ) => {
      if (
        !source.enabled
      )
        return '--';

      if (
        source.status ===
        'running'
      )
        return 'Running now';

      return 'Scheduled';
    };

  const statusClass =
    (
      status: string
    ) => {
      switch (
        status
      ) {
        case 'healthy':
        case 'running':
          return 'bg-emerald-50 text-emerald-700';

        case 'paused':
          return 'bg-amber-50 text-amber-700';

        case 'failed':
          return 'bg-red-50 text-red-700';

        default:
          return 'bg-gray-100 text-gray-600';
      }
    };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Source Schedules
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Configure how often each source runs
          </p>
        </div>

        <button className="h-10 px-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium">
          Manage Sources
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              {/* Header */}
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-medium text-slate-500 bg-slate-50 border-b border-gray-100">
                <div className="col-span-4">
                  Source
                </div>
                <div className="col-span-3">
                  Schedule
                </div>
                <div className="col-span-2">
                  Next Run
                </div>
                <div className="col-span-2">
                  Status
                </div>
                <div className="col-span-1 text-right">
                  Action
                </div>
              </div>

              {/* Rows */}
              {sources.map(
                (
                  source
                ) => {
                  const busy =
                    runningId ===
                    source.id;

                  return (
                    <div
                      key={
                        source.id
                      }
                      className="grid grid-cols-12 items-center px-5 py-4 border-b last:border-b-0 border-gray-100"
                    >
                      {/* Source */}
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Globe size={15} />
                        </div>

                        <span className="text-sm font-medium text-slate-800">
                          {
                            source.name
                          }
                        </span>
                      </div>

                      {/* Schedule */}
                      <div className="col-span-3">
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                          {getSchedule(
                            source.type
                          )}
                        </span>
                      </div>

                      {/* Next */}
                      <div className="col-span-2 text-sm text-slate-600">
                        {getNextRun(
                          source
                        )}
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${statusClass(
                            source.status
                          )}`}
                        >
                          {
                            source.status
                          }
                        </span>
                      </div>

                      {/* Action */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          disabled={
                            busy
                          }
                          onClick={() =>
                            handleRun(
                              source
                            )
                          }
                          className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-slate-600 disabled:opacity-50"
                        >
                          {busy ? (
                            <Loader2
                              size={
                                16
                              }
                              className="animate-spin"
                            />
                          ) : source.enabled ? (
                            <Play
                              size={
                                16
                              }
                            />
                          ) : (
                            <Pause
                              size={
                                16
                              }
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* Footer */}
            <button className="mt-4 text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:text-blue-700">
              View all sources
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}