import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, number }),
      });

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        setNumber("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  const handleNumberChange = (e) => {
    // Remove any non-digit characters and limit to 10 digits
    const sanitizedValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setNumber(sanitizedValue);
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <label>Phone Number</label>
        <input
          type="text"
          name="number"
          placeholder="Enter your Ph.Number"
          onChange={handleNumberChange}
          value={number}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
