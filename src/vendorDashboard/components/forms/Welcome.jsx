import React from "react";
import AllProducts from "../AllProducts";

const Welcome = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { vendorName } = userDetails || {};
  return (
    <div>
      <h2>Welcome {vendorName}</h2>
      <br />
      <div>
        <h3>Your Firm Products</h3>
        <AllProducts />
      </div>
    </div>
  );
};

export default Welcome;
