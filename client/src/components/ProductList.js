import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

function ProductList({ products, onDelete, isAuthenticated}) {
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (product) => {
    setEditingProduct(product);
    navigate("/add-product", { state: { product } });
    // navigate("/add-product");
  };
  const handleCancelEdit = () => {
    setEditingProduct(null);
    navigate("/"); // Navigate back to the product list or wherever appropriate
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}         
          product={product}
          onEdit={handleEdit} // Ensure onEdit is a function that handles editing
          onDelete={onDelete}
          isAuthenticated={isAuthenticated} 
        />
      ))}
    </div>
  );
}

export default React.memo(ProductList);
