import { useState } from "react";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./features/login/Login";
import Home from "./pages/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import "./App.css";
import SignupForm from "./features/login/signup";
import AddArtisan from "./features/AddArtisan";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/artisan/join" element={<AddArtisan />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;