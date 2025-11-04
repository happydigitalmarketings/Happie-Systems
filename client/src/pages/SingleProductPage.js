import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios or your preferred HTTP library
import "../styles/SingleProductPage.css";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/Spinner";
import ShareButton from "../components/ShareButton";
import PlaceOrder from "../components/placeorder/PlaceOrder";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function SingleProductPage({ isAuthenticated }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${API_URL}api/products/${id}`); // Adjust the API endpoint
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleBackClick = () => {
    const isInternalReferrer = document.referrer && document.referrer.includes(window.location.origin);
    if (isInternalReferrer) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };


  if (!product) {
    return <LoadingSpinner />;
  }
  const productUrl = `${window.location.origin}/product/${product._id}`;

  //const imageSrc = `${API_URL}${product.imageFile}`;
  return (
    <div className="single-product-page">
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back
      </button>
      <div className="product-image">
        <img src={product.imageFile} alt={product.title} />
      </div>

      
      <div className="product-details">
        <h2>{product.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />


        <p>
          <span>Brand: </span>{" "}
          <span>
          <strong>{product.brand} </strong>
          </span>
        </p>



        <p className="pt-20">
          <strong>Price: ₹{product.price.toLocaleString()}/-</strong>
        </p>
        <p>
          <span>Online Price: </span>{" "}
          <span className="online-price">
            ₹{product.onlinePrice.toLocaleString()}/-{" "}
          </span>
        </p>

        {isAuthenticated && (
          <>
            <p>
              <span>Dealer Price: </span>
              <span>
                <strong>₹{product.dealerPrice.toLocaleString()}/- </strong>{" "}
              </span>
            </p>
            <p>
              <span>Dealer Name: </span>
              <span>
                <strong>{product.dealerName} </strong>{" "}
              </span>
            </p>
          </>
        )}
        <div className="product-buttons">
          <ShareButton
            title={product.title}
            description={product.description}
            url={productUrl} // Replace with your product URL
          />

       

          {/* <PlaceOrder   
          title={product.title}
          description={product.description}
          price = {product.price}/> */}
          {/* <button className="buy-now">Buy Now</button>
          <button className="add-to-cart">Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
