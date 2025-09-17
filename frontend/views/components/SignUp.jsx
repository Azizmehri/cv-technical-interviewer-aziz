// SignUp.jsx
import React, { useState } from "react";
import { SignUpUser } from "../../models/api_calls"; // create this function in your api_calls.js
import { LogIn } from "./LogIn";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ Please fill in all the fields");
      return;
    }

    try {
      // Call your signup API function
      const data = await SignUpUser(email, password); // data = { token, redirect, error }

      if (data.token) {
        // Optionally save JWT token
        localStorage.setItem("token", data.token);
        setMessage("✅ Signup successful! Redirecting...");
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      } else if (data.redirect) {
        setMessage("⚠️ User already exists, please login");
        setTimeout(() => (window.location.href = data.redirect), 1500);
      } else if (data.error) {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 grid justify-items-center items-start w-screen min-h-screen">
      <div className="bg-white w-[400px] p-8 mt-20 shadow-lg rounded-3xl">
        <h1 className="text-3xl font-semibold text-black">Create Account</h1>
        <p className="mt-2 text-gray-600 text-base">
          Enter your credentials to create your account
        </p>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] px-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] px-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full h-[45px] rounded-3xl font-medium text-white bg-green-600 hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 cursor-pointer">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};