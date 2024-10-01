import React from "react";

const UserDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const firmDetails = JSON.parse(localStorage.getItem("firmDetails"));
  const { vendorName, vendorCreatedTime } = userDetails;
  const { vendorFirmName } = firmDetails || {};

  const formattedDate = vendorCreatedTime
    ? new Date(vendorCreatedTime).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "No creation time available";

  return (
    <div>
      <h3>Vendor : {vendorName}</h3>
      <h3>
        Firm: {vendorFirmName ? vendorFirmName : "No firm added, add your firm"}
      </h3>
      <h3>Created on: {formattedDate}</h3>
    </div>
  );
};

export default UserDetails;
