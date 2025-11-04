import React, { useState } from "react";

import "../styles/ProductFilter.css";

const ProductFilter = ({ filters, onFilterChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const handleFilterChange = (range) => {
    const newSelection = selectedPriceRange === range ? "res" : range;
    setSelectedPriceRange(newSelection);
    onFilterChange(newSelection);
  };

  const handleClearAll = () => {
    setSelectedPriceRange("");
    onFilterChange({});
  };

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          paddingBottom: "15px",
        }}
      >
        <h2>Top Brands </h2>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => onFilterChange("DELL")}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            Dell
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => onFilterChange("HP")}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            HP
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => onFilterChange("LENOVO")}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            Lenovo
          </label>
        </div>

        <h2>Price </h2>

        {selectedPriceRange && (
          <div className="clear-all" onClick={handleClearAll}>
            ✕ Clear all
          </div>
        )}
        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleFilterChange("under15000")}
            checked={filters.priceRange === "under15000"}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            under15000
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleFilterChange("16000to20000")}
            checked={filters.priceRange === "16000to20000"}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            ₹16,000 - ₹20,000
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleFilterChange("25000to30000")}
            checked={filters.priceRange === "25000to30000"}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            ₹25,000 - ₹30,000
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleFilterChange("35000to40000")}
            checked={filters.priceRange === "35000to40000"}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            ₹35,000 - ₹40,000
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleFilterChange("45000to50000")}
            checked={filters.priceRange === "45000to50000"}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            ₹45,000 - ₹50,000
          </label>
        </div>

        <div className="form-check text-start">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleFilterChange("above50000")}
            checked={filters.priceRange === "above50000"}
          />
          <label className="form-check-label" htmlFor="filterEMI">
            Above ₹50,000
          </label>
        </div>

      
        {/* <h2> Payemnt Mode </h2> */}

        {/* 
      <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("EMI")}
        />

        <label className="form-check-label" htmlFor="inlineCheckbox1">
          EMI
        </label>
      </div>

       <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("PAID")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
          PAID
        </label>
      </div>
 */}
      </div>
    </>
  );
};

export default React.memo(ProductFilter);
