import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import DeleteFirm from "../components/DeleteFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/forms/Welcome";
import AllProducts from "../components/AllProducts";
import UserDetails from "../components/forms/UserDetails";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogOut(true);
    }
  }, []);

  useEffect(() => {
    const firmDetails = JSON.parse(localStorage.getItem("firmDetails"));
    const { vendorFirmName } = firmDetails || {};

    if (!vendorFirmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const logOutHandler = () => {
    const confirmation = confirm("Are you sure, you want to Logout?");
    if (!confirmation) return;
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmDetails");
    localStorage.removeItem("userDetails");
    setShowLogOut(false);
    setShowFirmTitle(true);
    window.location.reload();
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowDelete(false);
    setShowDetails(false);
  };
  const showUserDetails = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowDelete(false);
    setShowDetails(true);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowDelete(false);
    setShowDetails(false);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      setShowFirm(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowDelete(false);
      setShowDetails(false);
    } else {
      alert("Please login to continue");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      setShowProduct(true);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowDelete(false);
      setShowDetails(false);
    } else {
      alert("Please login to continue");
      setShowLogin(true);
    }
  };
  const showWelcomeHandler = () => {
    setShowProduct(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowWelcome(true);
    setShowAllProducts(false);
    setShowDelete(false);
    setShowDetails(false);
  };
  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowProduct(false);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowDelete(false);
      setShowDetails(false);
      setShowAllProducts(true);
    } else {
      alert("Please login to continue");
      setShowLogin(true);
    }
  };
  const showDeleteHandler = () => {
    setShowProduct(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowDelete(true);
    setShowDetails(false);
  };

  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
            showDeleteHandler={showDeleteHandler}
            showUserDetails={showUserDetails}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && showLogOut && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showDelete && showFirmTitle && (
            <DeleteFirm showLoginHandler={showLoginHandler} />
          )}
          {showDetails && showLogOut && <UserDetails />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
