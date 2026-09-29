import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutApi } from "../../features/auth/api/authApi";
import { removeUser } from "../../features/auth/state/authSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // console.log(user.name)

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout API failed:", error)
    } finally {
      dispatch(removeUser())

      navigate("/", {
        replace: true,
      });
    }

    
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Shopy
          </Link>

          {/* Navigation */}
          <nav className="ml-10 flex items-center gap-6">
            <NavLink
              to="/products"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              Products
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/main"
                className="text-sm font-medium text-gray-600 hover:text-black"
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User */}
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">
                    {user?.name || "User"}
                  </p>

                  {user?.email && (
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  )}
                </div>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;