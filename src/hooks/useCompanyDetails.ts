import { useEffect, useState } from 'react';

import {
  Company,
  CompanyLog,
  getCompany,
  getCompanyLogs,
  runCompany,
} from '@/api/company';

export function useCompanyDetails(id?: string) {
  const [company, setCompany] =
    useState<Company | null>(null);

  const [logs, setLogs] =
    useState<CompanyLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [running, setRunning] =
    useState(false);

  async function load() {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [
        companyData,
        logsData,
      ] = await Promise.all([
        getCompany(id),
        getCompanyLogs(id),
      ]);

      setCompany(companyData);
      setLogs(logsData);
    } catch (error) {
      console.error(
        'Failed to load company details:',
        error
      );

      setCompany(null);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    if (!id) return;

    try {
      setRunning(true);

      await runCompany(id);

      await load();
    } catch (error) {
      console.error(
        'Failed to refresh company:',
        error
      );
    } finally {
      setRunning(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  return {
    company,
    logs,
    loading,
    running,
    refresh,
    reload: load,
  };
}