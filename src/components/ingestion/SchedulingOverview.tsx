import { useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Moon,
  Globe,
  Info,
  ChevronDown,
} from 'lucide-react';

export default function SchedulingOverview() {
  const [enabled, setEnabled] =
    useState(true);

  const [interval, setInterval] =
    useState(
      'Every 15 minutes'
    );

  const [quietHours, setQuietHours] =
    useState(
      '12:00 AM - 6:00 AM'
    );

  const [timezone, setTimezone] =
    useState(
      'Asia/Kuala_Lumpur'
    );

  const rowIcon =
    'h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0';

  const rowClass =
    'flex items-center justify-between gap-4 px-5 py-4 border-t border-gray-100';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Scheduling Options
        </h2>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          {/* Master Schedule */}
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-4">
              <div className={rowIcon}>
                <CalendarDays size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Master Schedule
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Enable or disable the global ingestion schedule
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              onClick={() =>
                setEnabled(
                  !enabled
                )
              }
              className={`relative h-6 w-11 rounded-full transition ${
                enabled
                  ? 'bg-emerald-500'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  enabled
                    ? 'left-5'
                    : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Global Schedule */}
          <div className={rowClass}>
            <div className="flex items-center gap-4">
              <div className={rowIcon}>
                <Clock3 size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Global Schedule
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  How often the engine checks for and runs jobs
                </p>
              </div>
            </div>

            <button className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-sm text-slate-700 flex items-center gap-2">
              {interval}
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Quiet Hours */}
          <div className={rowClass}>
            <div className="flex items-center gap-4">
              <div className={rowIcon}>
                <Moon size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Quiet Hours (Optional)
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Pause runs during off-hours
                </p>
              </div>
            </div>

            <button className="text-sm text-slate-700 flex items-center gap-2">
              {quietHours}
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Timezone */}
          <div className={rowClass}>
            <div className="flex items-center gap-4">
              <div className={rowIcon}>
                <Globe size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Timezone
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  All schedules use this timezone
                </p>
              </div>
            </div>

            <button className="text-sm text-slate-700 flex items-center gap-2">
              {timezone}
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0">
            <Info size={16} />
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Scheduling Tip
            </p>

            <p className="text-xs text-blue-700 mt-1 leading-5">
              Sources will run based on their individual schedules.
              The engine wakes up on the global schedule to check
              what's due.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}