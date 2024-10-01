import React from "react";

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
  showDeleteHandler,
  showUserDetails,
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {!showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ""}
        <li onClick={showProductHandler}>Add Products</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li onClick={showUserDetails}>User Details</li>
        {showFirmTitle ? <li onClick={showDeleteHandler}>Delete Firm</li> : ""}
      </ul>
    </div>
  );
};

export default SideBar;
