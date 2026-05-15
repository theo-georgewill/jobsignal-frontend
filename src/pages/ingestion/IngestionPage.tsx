import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Activity,
  CheckCircle2,
  Database,
} from 'lucide-react';

import MetricCard from '@/components/shared/MetricCard';
import ControlsPanel from '../../components/ingestion/ControlsPanel';
import SchedulingOverview from '../../components/ingestion/SchedulingOverview';
import SourceScheduling from '@/components/ingestion/SourceScheduling';

import {
  getOverview,
  getSources,
  IngestionOverview,
  IngestionSource,
} from '@/api/ingestion';

export default function IngestionPage() {
  const [loading, setLoading] =
    useState(true);

  const [overview, setOverview] =
    useState<IngestionOverview | null>(
      null
    );

  const [sources, setSources] =
    useState<
      IngestionSource[]
    >([]);

  const [error, setError] =
    useState('');

  const loadData =
    async () => {
      try {
        setError('');

        const [
          overviewData,
          sourcesData,
        ] = await Promise.all([
          getOverview(),
          getSources(),
        ]);

        setOverview(
          overviewData
        );

        setSources(
          sourcesData
        );
      } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            setError(
              err.response?.data
                ?.message ||
                err.message ||
                'Failed to load ingestion data'
            );
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(
              'Failed to load ingestion data'
            );
          }
        } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  const total =
    overview?.totalSources ??
    0;

  const healthy =
    overview?.healthy ??
    0;

  const running =
    overview?.running ??
    false;

  const paused =
    overview?.paused ??
    false;

  const jobsToday =
    overview?.jobsToday ??
    0;

  const totalJobs =
    overview?.totalJobs ?? 0;

  const unhealthy =
    Math.max(
      total - healthy,
      0
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Ingestion Engine
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor and control all
          job source ingestion
          activity.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <MetricCard
          title="Engine Status"
          value={
            running && !paused
              ? 'Running'
              : paused
              ? 'Paused'
              : 'Idle'
          }
          description={
            running && !paused
              ? 'All systems operational'
              : paused
              ? 'Engine manually paused'
              : 'Ready to run'
          }
          tone={
            running && !paused
              ? 'green'
              : paused
              ? 'orange'
              : 'gray'
          }
          icon={<Activity size={30} />}
          iconPosition="center-right"
          compact
        />

        <MetricCard
          title="Sources"
          value={total}
          description={`${healthy} healthy • ${unhealthy} issues`}
          tone="purple"
          icon={<Database size={30} />}
          iconPosition="center-right"
          compact
        />

        <MetricCard
          title="Jobs Fetched Today"
          value={jobsToday.toLocaleString()}
          description={`${totalJobs.toLocaleString()} total jobs in system`}
          tone="blue"
          icon={<CheckCircle2 size={30} />}
          iconPosition="center-right"
          compact
        />

        <MetricCard
          title="Healthy Sources"
          value={healthy}
          description={`${
            total > 0
              ? Math.round(
                  (healthy / total) *
                    100
                )
              : 0
          }% operational`}
          tone="green"
          icon={
            <CheckCircle2 size={30} />
          }
          iconPosition="center-right"
          compact
        />
      </div>

      {/* Controls + Scheduling Side by Side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ControlsPanel
          onRefresh={loadData}
        />

        <SchedulingOverview />
      </div>

      {/* Full Width Source Scheduling */}
      <SourceScheduling
        sources={sources}
        onRefresh={loadData}
      />
    </div>
  );
}