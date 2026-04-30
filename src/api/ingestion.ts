// src/api/ingestion.ts

import { apiClient } from './client';

/* =========================================
   TYPES
========================================= */

export type IngestionOverview = {
  totalSources: number;
  healthy: number;
  running: number;
  paused: boolean;
  jobsToday: number;
  totalJobs: number;
};

export type IngestionStatus = {
  paused: boolean;
  running: boolean;
};

export type RunStatus =
  | 'running'
  | 'healthy'
  | 'warning'
  | 'failed'
  | 'paused'
  | 'completed';

export type IngestionRun = {
  id: string;
  sourceName?: string | null;
  status: RunStatus;
  fetched: number;
  saved: number;
  startedAt: string;
  finishedAt?: string | null;
  message?: string | null;
};

export type SourceStatus =
  | 'healthy'
  | 'failed'
  | 'paused'
  | 'running';

export type IngestionSource = {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  healthy: boolean;
  status: SourceStatus;
  lastRunAt?: string | null;
  successRate: number;
};

export type RunAllResponse = {
  message: string;
  totalFetched?: number;
  totalSaved?: number;
};

export type RunSourceResponse = {
  source: string;
  fetched: number;
  saved: number;
};

/* =========================================
   OVERVIEW
========================================= */

export async function getOverview() {
  const res =
    await apiClient.get<IngestionOverview>(
      '/admin/ingestion/overview'
    );

  return res.data;
}

/* =========================================
   STATUS
========================================= */

export async function getStatus() {
  const res =
    await apiClient.get<IngestionStatus>(
      '/admin/ingestion/status'
    );

  return res.data;
}

/* =========================================
   SOURCES
========================================= */

export async function getSources() {
  const res =
    await apiClient.get<
      IngestionSource[]
    >(
      '/admin/ingestion/sources'
    );

  return res.data;
}

/* =========================================
   CONTROLS
========================================= */

export async function runAll() {
  const res =
    await apiClient.post<RunAllResponse>(
      '/admin/ingestion/run-all'
    );

  return res.data;
}

export async function pauseEngine() {
  const res =
    await apiClient.post(
      '/admin/ingestion/pause'
    );

  return res.data;
}

export async function resumeEngine() {
  const res =
    await apiClient.post(
      '/admin/ingestion/resume'
    );

  return res.data;
}

/* =========================================
   SOURCE ACTIONS
========================================= */

export async function runSource(
  name: string
) {
  const res =
    await apiClient.post<RunSourceResponse>(
      `/admin/ingestion/source/${name}/run`
    );

  return res.data;
}

export async function getHistory() {
  const res =
    await apiClient.get<
      IngestionRun[]
    >(
      '/admin/ingestion/history'
    );

  return res.data;
}

export async function getLogs() {
  const res =
    await apiClient.get(
      '/admin/ingestion/logs'
    );

  return res.data;
}

export type CleanupJobsResponse = {
  message: string;
  removed: number;
};

export async function cleanupDuplicateJobs() {
  const res =
    await apiClient.post<CleanupJobsResponse>(
      '/jobs/cleanup-duplicates'
    );

  return res.data;
}