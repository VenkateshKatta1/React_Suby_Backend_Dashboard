import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import AddProduct from "./AddProduct"; // Import AddProduct component

const AddFirm = () => {
  const [vendorFirmName, setVendorFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [firmAdded, setFirmAdded] = useState(false); // Manage the view

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", vendorFirmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);

      category.forEach((value) => {
        formData.append("category", value);
      });

      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log("API response:", data);

      if (response.ok) {
        alert("Firm added successfully");
        window.location.reload();
        const vendorFirmId = data.vendorFirmId;
        if (vendorFirmId) {
          const firmDetails = { vendorFirmId, vendorFirmName };
          localStorage.setItem("firmDetails", JSON.stringify(firmDetails));

          setFirmAdded(true); // Change the view to AddProduct after success
        } else {
          console.error("firmId is missing");
        }
      } else if (data.message === "Vendor can have only one firm") {
        alert("Firm Exists 🥗. Only 1 firm can be added.");
      } else {
        alert("Failed to add Firm");
      }
    } catch (error) {
      console.error("Failed to add firm", error);
      alert("Failed to add Firm");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm Name</label>
        <input
          type="text"
          name="firmName"
          value={vendorFirmName}
          onChange={(e) => setVendorFirmName(e.target.value)}
        />
        <label>Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <label>Veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                value="veg"
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                value="non-veg"
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <div className="checkInp">
          <label>Region</label>
          <div className="inputscontainer">
            <div className="checkboxcontainer-region">
              <label>South-Indian</label>
              <input
                type="checkbox"
                value="south-indian"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxcontainer-region">
              <label>North-Indian</label>
              <input
                type="checkbox"
                checked={region.includes("north-indian")}
                value="north-indian"
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxcontainer-region">
              <label>Chinese</label>
              <input
                type="checkbox"
                checked={region.includes("chinese")}
                value="chinese"
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxcontainer-region">
              <label>Bakery</label>
              <input
                type="checkbox"
                checked={region.includes("bakery")}
                value="bakery"
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
