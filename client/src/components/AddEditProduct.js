import React, { useState, useEffect, useRef } from "react";
import "../styles/AddEditProduct.css";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

function AddEditProduct({ onCancel }) {
  const location = useLocation();
  const product = location.state?.product; // Access the product from state

  const [editingProduct, setEditingProduct] = useState(null);

  const [paymentMode, setPaymentMode] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const notify = () => toast("Product saved successfully");

  const onSave = async (productData) => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData, setLoading);

        setEditingProduct(null);
      } else {
        await createProduct(productData, setLoading);
      }
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    availableStatus: false,
    price: "",
    onlinePrice: "",
    dealerPrice: "",
    dealerName: "",
    paymentMode: null,
    imageFile: null,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        brand: product.brand,
        availableStatus: product.availableStatus,
        price: product.price,
        onlinePrice: product.onlinePrice,
        dealerPrice: product.dealerPrice,
        dealerName: product.dealerName,
        paymentMode: product.paymentMode,
        imageFile: product.imageFile,
        previewUrl: product.imageFile ? `${product.imageFile}` : null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
        previewUrl: previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("price", formData.price);
    formPayload.append("availableStatus", formData.availableStatus);
    formPayload.append("brand", formData.brand);
    formPayload.append("onlinePrice", formData.onlinePrice);
    formPayload.append("dealerPrice", formData.dealerPrice);
    formPayload.append("dealerName", formData.dealerName);
    formPayload.append("paymentMode", formData.paymentMode);
    if (formData.imageFile) {
      formPayload.append("imageFile", formData.imageFile);
    }

    console.log("formdaya", formData.imageFile);

    if (
      !formData.price ||
      !formData.onlinePrice ||
      !formData.title ||
      !formData.description ||
      !formData.brand ||
      !formData.paymentMode ||
      !formData.dealerPrice
    ) {
      return toast.error(
        "TItle, Description, Price, Online Price and payment Mode are required."
      );
    }
    setEditingProduct(formPayload);

    try {
      await onSave(formPayload);

      setFormData({
        title: "",
        description: "",
        brand: "",
        availableStatus: false,
        price: "",
        onlinePrice: "",
        dealerPrice: "",
        imageFile: null,
        paymentMode: "",
        previewUrl: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Product saved successfully!", {
        autoClose: 300,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      toast.error("Failed to save product. Please try again.", {
        autoClose: 300,
      });
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="add-edit-product">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>

       {loading ?  <LoadingSpinner /> :   <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3 mt-3">
          <label className="form-check-label float-start">
            Stock available status{" "}
          </label>

          <input
            className="form-check-input"
            type="checkbox"
            name="availableStatus"
            checked={formData.availableStatus}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label for="email" className="form-label">
            {" "}
            Title:
          </label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-3" style={{ height: "600px" }}>
          <label className="form-label"> Description: </label>
          <ReactQuill
            theme="snow"
            style={{ height: "500px" }}
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Brand </label>

          <select
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            <option value="">Please select the brand</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Lenovo">Lenovo</option>
          </select>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Price: </label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Online Price:</label>
          <input
            className="form-control"
            type="number"
            name="onlinePrice"
            value={formData.onlinePrice}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Dealer Price:</label>
          <input
            className="form-control"
            type="number"
            name="dealerPrice"
            value={formData.dealerPrice}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Brand :</label>

          <select
            className="form-control"
            name="dealerName"
            value={formData.dealerName}
            onChange={handleChange}
            required
          >
            <option value="">Please select dealer name</option>
            <option value="Prime Computers">Prime Computers</option>
            <option value="JP Computers">JP Computers</option>
            <option value="FlipCart Computers">FlipCart Computers</option>
            <option value="AK Infotech">AK Infotech</option>
          </select>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Image:</label>

          {formData.previewUrl && (
            <img
              src={formData.previewUrl}
              alt={formData.title}
              style={{ height: "200px", width: "auto", marginBottom: "10px" }}
            />
          )}

          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            accept="image/*"
            required={!product}
            ref={fileInputRef}
          />
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Payment Mode:</label>

          <select
            className="form-control"
            value={formData.paymentMode}
            name="paymentMode"
            onChange={handleChange}
            required
          >
            <option value="">Please select mode</option>
            <option value="COD">COD</option>
            <option value="EMI">EMI</option>
            <option value="PAID">PAID</option>
          </select>
        </div>

        <div className="buttons">
          <button type="submit">
            {product ? "Save Changes" : "Add Product"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>  }

   
      <ToastContainer />
    </div>
  );
}

export default AddEditProduct;
