import React from "react";
import { NavLink, Outlet} from "react-router";



export default function AppLayout() {
  
  return (
    <>
      <header>
        <NavLink className="brand" to="/products">
          Shopy
        </NavLink>
        <nav>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/dashboard">My Dashboard</NavLink>
        </nav>
        <div>
              <NavLink className="btn" to="/login">
                Login
              </NavLink>{" "}
              <NavLink className="btn primary" to="/register">
                Register
              </NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

