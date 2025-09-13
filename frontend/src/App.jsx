import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { LogIn } from "../views/components/LogIn";
import { SignUp } from "../views/components/SignUp";
import ResumeUpload from "../views/components/ResumeUpload";

export default function App() {
  return (
    <LogIn/>
  );
}
