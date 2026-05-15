import { useState } from "react";
import StatsCard from "@/components/ingestion/StatsCard";

export default function SettingsPage() {
  const [concurrency, setConcurrency] =
    useState(5);

  const [delay, setDelay] =
    useState(1000);

  const [retryAttempts, setRetryAttempts] =
    useState(3);

  const [timeout, setTimeoutValue] =
    useState(30);

  const [autoRun, setAutoRun] =
    useState(true);

  const [emailAlerts, setEmailAlerts] =
    useState(true);

  const handleSave = () => {
    alert("Settings saved");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Ingestion Settings
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Configure global engine behavior and alerts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Active Sources"
          value="14"
          subtitle="2 paused"
        />

        <StatsCard
          title="Current Concurrency"
          value={concurrency}
          subtitle="Parallel workers"
        />

        <StatsCard
          title="Retry Attempts"
          value={retryAttempts}
          subtitle="Per failed run"
        />

        <StatsCard
          title="Timeout"
          value={`${timeout}s`}
          subtitle="Request timeout"
        />
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Engine Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concurrency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Concurrency
            </label>

            <input
              type="number"
              value={concurrency}
              onChange={(e) =>
                setConcurrency(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
            />
          </div>

          {/* Delay */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delay Between Requests (ms)
            </label>

            <input
              type="number"
              value={delay}
              onChange={(e) =>
                setDelay(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
            />
          </div>

          {/* Retry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retry Attempts
            </label>

            <input
              type="number"
              value={retryAttempts}
              onChange={(e) =>
                setRetryAttempts(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
            />
          </div>

          {/* Timeout */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeout (seconds)
            </label>

            <input
              type="number"
              value={timeout}
              onChange={(e) =>
                setTimeoutValue(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <label className="flex items-center justify-between border rounded-xl px-4 py-3">
            <span className="text-sm text-gray-700">
              Enable Automatic Scheduled Runs
            </span>

            <input
              type="checkbox"
              checked={autoRun}
              onChange={() =>
                setAutoRun(!autoRun)
              }
            />
          </label>

          <label className="flex items-center justify-between border rounded-xl px-4 py-3">
            <span className="text-sm text-gray-700">
              Enable Email Alerts
            </span>

            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() =>
                setEmailAlerts(
                  !emailAlerts
                )
              }
            />
          </label>
        </div>

        {/* Save */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}