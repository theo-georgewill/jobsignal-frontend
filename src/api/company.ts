// src/api/company.ts

import { apiClient } from './client';

/* =========================================
   TYPES
========================================= */

export type AtsType =
  | 'greenhouse'
  | 'lever'
  | 'ashby'
  | 'workday'
  | 'custom';

export type Company = {
  id: string;
  name: string;
  website?: string | null;
  careersUrl: string;
  atsType: AtsType | string;
  enabled: boolean;
  healthy: boolean;
  priority: number;
  lastCheckedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CompanyLogLevel =
  | 'healthy'
  | 'warning'
  | 'failed'
  | 'running';

export type CompanyLog = {
  id: string;
  companyId: string;
  level: CompanyLogLevel | string;
  message: string;
  createdAt: string;
};

export type CreateCompanyInput = {
  name: string;
  website?: string;
  careersUrl: string;
  atsType: AtsType | string;
  enabled?: boolean;
  priority?: number;
};

export type UpdateCompanyInput =
  Partial<CreateCompanyInput> & {
    healthy?: boolean;
    lastCheckedAt?: string | null;
  };

export type RunCompanyResponse = {
  message?: string;
  company?: string;
  fetched?: number;
  saved?: number;
};

/* =========================================
   COMPANIES
========================================= */

export async function getCompanies() {
  const res =
    await apiClient.get<
      Company[]
    >('/admin/company');

  return res.data;
}

export async function getCompany(
  id: string
) {
  const res =
    await apiClient.get<Company>(
      `/admin/company/${id}`
    );

  return res.data;
}

export async function createCompany(
  data: CreateCompanyInput
) {
  const res =
    await apiClient.post<Company>(
      '/admin/company',
      data
    );

  return res.data;
}

export async function updateCompany(
  id: string,
  data: UpdateCompanyInput
) {
  const res =
    await apiClient.patch<Company>(
      `/admin/company/${id}`,
      data
    );

  return res.data;
}

export async function deleteCompany(
  id: string
) {
  const res =
    await apiClient.delete(
      `/admin/company/${id}`
    );

  return res.data;
}

/* =========================================
   ACTIONS
========================================= */

export async function runCompany(
  id: string
) {
  const res =
    await apiClient.post<RunCompanyResponse>(
      `/admin/company/${id}/run`
    );

  return res.data;
}

/* =========================================
   LOGS
========================================= */

export async function getCompanyLogs(
  id: string
) {
  const res =
    await apiClient.get<
      CompanyLog[]
    >(
      `/admin/company/${id}/logs`
    );

  return res.data;
}

export async function bulkImportCompanies(
  rows: any[]
) {
  const res =
    await apiClient.post(
      '/admin/company/bulk-import',
      rows
    );

  return res.data;
}

export async function refreshCompanyLogos() {
  const res = await apiClient.post(
    '/admin/company/refresh-logos'
  );

  return res.data;
}