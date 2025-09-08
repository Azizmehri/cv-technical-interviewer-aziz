import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { LogIn } from "../views/components/LogIn";
import { SignUp } from "../views/components/SignUp";
import ResumeUpload from "../views/components/ResumeUpload";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/uploadcv">Upload CV</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/uploadcv" element={<ResumeUpload />} />
      </Routes>
    </BrowserRouter>
  );
}
