/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

import { loginUser } from '../../services/AuthService'; 

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value.trim();

    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${email}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Event Scheduler | Login</title>
      </Helmet>

      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={loading}
                autoComplete="username"
                className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={loading}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold
                bg-gradient-to-r from-teal-500 to-teal-600
                hover:from-teal-600 hover:to-teal-700
                focus:outline-none focus:ring-4 focus:ring-teal-300
                transition duration-300 ease-in-out
                ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 text-sm">
            New to Event Scheduler?{' '}
            <Link to="/signUp" className="text-teal-600 font-semibold hover:text-teal-800">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-tr from-teal-400 to-blue-600">
          <img
            src="https://d3nn873nee648n.cloudfront.net/1200x1800-new/20732/SM1072546.jpg"
            alt="Event Scheduler Login"
            className="object-cover w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
