import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmDetails = JSON.parse(localStorage.getItem("firmDetails"));
    const { vendorFirmId } = firmDetails || {};

    try {
      const response = await fetch(
        `${API_URL}/product/${vendorFirmId}/products`
      );
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const deleteProductById = async (productId) => {
    const confirmation = confirm("Are you sure you want to delete?");
    if (!confirmation) return;

    try {
      const response = await fetch(`${API_URL}/product/delete/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      {!products || products.length === 0 ? (
        <p>No Products</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteProductById(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
