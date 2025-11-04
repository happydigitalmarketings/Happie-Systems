import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate(); 
  const handleGoHome = () => {
    navigate("/"); 
  };
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
    }}>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="btn btn-outline-dark" onClick={handleGoHome}>Go Home</button>
    </div>
  );
}

export default NotFoundPage;
