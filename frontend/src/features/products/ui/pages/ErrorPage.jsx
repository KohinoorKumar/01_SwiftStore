import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 500;

  const title =
    status === 404
      ? "Page Not Found"
      : "Something Went Wrong";

  const message =
    status === 404
      ? "The page you're looking for doesn't exist or may have been moved."
      : error?.data || error?.message || "Please try again later.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg text-center">
        {/* Error Code */}
        <p className="text-7xl font-bold tracking-tight text-gray-900">
          {status}
        </p>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>

        {/* Message */}
        <p className="mt-3 text-gray-500">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Go Home
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;