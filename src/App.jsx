/** @format */

import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";
import ProtectRoute from "./Components/ProtectRoute";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectRoute>
                <Account />
              </ProtectRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
