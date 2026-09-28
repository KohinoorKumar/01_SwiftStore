import { useLoaderData, useRevalidator, Link } from "react-router";
import { deleteProduct } from "../api/products";
import ProductCard from "../components/ProductCard";
export default function DashboardPage() {
  const { products = [] } = useLoaderData(),
    rev = useRevalidator();
  async function del(p) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    try {
      await deleteProduct(p._id);
      rev.revalidate();
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  }
  return (
    <section>
      <div className="heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>My Products</h1>
          <p>Manage the products you created.</p>
        </div>
        <Link className="btn primary" to="/dashboard/products/new">
          + Add Product
        </Link>
      </div>
      {products.length ? (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} manage onDelete={del} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No products yet</h2>
          <Link className="btn primary" to="/dashboard/products/new">
            Create Product
          </Link>
        </div>
      )}
    </section>
  );
}
