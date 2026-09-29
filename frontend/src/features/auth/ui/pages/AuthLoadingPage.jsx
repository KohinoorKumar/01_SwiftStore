import React from "react";
import { ShoppingBag } from "lucide-react";

const AuthLoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900">
          <ShoppingBag className="h-8 w-8 text-white" />
        </div>

        <h1 className="text-xl font-bold text-gray-900">
          Shopy
        </h1>

        <div className="mt-5 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-900 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-900 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-900" />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Restoring your session...
        </p>
      </div>
    </div>
  );
};

export default AuthLoadingPage;