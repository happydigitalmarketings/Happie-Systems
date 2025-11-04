import React, { useState, useEffect, useRef, useCallback} from "react";
import ProductList from "../components/ProductList";
import { Link, Outlet } from "react-router-dom";
import AddEditProduct from "../components/AddEditProduct"; // Import the AddEditProduct component
import { getAllProducts, deleteProduct } from "../services/api"; // Import your CRUD functions
import "../styles/HomePage.css";
import SearchBar from "../components/SearchBar";
import { LoadingSpinner } from "../components/common/Spinner";
import ProductFilter from "../components/ProductFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Drawer from "../components/filtersidemenu/Drawer";
import { useQueryClient } from "@tanstack/react-query";

function HomePage({ isAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);  
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    DELL: false,
    HP: false,
    LENOVO: false,
    priceRange: null,
  });

  const debouncedSearch = useRef(
    debounce((query) => {
      if (query !== searchQuery) {
        setProducts([]); // Clear previous products only when the query changes
        setPage(1); // Reset to the first page
      }
    }, 1000)
  ).current;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", searchQuery, filters, page], // query key
    queryFn: () =>
      getAllProducts({
        search: searchQuery.trim(),
        page,
        filters,
      }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    console.log("useeffect");
    if (data?.products) {
      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]); // Append new products
      }
      setTotalProduct(data.total); 
      console.log(data.products);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPage(1);
    if (query.trim() === "") {
      setProducts([]);
    }

    // if (query.length >= 1 || query.length === 0) {
    //   setPage(1);

    //   debouncedSearch(query);
    // }
  };

  const handleFilterChange = (mode) => {
    if (["DELL", "HP", "LENOVO"].includes(mode)) {
      setFilters((prev) => ({
        ...prev,
        [mode]: !prev[mode],
      }));
    }

    const priceRanges = {
      under15000: "under15000",
      "16000to20000": "16000to20000",
      "25000to30000": "25000to30000",
      "35000to40000": "35000to40000",
      "45000to50000": "45000to50000",
      above50000: "above50000",
    };

    if (priceRanges[mode]) {
      setFilters((prev) => ({
        ...prev,
        priceRange: priceRanges[mode],
      }));
    } else {
      setFilters((prev) => {
        return {
          ...prev,
          priceRange: "",
        };
      });
    }

    setPage(1);
  };


  const handleDelete = async (productId) => {
    debugger;
    try {
      await deleteProduct(productId);
      queryClient.invalidateQueries(["products", searchQuery, filters]);
     
     setPage(1);

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container-Fluid>
      <div className="home-page">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="flex-grow-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>

          {isAuthenticated && (
            <Link to="/add-product">
              <button className="btn btn-primary ms-2">Add Product</button>
            </Link>
          )}
        </div>

        <div className="row">
          <div className="d-md-none d-flex justify-content-center product-filter-mobile">
            <Drawer filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="d-md-block d-none col-md-3">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="col-md-9">
            <Outlet />

            <InfiniteScroll
              dataLength={products.length}
              next={() => setPage((prevPage) => prevPage + 1)}
              hasMore={products.length < totalProduct}
              scrollThreshold={0.9}
              loader={isLoading ? <LoadingSpinner /> : <h4></h4>}
            >
              {products.length > 0 ? (
                <ProductList
                  products={products}
                  // onEdit={handleEdit}
                  onDelete={handleDelete}
                  isAuthenticated={isAuthenticated}
                />
              ) : isLoading ? (
                <LoadingSpinner />
              ) : (
                <p>No products found.</p>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Container-Fluid>
  );
}

export default HomePage;
