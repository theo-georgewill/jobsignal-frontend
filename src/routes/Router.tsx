// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';
import JobsPage from '@/pages/jobs/JobsPage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import CompaniesPage from '@/pages/company/CompaniesPage';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AdminRoute from '@/components/shared/AdminRoute';
import CompanyDetailsPage from '@/pages/company/CompanyDetailsPage';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboards/Dashboard')));

const IngestionPage = Loadable(
  lazy(() => import('../pages/ingestion/IngestionPage'))
);

const IngestionSources = Loadable(
  lazy(() => import('../pages/ingestion/SourcesPage'))
);

const IngestionHistory = Loadable(
  lazy(() => import('../pages/ingestion/HistoryPage'))
);

const IngestionLogs = Loadable(
  lazy(() => import('../pages/ingestion/LogsPage'))
);

const IngestionSettings = Loadable(
  lazy(() => import('../pages/ingestion/SettingsPage'))
);

// utilities
const Typography = Loadable(lazy(() => import('../pages/typography/Typography')));
const Table = Loadable(lazy(() => import('../pages/tables/Table')));
const Form = Loadable(lazy(() => import('../pages/forms/Form')));
const Shadow = Loadable(lazy(() => import('../pages/shadows/Shadow')));

// icons
const Solar = Loadable(lazy(() => import('../pages/icons/Solar')));

// authentication
const Login = Loadable(lazy(() => import('../pages/auth/login/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/register/Register')));
const SamplePage = Loadable(lazy(() => import('../pages/sample-page/SamplePage')));
const Error = Loadable(lazy(() => import('../pages/auth/error/Error')));

const Router = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', exact: true, element: <Dashboard /> },
      { path: '/jobs', element: <JobsPage /> },
      { path: '/applications', element: <ApplicationsPage /> },
      { path: '/ui/typography', exact: true, element: <Typography /> },
      { path: '/ui/table', exact: true, element: <Table /> },
      { path: '/ui/form', exact: true, element: <Form /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <FullLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: 'ingestion',
        element: <IngestionPage />,
      },
      {
        path: 'ingestion/sources',
        element: <IngestionSources />,
      },
      {
        path: 'ingestion/history',
        element: <IngestionHistory />,
      },
      {
        path: 'ingestion/logs',
        element: <IngestionLogs />,
      },
      {
        path: 'ingestion/settings',
        element: <IngestionSettings />,
      },
      {
        path: 'companies',
        element: <CompaniesPage />
      },
      {
        path: 'companies/:id',
        element: <CompanyDetailsPage />
      },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
    ],
  },
];

const router = createBrowserRouter(Router, { basename: '/' });
export default router;
