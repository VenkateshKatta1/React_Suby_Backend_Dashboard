import React, { useState, useEffect } from "react";
import { API_URL } from "../../data/apiPath";

const UserDetails = () => {
  const [firmArea, setFirmArea] = useState(null);
  const [firmImage, setFirmImage] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const firmDetails = JSON.parse(localStorage.getItem("firmDetails"));
  const { vendorName, vendorCreatedTime, vendorId } = userDetails;
  const { vendorFirmName } = firmDetails || {};

  const formattedDate = vendorCreatedTime
    ? new Date(vendorCreatedTime).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No creation time available";

  useEffect(() => {
    const fetchFirmDetails = async () => {
      if (!vendorId) return;

      try {
        const response = await fetch(
          `${API_URL}/vendor/single-vendor/${vendorId}`
        );
        const data = await response.json();

        if (response.ok) {
          setFirmArea(data.firmArea);
          setFirmImage(data.firmImage);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch firm details:", error);
      }
    };

    fetchFirmDetails();
  }, [vendorId]);

  return (
    <div className="userDetails">
      <h3>Vendor: {vendorName}</h3>
      <h3>Firm: {vendorFirmName || "No firm added, add your firm"}</h3>
      <h3>Area: {firmArea || "Area not available"}</h3>
      {firmImage ? (
        <img
          style={{ width: "20%", height: "40%" }}
          src={`${API_URL}/uploads/${firmImage}`}
        />
      ) : (
        ""
      )}
      <h3>Joined SUBY on {formattedDate}</h3>
    </div>
  );
};

export default UserDetails;
