// SignUp.jsx
import React, { useState } from "react";
import { LogIn } from "./LogIn"; // your login component

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
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful! Redirecting...");
        // Example: redirect to dashboard
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      } else if(data.redirect) {
        setMessage(`User already exists please login`);
      }
    } catch (error) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 grid justify-items-center items-start w-screen min-h-screen">
      <div className="bg-white w-[400px] p-8 mt-20 shadow-lg rounded-3xl">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-black">Welcome back!</h1>
        <p className="mt-2 text-gray-600 text-base">
          Enter your credentials to access your account
        </p>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] px-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] px-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Login button */}
          <button
            type="submit"
            className="w-full h-[45px] rounded-3xl font-medium text-white bg-green-600 hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Sign Up link */}
        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/LogIn" className="text-blue-600 cursor-pointer">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
