import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router';

import {
  ChevronRight,
  RefreshCw,
  Pencil,
  Trash2,
  Globe,
  Building2,
  Activity,
  Clock3,
  History,
  Briefcase,
} from 'lucide-react';

import MetricCard from '@/components/shared/MetricCard';

import {
  Company,
  CompanyLog,
  getCompany,
  getCompanyLogs,
  runCompany,
} from '@/api/company';

type Tab =
  | 'overview'
  | 'runs'
  | 'jobs'
  | 'settings'
  | 'history';

export default function CompanyDetailsPage() {
  const { id } =
    useParams();

  const [
    company,
    setCompany,
  ] =
    useState<Company | null>(
      null
    );

  const [
    logs,
    setLogs,
  ] = useState<
    CompanyLog[]
  >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    running,
    setRunning,
  ] =
    useState(false);

  const [tab, setTab] =
    useState<Tab>(
      'overview'
    );

  async function load() {
    if (!id) return;

    try {
      setLoading(true);

      const [
        companyData,
        logsData,
      ] =
        await Promise.all(
          [
            getCompany(
              id
            ),
            getCompanyLogs(
              id
            ),
          ]
        );

      setCompany(
        companyData
      );

      setLogs(
        logsData
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleRun() {
    if (!id) return;

    try {
      setRunning(
        true
      );

      await runCompany(
        id
      );

      await load();
    } finally {
      setRunning(
        false
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6">
        Company not found.
      </div>
    );
  }

  const logo =
    company.website
      ? `https://www.google.com/s2/favicons?domain=${new URL(
          company.website.startsWith(
            'http'
          )
            ? company.website
            : `https://${company.website}`
        ).hostname}&sz=128`
      : null;

  const healthy =
    company.healthy;

  const tabs: Tab[] = [
    'overview',
    'runs',
    'jobs',
    'settings',
    'history',
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/admin/companies"
            className="text-slate-500 hover:text-slate-700"
          >
            Companies
          </Link>

          <ChevronRight
            size={14}
            className="text-slate-400"
          />

          <span className="font-medium text-slate-900">
            {company.name}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={
              handleRun
            }
            disabled={
              running
            }
            className="h-11 px-5 rounded-xl bg-violet-600 text-white flex items-center gap-2 hover:bg-violet-700 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                running
                  ? 'animate-spin'
                  : ''
              }
            />
            {running
              ? 'Checking...'
              : 'Check Careers Page'}
          </button>

          <button className="h-11 px-5 rounded-xl border bg-white flex items-center gap-2 hover:bg-slate-50">
            <Pencil
              size={16}
            />
            Edit
          </button>

          <button className="h-11 px-5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 flex items-center gap-2 hover:bg-rose-100">
            <Trash2
              size={16}
            />
            Delete
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left */}
          <div className="xl:col-span-2 flex gap-5">
            {logo ? (
              <img
                src={logo}
                className="w-20 h-20 rounded-2xl border bg-white p-2 object-contain"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-bold">
                {company.name.charAt(
                  0
                )}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">
                  {
                    company.name
                  }
                </h1>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    healthy
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {healthy
                    ? 'Healthy'
                    : 'Failed'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-sm capitalize">
                  {
                    company.atsType
                  }
                </span>

                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                  Priority{' '}
                  {
                    company.priority
                  }
                </span>
              </div>

              <a
                href={
                  company.careersUrl
                }
                target="_blank"
                className="inline-flex gap-2 items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Globe
                  size={15}
                />
                Careers Page
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-5">
            <Stat
              label="Last Checked"
              value={
                company.lastCheckedAt
                  ? new Date(
                      company.lastCheckedAt
                    ).toLocaleDateString()
                  : 'Never'
              }
            />

            <Stat
              label="Total Runs"
              value={
                logs.length
              }
            />

            <Stat
              label="Status"
              value={
                company.enabled
                  ? 'Enabled'
                  : 'Paused'
              }
            />

            <Stat
              label="Added On"
              value={new Date(
                company.createdAt
              ).toLocaleDateString()}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border px-6">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map(
            (
              item
            ) => (
              <button
                key={
                  item
                }
                onClick={() =>
                  setTab(
                    item
                  )
                }
                className={`py-4 text-sm font-medium capitalize whitespace-nowrap border-b-2 ${
                  tab ===
                  item
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Overview */}
      {tab ===
        'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <MetricCard
              layout="inline"
              title="Health Status"
              value={
                healthy
                  ? 'Healthy'
                  : 'Failed'
              }
              description="Current monitoring state"
              tone={
                healthy
                  ? 'green'
                  : 'red'
              }
              icon={
                <Activity
                  size={
                    18
                  }
                />
              }
            />

            <MetricCard
              layout="inline"
              title="ATS Provider"
              value={
                company.atsType
              }
              description="Current parser source"
              tone="purple"
              icon={
                <Briefcase
                  size={
                    18
                  }
                />
              }
            />

            <MetricCard
              layout="inline"
              title="Priority"
              value={
                company.priority
              }
              description="Current ranking level"
              tone="orange"
              icon={
                <Clock3
                  size={
                    18
                  }
                />
              }
            />

            <MetricCard
              layout="inline"
              title="Runs Logged"
              value={
                logs.length
              }
              description="Historical executions"
              tone="blue"
              icon={
                <History
                  size={
                    18
                  }
                />
              }
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Runs */}
            <div className="xl:col-span-2 bg-white rounded-2xl border p-6">
              <h3 className="font-semibold text-slate-900">
                Recent Runs
              </h3>

              <div className="mt-5 space-y-3">
                {logs.length ===
                0 ? (
                  <p className="text-sm text-slate-500">
                    No runs yet.
                  </p>
                ) : (
                  logs
                    .slice(
                      0,
                      5
                    )
                    .map(
                      (
                        log
                      ) => (
                        <div
                          key={
                            log.id
                          }
                          className="rounded-xl border border-slate-200 px-4 py-3 flex justify-between gap-4"
                        >
                          <div>
                            <p className="font-medium capitalize text-slate-900">
                              {
                                log.level
                              }
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                              {
                                log.message
                              }
                            </p>
                          </div>

                          <p className="text-xs text-slate-400 whitespace-nowrap">
                            {new Date(
                              log.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      )
                    )
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border p-6">
                <h3 className="font-semibold text-slate-900">
                  Company Info
                </h3>

                <div className="mt-4 space-y-4 text-sm">
                  <InfoRow
                    label="Website"
                    value={
                      company.website ||
                      '—'
                    }
                  />

                  <InfoRow
                    label="Careers URL"
                    value={
                      company.careersUrl
                    }
                  />

                  <InfoRow
                    label="ATS"
                    value={
                      company.atsType
                    }
                  />

                  <InfoRow
                    label="Priority"
                    value={String(
                      company.priority
                    )}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6">
                <h3 className="font-semibold text-slate-900">
                  Recent Jobs
                </h3>

                <p className="text-sm text-slate-500 mt-3">
                  Jobs linked to this company will appear here next.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab !==
        'overview' && (
        <div className="bg-white rounded-2xl border p-6 text-sm text-slate-500">
          {tab} section
          coming next.
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="text-lg font-semibold text-slate-900 mt-1">
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-slate-500">
        {label}
      </p>

      <p className="text-slate-900 mt-1 break-all">
        {value}
      </p>
    </div>
  );
}