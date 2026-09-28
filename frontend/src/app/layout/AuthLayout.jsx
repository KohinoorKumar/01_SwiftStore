import { Link, Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <div className="auth">
      <Link className="brand" to="/products">
        Shopy
      </Link>
      <Outlet />
    </div>
  );
}
