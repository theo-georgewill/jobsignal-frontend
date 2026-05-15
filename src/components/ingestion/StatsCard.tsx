import React from "react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}