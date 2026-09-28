import { useLoaderData, useNavigate, Link } from "react-router";
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import { updateProduct } from "../api/products";
export default function EditProductPage() {
  const p = useLoaderData(),
    nav = useNavigate(),
    [busy, setBusy] = useState(false);
  async function submit(x) {
    setBusy(true);
    try {
      const r = await updateProduct(p._id, x),
        u = r.product ?? r.data ?? r;
      nav(u ? `/products/${u._id}` : "/dashboard", { replace: true });
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="form-page">
      <Link to="/dashboard">← Dashboard</Link>
      <div className="heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Edit Product</h1>
        </div>
      </div>
      <ProductForm
        initialProduct={p}
        onSubmit={submit}
        submitLabel="Save Changes"
        submitting={busy}
      />
    </section>
  );
}
