import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../../assets/images';
import { LoginUsers } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { LoginSuccess } from '../../redux/slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: LoginUsers,
    onSuccess: (data) => {
      dispatch(LoginSuccess({ user: data.user, token: data.token }));
      setIsPending(false);
      navigate('/');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Login failed');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
    setIsPending(true);
  };


  return (
    <div className="min-h-screen flex-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <Link to="/">
          <img
            className="mb-4 mx-auto h-[170px] w-[170px] object-contain"
            src={images.logo}
            alt="logo"
          />
        </Link>
        <p className="text-center text-dark-gray mb-6">
          Please sign in to your account to continue shopping.
        </p>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="mb-4">
          <input
            type="email"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-dark-brown rounded focus:outline-none focus:border-2 focus:border-[#FA801D] transition-colors duration-300"
          />
          <input
            type="password"
            required
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-4 border border-dark-brown rounded focus:outline-none focus:border-2 focus:border-[#FA801D] transition-colors duration-300"
          />
          {!isPending &&
            <button
              type="submit"
              className="mt-4 w-full bg-dark-brown text-white p-3 rounded bg-[#03498f] transition-colors duration-300"
            >
              Sign In
            </button>
          }
          {isPending && <button
            className="mt-4 w-full bg-dark-brown text-white p-3 rounded bg-[#03498f] transition-colors duration-300"
            disabled>
            Signing in...
          </button>}
        </form>

        <div className="text-center text-dark-gray">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up here
            </Link>.
          </p>
          <p className="text-sm mt-2">
            Forgot your password?{' '}
            <Link to="/reset-password" className="text-blue-500 hover:underline">
              Reset it here
            </Link>.
          </p>
          <p className="text-xs mt-4">
            By logging in, you agree to our{' '}
            <Link to="/terms" className="underline">
              Terms and Conditions
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
