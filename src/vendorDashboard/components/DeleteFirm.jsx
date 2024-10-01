import React, { useState } from "react";
import { API_URL } from "../data/apiPath";

const DeleteFirm = ({ showLoginHandler }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = async () => {
    const confirmation = window.confirm(
      `Are you sure you want to delete your firm?`
    );
    if (!confirmation) return;

    const loginToken = localStorage.getItem("loginToken");
    const firmDetails = JSON.parse(localStorage.getItem("firmDetails"));
    const { vendorFirmId } = firmDetails || {};

    if (!vendorFirmId || !loginToken) {
      alert("No firm or user found");
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`${API_URL}/firm/delete/${vendorFirmId}`, {
        method: "DELETE",
        headers: {
          token: `${loginToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        alert("Firm deleted successfully");
        localStorage.removeItem("firmDetails");
        // localStorage.removeItem("loginToken");
        // localStorage.removeItem("userDetails");
        showLoginHandler();
      } else {
        const errorData = await response.json();
        alert("Error deleting the firm");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while deleting firm");
    } finally {
      setIsDeleting(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <button onClick={deleteHandler} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Firm"}
      </button>
    </div>
  );
};

export default DeleteFirm;
