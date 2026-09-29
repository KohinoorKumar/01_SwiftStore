import React, { useState } from "react";
import {
  // Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  User,
  Mail,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuthHook";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {register, handleSubmit, errors, loginForm, navigate} = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">

        {/* Login Card */}
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden bg-indigo-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">

            <div>
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600">
                  <ShoppingBag size={24} />
                </div>

                <span className="text-2xl font-bold">
                  Shopy
                </span>
              </div>

              {/* Content */}
              <div className="mt-20">
                <h1 className="text-4xl font-bold leading-tight">
                  Welcome
                  <br />
                  back!
                </h1>

                <p className="mt-6 max-w-md text-lg leading-7 text-indigo-100">
                  Login to your account and continue exploring
                  our collection of products.
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="text-sm text-indigo-200">
              © 2026 Shopy. All rights reserved.
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 sm:p-10 lg:p-12">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <ShoppingBag size={22} />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Productly
              </span>
            </div>

            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Login to your account to continue.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(loginForm)} className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        noSpaces: (v) =>
                          !/\s/.test(v) ||
                          "Please remove any spaces from your email address.",
                        hasAt: (v) =>
                          v.includes("@") ||
                          "Please include an '@' in the email address.",
                        hasDomain: (v) =>
                          /@[a-zA-Z0-9.-]+/.test(v) ||
                          "Please include a domain after the '@'.",
                        hasExtension: (v) =>
                          /\.[a-zA-Z]{2,}$/.test(v) ||
                          "Please include a valid extension like .com or .org.",
                        fullMatch: (v) =>
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                            v,
                          ) ||
                          "Please enter a valid email address (e.g., name@example.com).",
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  {/* <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    {...register("password", {
                        required: "Password is required.",
                        // validate: {
                        //     minLength: (v) => v.length >= 8 || "Password must be at least 8 characters long.",
                        //     hasUpper: (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter.",
                        //     hasLower: (v) => /[a-z]/.test(v) || "Password must contain at least one uppercase letter.",
                        //     hasNumber: (v) => /[0-9]/.test(v) || "Password must contain at least one number.",
                        //     hasSpecial: (v) => /[^A-Za-z0-9]/.test(v) || "Password must contain at least one special character (e.g., !, @, #).",
                        // }
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99]"
              >
                Login
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/register")}
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;