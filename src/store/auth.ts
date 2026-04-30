import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'admin' | 'user';

type User = {
  userId: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;

  isAdmin: () => boolean;
};

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set, get) => ({
        token: null,
        user: null,
        isAuthenticated: false,

        login: (token, user) =>
          set({
            token,
            user,
            isAuthenticated: true,
          }),

        logout: () =>
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          }),

        setUser: (user) =>
          set({ user }),

        isAdmin: () => get().user?.role === 'admin',
      }),
      {
        name: 'jobsignal-auth',
      }
    )
  );