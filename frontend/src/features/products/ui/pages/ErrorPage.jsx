import React from "react";

import { Link, useRouteError } from "react-router";
export default function ErrorPage() {
  const e = useRouteError();
  return (
    <section className="empty">
      <p className="eyebrow">Error {e?.status || 500}</p>
      <h1>Something went wrong</h1>
      <p>{e?.statusText || e?.message || "Unable to load this page."}</p>
      <Link className="btn primary" to="/products">
        Back to products
      </Link>
    </section>
  );
}
