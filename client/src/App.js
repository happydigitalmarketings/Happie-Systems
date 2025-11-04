import React,  { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage.js";
import SingleProductPage from "./pages/SingleProductPage";
import "./styles/App.css";
import AddEditProduct from "./components/AddEditProduct.js";
import LoginPage from "./pages/LoginPage.js"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage isAuthenticated={isAuthenticated}  />} />      
          <Route path="/admin" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/add-product" element={<AddEditProduct />} />
          <Route path="/product/:productId" element={<SingleProductPage  isAuthenticated={isAuthenticated}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
