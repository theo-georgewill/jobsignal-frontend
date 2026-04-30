// src/views/auth/authforms/AuthLogin.tsx

import { useState } from 'react';
import {
  Button,
  Checkbox,
  Label,
  TextInput,
} from 'flowbite-react';

import {
  Link,
  useNavigate,
} from 'react-router';

import {
  login
} from '@/api/auth';

import { useAuthStore } from '@/store/auth';

const AuthLogin = () => {
  const navigate = useNavigate();

  const loginStore =
    useAuthStore((s) => s.login);

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const data = await login({
        email,
        password,
      });

      loginStore(data.access_token, data.user);

      navigate('/');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email"
          />
        </div>

        <TextInput
          id="email"
          type="email"
          sizing="md"
          required
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="form-control form-rounded-xl"
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Password"
          />
        </div>

        <TextInput
          id="password"
          type="password"
          sizing="md"
          required
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="form-control form-rounded-xl"
        />
      </div>

      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            className="checkbox"
          />

          <Label
            htmlFor="remember"
            className="opacity-90 font-normal cursor-pointer"
          >
            Remember this Device
          </Label>
        </div>

        <Link
          to="/"
          className="text-primary text-sm font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      <Button
        type="submit"
        color="primary"
        disabled={loading}
        className="w-full bg-primary text-white rounded-xl"
      >
        {loading
          ? 'Signing in...'
          : 'Sign in'}
      </Button>
    </form>
  );
};

export default AuthLogin;