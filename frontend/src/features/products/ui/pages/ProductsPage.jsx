import { useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
export default function ProductsPage() {
  const { products = [] } = useLoaderData(),
    { isAuthenticated } = useAuth(),
    nav = useNavigate(),
    [sp] = useSearchParams(),
    [search, setSearch] = useState(sp.get("search") || "");
  function s(e) {
    e.preventDefault();
    nav(
      search ? `/products?search=${encodeURIComponent(search)}` : "/products",
    );
  }
  return (
    <section>
      <div className="heading">
        <div>
          <p className="eyebrow">Store</p>
          <h1>Discover products</h1>
          <p>Browse products from the Shopy community.</p>
        </div>
        {isAuthenticated && (
          <Link className="btn primary" to="/dashboard/products/new">
            + Add Product
          </Link>
        )}
      </div>
      <form className="search" onSubmit={s}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn">Search</button>
      </form>
      {products.length ? (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No products found</h2>
          <p>Try another search.</p>
        </div>
      )}
    </section>
  );
}
