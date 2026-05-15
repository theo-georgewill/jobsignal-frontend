// src/App.tsx

import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';

import {
  Flowbite,
  ThemeModeScript,
} from 'flowbite-react';

import customTheme from './utils/theme/custom-theme';
import router from './routes/Router';

import Spinner from './pages/spinner/Spinner';

import {
  hydrateUser,
} from '@/api/auth';

import { useAuthStore } from '@/store/auth';

function App() {
  const token =
    useAuthStore((s) => s.token);

  const logout =
    useAuthStore((s) => s.logout);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const boot = async () => {
      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      try {
        await hydrateUser();
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    boot();
  }, [token, logout]);

  return (
    <>
      <ThemeModeScript />

      <Flowbite
        theme={{
          theme: customTheme,
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <RouterProvider
            router={router}
          />
        )}
      </Flowbite>
    </>
  );
}

export default App;