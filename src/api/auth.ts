// src/api/auth.ts

import { apiClient } from './client';
import { useAuthStore } from '@/store/auth';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  userId: string;
  email: string;
  role: "admin" | "user";
};

export type LoginResponse = {
  access_token: string;
  user: AuthUser
};

export async function login(
  data: LoginPayload
): Promise<LoginResponse> {
  const res =
    await apiClient.post<LoginResponse>(
      '/auth/login',
      data
    );

  return res.data;
}

export async function register(
  data: RegisterPayload
) {
  const res = await apiClient.post(
    '/auth/register',
    data
  );

  return res.data;
}

export async function getMe(): Promise<AuthUser> {
  const res =
    await apiClient.get<AuthUser>(
      '/auth/me'
    );

  return res.data;
}

export async function hydrateUser() {
  try {
    const user = await getMe();

    useAuthStore
      .getState()
      .setUser(user);

    return user;
  } catch (error) {
    useAuthStore
      .getState()
      .logout();

    throw error;
  }
}

export function logout() {
  useAuthStore.getState().logout();
}