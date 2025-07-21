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
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row md:items-center md:justify-center p-6">
      <Helmet>
        <title>Event Scheduler | Login</title>
      </Helmet>

      <div className="card md:w-1/2 max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-primaryColor">Login to Your Account</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="form-control">
            <label htmlFor="email" className="label-text font-semibold mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label-text font-semibold mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
              disabled={loading}
              autoComplete="current-password"
            />
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primaryColor hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full bg-primaryColor hover:bg-primaryColorDark transition-colors duration-300 font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          New here?{' '}
          <Link to="/signUp" className="text-primaryColor font-semibold hover:underline">
            Create a new account
          </Link>
        </p>

      
       
      </div>

      <div className="hidden md:block md:flex-1 ml-12">
        <img
          src="https://d3nn873nee648n.cloudfront.net/1200x1800-new/20732/SM1072546.jpg"
          alt="Event Scheduler Login"
          className="rounded-lg shadow-lg object-cover w-full h-[500px]"
        />
      </div>
    </div>
  );
};

export default SignIn;
