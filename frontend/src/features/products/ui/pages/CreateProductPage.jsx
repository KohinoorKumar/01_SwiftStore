import React from "react";
import { Link, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
export default function CreateProductPage() {
    const nav = useNavigate()
    
  

  return (
    <section className="form-page">
      <Link to="/dashboard">← Dashboard</Link>
      <div className="heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Create Product</h1>
        </div>
      </div>
      <ProductForm />
    </section>
  );
}
