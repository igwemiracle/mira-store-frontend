import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../../assets/images';
import { useMutation } from '@tanstack/react-query';
import { RegisterUsers } from '../../services/authService';
import { LoginSuccess } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const mutation = useMutation({
    mutationFn: RegisterUsers,
    onSuccess: (data) => {
      dispatch(LoginSuccess({ user: data.user, token: data.token }));
      setIsPending(false);
      navigate('/');
    },
    onError: (err) =>
      setError(err.response?.data?.message || 'Registration failed'),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Check if user with same email exists
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Proceed with registration
    setError('');


    mutation.mutate({ name, email, password });
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
          Create your account to start shopping.
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="mb-4 space-y-4">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-dark-brown rounded focus:outline-none focus:border-2 focus:border-[#FA801D] transition-colors duration-300"
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-dark-brown rounded focus:outline-none focus:border-2 focus:border-[#FA801D] transition-colors duration-300"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-dark-brown rounded focus:outline-none focus:border-2 focus:border-[#FA801D] transition-colors duration-300"
          />
          <input
            type="password"
            required
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-dark-brown rounded focus:outline-none focus:border-2 focus:border-[#FA801D] transition-colors duration-300"
          />
          {!isPending &&
            <button
              type="submit"
              className="mt-4 w-full bg-dark-brown text-white p-3 rounded bg-[#03498f] transition-colors duration-300">
              Sign Up
            </button>
          }


          {isPending && <button
            className="mt-4 w-full bg-dark-brown text-white p-3 rounded bg-[#03498f] transition-colors duration-300"
            disabled>
            Signing up...
          </button>}
        </form>

        <div className="text-center text-dark-gray">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in here
            </Link>.
          </p>
          <p className="text-xs mt-2">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-blue-500 hover:underline">
              Terms and Conditions
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
