import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Login Response Data:", data); // Add this line to check the data returned

      if (response.ok) {
        setEmail("");
        setPassword("");
        alert("Login success");
        localStorage.setItem("loginToken", data.token);

        const vendorId = data.vendorId; // Ensure that vendorId is properly set
        console.log("Vendor ID:", vendorId); // Add this line to check the vendorId

        const vendorResponse = await fetch(
          `${API_URL}/vendor/single-vendor/${vendorId}`
        );
        const vendorData = await vendorResponse.json();
        console.log("Vendor Data:", vendorData); // Add this line to check the fetched vendor data

        console.log("vendor response", vendorResponse);

        if (vendorResponse.ok) {
          const vendorFirmId = vendorData?.vendorFirmId;
          const vendorFirmName = vendorData?.vendor?.firm[0]?.firmName;
          localStorage.setItem("firmId", vendorFirmId);
          localStorage.setItem("firmName", vendorFirmName);
          window.location.reload();
          showWelcomeHandler();
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
