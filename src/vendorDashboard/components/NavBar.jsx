import React from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogOut,
  logOutHandler,
}) => {
  const firmDetails = JSON.parse(localStorage.getItem("firmDetails"));
  const { vendorFirmName } = firmDetails || {};

  return (
    <div className="navSection">
      <div className="company" onClick={() => window.location.reload()}>
        Vendor Dashboard
      </div>
      <div className="firmName">
        <h4>Firmname: {vendorFirmName}</h4>
      </div>
      <div className="userAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler}>Login / </span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logOutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
