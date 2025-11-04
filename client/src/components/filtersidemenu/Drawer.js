import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/Drawer.css";
import ProductFilter from "../ProductFilter";
import CloseButton from "react-bootstrap/CloseButton";

const Drawer = ({ filters, onFilterChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Button
        className="d-md-none"
        onClick={toggleDrawer}
        variant="outline-secondary"
      >
        Filters
      </Button>
      <Button
        className="d-md-none"
        onClick={toggleDrawer}
        variant="outline-secondary"
      >
        Brands
      </Button>
      <Button
        className="d-md-none"
        onClick={toggleDrawer}
        variant="outline-secondary"
      >
        Price Range{" "}
      </Button>

      {/* Drawer */}
      <div
        className={`drawer d-md-none ${isDrawerOpen ? "open" : ""}`}
        style={{ display: isDrawerOpen ? "block" : "none" }}
      >
        <div className="drawer-header">
          <div
            onClick={toggleDrawer} // Close the drawer
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1001, // Ensure it's above other elements
            }}
          >
            <CloseButton />
          </div>
        </div>

        {/* Your filter component */}
        <div className="filter-content">
          <ProductFilter filters={filters} onFilterChange={onFilterChange} />
        </div>
        <div
          onClick={toggleDrawer}
          className="apply-btn"
        >
          Apply
        </div>
      </div>
    </div>
  );
};

export default React.memo(Drawer);
