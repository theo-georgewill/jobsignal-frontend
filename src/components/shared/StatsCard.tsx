// src/components/shared/StatsCard.tsx

import React from 'react';

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-3xl font-semibold text-gray-900 mt-2">
            {value}
          </h3>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}