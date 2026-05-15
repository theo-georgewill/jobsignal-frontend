import { apiClient } from './client';

/* =========================================
   TYPES
========================================= */

export type Opportunity = {
  id: string;
  companyId: string;
  companyName: string;
  logo?: string;
  score: number;
  priority: string;
  momentum: string;
  summary?: string;
  tags?: string[];
};

/* =========================================
   GET OPPORTUNITIES
========================================= */

export async function getOpportunities() {
  const res = await apiClient.get<Opportunity[]>(
    '/opportunities'
  );

  return res.data;
}