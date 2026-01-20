import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:7878/api/resumer/register", formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const token = response.data.token;
          sessionStorage.setItem("token", token);
          navigate("/all_resume");
        } else {
          console.warn("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            `Server error (${error.response.status}):`,
            error.response.data
          );
        } else if (error.request) {
          console.error("No response received from server:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "150px 150px",
      }}
    >
      <div className="relative bg-gray-800 bg-opacity-70 rounded-2xl p-8 w-full max-w-md mx-4 shadow-lg shadow-neon-blue transform transition-all duration-500 ">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-cyan-300 font-medium mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              className="block text-cyan-300 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              className="block text-cyan-300 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
