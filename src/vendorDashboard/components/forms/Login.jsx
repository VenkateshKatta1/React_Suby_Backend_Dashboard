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
      console.log("Login Response Data:", data);

      if (response.ok) {
        // setEmail("");
        // setPassword("");
        alert("Login success");
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("userDetails", JSON.stringify(data));

        const vendorId = data.vendorId;
        // console.log("Vendor ID:", vendorId);

        const vendorResponse = await fetch(
          `${API_URL}/vendor/single-vendor/${vendorId}`
        );
        const vendorData = await vendorResponse.json();

        if (vendorResponse.ok) {
          const vendorFirmId = vendorData?.vendorFirmId;
          const vendorFirmName = vendorData?.vendor?.firm[0]?.firmName;
          const firmDetails = { vendorFirmId, vendorFirmName };
          if (vendorFirmName === undefined && vendorFirmId === undefined) {
            window.location.reload();
          } else if (
            vendorFirmId !== undefined &&
            vendorFirmName !== undefined
          ) {
            localStorage.setItem("firmDetails", JSON.stringify(firmDetails));
            showWelcomeHandler();
            window.location.reload();
          }
        }
      } else {
        alert("Login failed or user does'nt exist");
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
