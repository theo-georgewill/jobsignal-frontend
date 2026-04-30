import { useState } from 'react';
import {
  Play,
  Pause,
  RotateCw,
  RefreshCw,
  Loader2,
} from 'lucide-react';

import {
  runAll,
  pauseEngine,
  resumeEngine,
  cleanupDuplicateJobs,
} from '@/api/ingestion';

interface Props {
  onRefresh?: () => void;
}

type ActionType =
  | 'run'
  | 'pause'
  | 'resume'
  | 'refresh'
  | 'cleanup'
  | null;

export default function ControlsPanel({
  onRefresh,
}: Props) {
  const [loadingAction, setLoadingAction] =
    useState<ActionType>(null);

  const runAction = async (
    key: ActionType,
    fn: () => Promise<any>
  ) => {
    try {
      setLoadingAction(key);
      await fn();
      onRefresh?.();
    } finally {
      setLoadingAction(null);
    }
  };

  const buttons = [
    {
      key: 'run' as ActionType,
      label: 'Run All Now',
      sub: 'Trigger all active sources to run immediately',
      icon: Play,
      action: () =>
        runAction('run', runAll),
      tone:
        'bg-blue-50 border-blue-100 text-blue-600',
      circle: 'bg-blue-600',
    },
    {
      key: 'pause' as ActionType,
      label: 'Pause Engine',
      sub: 'Pause all scheduled and running jobs',
      icon: Pause,
      action: () =>
        runAction(
          'pause',
          pauseEngine
        ),
      tone:
        'bg-amber-50 border-amber-100 text-amber-600',
      circle: 'bg-amber-500',
    },
    {
      key: 'resume' as ActionType,
      label: 'Resume Engine',
      sub: 'Resume all paused scheduled jobs',
      icon: RotateCw,
      action: () =>
        runAction(
          'resume',
          resumeEngine
        ),
      tone:
        'bg-emerald-50 border-emerald-100 text-emerald-600',
      circle: 'bg-emerald-600',
    },
    {
      key: 'cleanup' as ActionType,
      label: 'Clean Duplicate Jobs',
      sub: 'Remove duplicate job records from database',
      icon: RefreshCw,
      action: () =>
        runAction(
          'cleanup',
          cleanupDuplicateJobs
        ),
      tone:
        'bg-rose-50 border-rose-100 text-rose-600',
      circle: 'bg-rose-600',
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Engine Actions
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4">
        {buttons.map(
          (
            item,
            index
          ) => {
            const Icon =
              item.icon;

            const active =
              loadingAction ===
              item.key;

            return (
              <button
                key={index}
                disabled={
                  loadingAction !==
                  null
                }
                onClick={
                  item.action
                }
                className={`text-left rounded-xl border p-4 transition hover:shadow-sm hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${item.tone}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0 ${item.circle}`}
                  >
                    {active ? (
                      <Loader2
                        size={
                          17
                        }
                        className="animate-spin"
                      />
                    ) : (
                      <Icon
                        size={
                          17
                        }
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-5">
                      {active
                        ? 'Processing...'
                        : item.label}
                    </p>

                    <p className="text-xs text-slate-500 mt-1 leading-5 break-words">
                      {item.sub}
                    </p>
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Refresh */}
      <div className="mt-4">
        <button
          disabled={
            loadingAction !==
            null
          }
          onClick={async () => {
            try {
              setLoadingAction(
                'refresh'
              );
              await onRefresh?.();
            } finally {
              setLoadingAction(
                null
              );
            }
          }}
          className="w-full h-11 rounded-xl bg-slate-900 text-white font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loadingAction ===
          'refresh' ? (
            <Loader2
              size={16}
              className="animate-spin"
            />
          ) : (
            <RefreshCw size={16} />
          )}

          {loadingAction ===
          'refresh'
            ? 'Refreshing...'
            : 'Refresh Dashboard'}
        </button>
      </div>
    </div>
  );
}