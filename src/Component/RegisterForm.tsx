/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { registerUser } from "../services/AuthService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data);
  console.log("RegisterForm rendered", res);
      // If fetch returned an Error object, show generic error toast
      if (res instanceof Error) {
        toast.error(res.message || "Registration failed");
        return;
      }

      if (res?.success) {
        toast.success(res?.message || "Registration successful");
        reset();
        navigate("/signin");
      } else {
        // Show backend error message if available
        toast.error(res?.Error || "Registration failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Registration failed");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register | EventScheduler</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register for an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create your account to get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6 bg-white p-8 rounded shadow"
          >
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                placeholder="Your username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              {errors.username && (
                <span className="text-red-600 text-sm">{errors.username.message as string}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">{errors.email.message as string}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">{errors.password.message as string}</span>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-teal-600 hover:text-teal-500">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
