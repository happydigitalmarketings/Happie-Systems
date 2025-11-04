import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product, onEdit, onDelete, isAuthenticated }) {
  //const imageSrc = `${process.env.REACT_APP_BACKEND_URL}${product.imageFile}`;

  const handleEdit = () => {
    onEdit(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageFile} alt={product.title} />
      </div>

      <div className="available-wrapper">
        {
          product.availableStatus ? (

    
        <div className="available">
         Available 
         </div>) : 
         ( <div className="not-available">
          Not Available 
         </div>)
        }
           
       
         
         </div>
      <div className="product-details">
        <p>
          <b>{product.title} </b>
        </p>
        <h3>
          {" "}
          <strong> Price: ₹{product.price.toLocaleString()} </strong> 
          <p><span> OnlinePrice: </span>
          <span className="online-price">₹{product.onlinePrice.toLocaleString()} </span></p>
        </h3>
      </div>
      <div className="product-actions">

      {isAuthenticated && (
        
        <>
          <button className="btn btn-primary ms-2" onClick={handleEdit}>
            Edit
          </button>
        
        <button
          className="btn btn-danger  ms-2"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </>
      )}

        <button className="btn btn-danger  ms-2">
          {" "}
          <Link to={`/product/${product._id}`}>View Details</Link>{" "}
        </button>

        {/* Add this link */}
      </div>
    </div>
  );
}

export default ProductCard;
