import React from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/store/auth";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const { user, token } = useAuthStore();

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}