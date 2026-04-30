// src/components/company/CompanyStats.tsx

import React from 'react';

type Props = {
  total: number;
  active: number;
  healthy: number;
  failed: number;
};

type CardProps = {
  title: string;
  value: number | string;
  subtitle: string;
};

function StatCard({
  title,
  value,
  subtitle,
}: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-semibold text-gray-900">
        {value}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

export default function CompanyStats({
  total,
  active,
  healthy,
  failed,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Companies"
        value={total}
        subtitle="All tracked companies"
      />

      <StatCard
        title="Active Watchers"
        value={active}
        subtitle="Enabled for monitoring"
      />

      <StatCard
        title="Healthy Sources"
        value={healthy}
        subtitle="Last checks successful"
      />

      <StatCard
        title="Failures"
        value={failed}
        subtitle="Need attention"
      />
    </div>
  );
}