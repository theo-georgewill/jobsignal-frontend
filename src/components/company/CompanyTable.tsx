import React from 'react';
import {
  Play,
  Pencil,
  Trash2,
  FileText,
} from 'lucide-react';

import { useNavigate } from 'react-router';

type Status =
  | 'healthy'
  | 'failed'
  | 'paused';

export type CompanyRow = {
  id: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  careersUrl: string;
  atsType: string;
  enabled: boolean;
  healthy: boolean;
  priority: number;
  lastCheckedAt?: string | null;
};

type Props = {
  data: CompanyRow[];
  loading?: boolean;
  onRun?: (id: string) => void;
  onEdit?: (
    company: CompanyRow
  ) => void;
  onDelete?: (
    company: CompanyRow
  ) => void;
  onLogs?: (
    company: CompanyRow
  ) => void;
};

function getStatus(
  row: CompanyRow
): Status {
  if (!row.enabled)
    return 'paused';

  return row.healthy
    ? 'healthy'
    : 'failed';
}

function formatDate(
  value?: string | null
) {
  if (!value)
    return 'Never';

  return new Date(
    value
  ).toLocaleString();
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {children}
    </span>
  );
}

export default function CompanyTable({
  data,
  loading,
  onRun,
  onEdit,
  onDelete,
  onLogs,
}: Props) {
  const navigate =
    useNavigate();
    
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Companies
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage target companies and monitor ATS health.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-6 py-4 font-medium">
                Company
              </th>

              <th className="text-left px-6 py-4 font-medium">
                ATS
              </th>

              <th className="text-left px-6 py-4 font-medium">
                Status
              </th>

              <th className="text-left px-6 py-4 font-medium">
                Priority
              </th>

              <th className="text-left px-6 py-4 font-medium">
                Last Checked
              </th>

              <th className="text-right px-6 py-4 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  Loading companies...
                </td>
              </tr>
            ) : data.length ===
              0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No companies found.
                </td>
              </tr>
            ) : (
              data.map(
                (company) => {
                  const status =
                    getStatus(
                      company
                    );

                  return (
                    <tr
                      key={
                        company.id
                      }
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >
                      {/* Company */}
                      <td className="px-6 py-4">
                          <div
                            onClick={() =>
                              navigate(
                                `/admin/companies/${company.id}`
                              )
                            }
                            className="flex items-center gap-4 cursor-pointer group"
                          >
                          {company.logoUrl ? (
                            <img
                              src={
                                company.logoUrl
                              }
                              alt={
                                company.name
                              }
                              className="w-11 h-11 rounded-xl border border-slate-200 bg-white object-contain p-1"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">
                              {company.name.charAt(
                                0
                              )}
                            </div>
                          )}

                          <div>
                            <div className="font-semibold text-slate-900">
                              {
                                company.name
                              }
                            </div>

                            <div className="text-xs text-slate-500 truncate max-w-[240px]">
                              {company.website ||
                                company.careersUrl}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ATS */}
                      <td className="px-6 py-4">
                        <Badge color="bg-slate-100 text-slate-700 capitalize">
                          {
                            company.atsType
                          }
                        </Badge>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {status ===
                          'healthy' && (
                          <Badge color="bg-emerald-100 text-emerald-700">
                            Healthy
                          </Badge>
                        )}

                        {status ===
                          'failed' && (
                          <Badge color="bg-rose-100 text-rose-700">
                            Failed
                          </Badge>
                        )}

                        {status ===
                          'paused' && (
                          <Badge color="bg-slate-100 text-slate-700">
                            Paused
                          </Badge>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="px-6 py-4 text-slate-700">
                        {
                          company.priority
                        }
                      </td>

                      {/* Last Checked */}
                      <td className="px-6 py-4 text-slate-500">
                        {formatDate(
                          company.lastCheckedAt
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              onRun?.(
                                company.id
                              )
                            }
                            className="h-9 w-9 rounded-lg bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700"
                          >
                            <Play
                              size={
                                15
                              }
                            />
                          </button>

                          <button
                            onClick={() =>
                              onLogs?.(
                                company
                              )
                            }
                            className="h-9 w-9 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100"
                          >
                            <FileText
                              size={
                                15
                              }
                            />
                          </button>

                          <button
                            onClick={() =>
                              onEdit?.(
                                company
                              )
                            }
                            className="h-9 w-9 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100"
                          >
                            <Pencil
                              size={
                                15
                              }
                            />
                          </button>

                          <button
                            onClick={() =>
                              onDelete?.(
                                company
                              )
                            }
                            className="h-9 w-9 rounded-lg border border-slate-200 text-rose-600 flex items-center justify-center hover:bg-rose-50"
                          >
                            <Trash2
                              size={
                                15
                              }
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}