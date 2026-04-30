import { Navigate } from 'react-router';
import { useAuthStore } from '@/store/auth';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated =
    useAuthStore(
      (s) => s.isAuthenticated
    );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  return children;
}