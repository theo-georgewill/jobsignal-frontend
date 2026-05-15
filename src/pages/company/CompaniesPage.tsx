import {
  useEffect,
  useState,
} from 'react';

import {
  Company,
  getCompanies,
  refreshCompanyLogos,
} from '@/api/company';
import MetricCard from '@/components/shared/MetricCard';
import CompanyTable, {
  CompanyRow,
} from '@/components/company/CompanyTable';
import { 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export default function CompaniesPage() {
  const [
    companies,
    setCompanies,
  ] = useState<Company[]>([]);

  const [
    refreshingLogos,
    setRefreshingLogos,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  async function load() {
    try {
      const data =
        await getCompanies();

      setCompanies(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  function handleRun(id: string) {
    console.log('Run company:', id);
  }

  function handleEdit(
    company: CompanyRow
  ) {
    console.log(company);
  }

  function handleDelete(
    company: CompanyRow
  ) {
    console.log(company);
  }

  function handleLogs(
    company: CompanyRow
  ) {
    console.log(company);
  }

  async function handleFetchLogos() {
    try {
      setRefreshingLogos(true);
      await refreshCompanyLogos();
      await load();
    } finally {
      setRefreshingLogos(false);
    }
  }

  return (
    <div className="w-full min-w-0 max-w-full p-6 space-y-6 bg-slate-50 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Target Companies
          </h1>
          <p className="text-slate-500 mt-1">
            Monitor career pages and discover new opportunities early.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700">
            + Add Company
          </button>

          <button className="px-4 py-2 bg-white border rounded-xl hover:bg-slate-50">
            Bulk Import
          </button>

          <button
            onClick={handleFetchLogos}
            disabled={refreshingLogos}
            className="px-4 py-2 bg-white border rounded-xl hover:bg-slate-50 disabled:opacity-60"
          >
            {refreshingLogos
              ? 'Fetching...'
              : 'Fetch Logos'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          layout="stacked"
          title="Total Companies"
          value={companies.length}
          description="Companies in your watchlist"
          tone="purple"
          icon={<Building2 size={28} />}
        />

        <MetricCard
          layout="stacked"
          title="Active"
          value={
            companies.filter(
              (c) => c.enabled
            ).length
          }
          description="Enabled and being monitored"
          tone="green"
          icon={<Activity size={28} />}
        />

        <MetricCard
          layout="stacked"
          title="Healthy"
          value={
            companies.filter(
              (c) => c.healthy
            ).length
          }
          description="Successful recent checks"
          tone="blue"
          icon={<ShieldCheck size={28} />}
        />

        <MetricCard
          layout="stacked"
          title="Failures"
          value={
            companies.filter(
              (c) => !c.healthy
            ).length
          }
          description="Issues in the last 7 days"
          tone="orange"
          icon={<AlertTriangle size={28} />}
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border p-4 flex gap-3">
        <input
          placeholder="Search companies..."
          className="flex-1 border rounded-xl px-4 py-2"
        />

        <button className="px-4 py-2 border rounded-xl">
          Filters
        </button>
      </div>

      <CompanyTable
        data={companies}
        loading={loading}
        onRun={handleRun}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onLogs={handleLogs}
      />
    </div>
  );
}