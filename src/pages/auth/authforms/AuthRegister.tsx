// src/views/auth/authforms/AuthRegister.tsx

import { useState } from 'react';
import {
  Button,
  Label,
  TextInput,
} from 'flowbite-react';

import { useNavigate } from 'react-router';

import {
  register,
  login,
  hydrateUser,
} from '@/api/auth';

import { useAuthStore } from '@/store/auth';

const AuthRegister = () => {
  const navigate = useNavigate();

  const loginStore =
    useAuthStore((s) => s.login);

  const [name, setName] =
    useState('');

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
      await register({
        email,
        password,
      });

      const auth = await login({
        email,
        password,
      });

      loginStore(
        auth.access_token,
        auth.user
      );

      await hydrateUser();

      navigate('/');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Registration failed'
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
            htmlFor="name"
            value="Name"
          />
        </div>

        <TextInput
          id="name"
          type="text"
          sizing="md"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="form-control form-rounded-xl"
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email Address"
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

      <div className="mb-6">
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

      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      <Button
        color="primary"
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? 'Creating account...'
          : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthRegister;