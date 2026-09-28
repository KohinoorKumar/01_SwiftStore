import { Link, useLoaderData } from "react-router";
export default function ProductDetailsPage() {
  const p = useLoaderData();
  return (
    <section>
      <Link to="/products">← Back</Link>
      <div className="detail">
        <img
          src={
            p.image ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000"
          }
        />
        <div>
          <p className="eyebrow">Product</p>
          <h1>{p.name}</h1>
          <h2>${Number(p.price || 0).toFixed(2)}</h2>
          <p>{p.stock} in stock</p>
          <p>{p.description}</p>
        </div>
      </div>
    </section>
  );
}
