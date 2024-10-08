import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="errorSection">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" style={{ fontSize: "1.5rem", color: "darkblue" }}>
        <p>Go Back</p>
      </Link>
    </div>
  );
};

export default NotFound;
