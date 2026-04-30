import { useEffect, useState } from 'react';

import SourcesTable from '@/components/ingestion/SourcesTable';

import {
  getSources,
  IngestionSource,
} from '@/api/ingestion';

export default function SourcesPage() {
  const [loading, setLoading] =
    useState(true);

  const [sources, setSources] =
    useState<
      IngestionSource[]
    >([]);

  const [error, setError] =
    useState('');

  const loadSources =
    async () => {
      try {
        setError('');

        const data =
          await getSources();

        setSources(data);
      } catch (err: any) {
        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            'Failed to load sources'
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSources();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Sources
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor and manage ingestion providers.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <SourcesTable
        data={sources}
      />
    </div>
  );
}