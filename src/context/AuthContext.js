// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();
const baseURL = process.env.REACT_APP_API_URL;
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLevel, setUserLevel] = useState("");
  const navigate = useNavigate();

  var hours = 1;
  var now = new Date().getTime();

  const login = async (email, password) => {
    try {
      // Send login request to the server
      await axios
        .post(`${baseURL}/account/signin`, { email, password })
        .then((response) => {
          // Save the token and email to localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data.data));
          toast.success("" + response.data?.message);
          // Update state to reflect authentication
          setIsAuthenticated(true);
          console.log("response?.data?.data?.userLavel", response?.data?.data?.userLavel);
          setUserLevel(response?.data?.data?.userLavel);
          localStorage.setItem("setupTime", now);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log("error:", err?.response?.status);
          const status = err?.response?.status;
          if (status === 404) {
            toast.error("Please enter Valid email/password");
          } else if (status === 401) {
            toast.error("Invalid credentials");
          } else if (status === 403) {
            toast.error("Your account is inactive. Please contact support for assistance");
          } else if (status === 405) {
            toast.error("Your company account is currently blocked.");
          } else if (status === 411) {
            toast.error("Your maximum users already created.");
          } else if (status === 500) {
            console.error("Error 500: Server error.");
          } else {
            console.error(`Error ${status}: ${err.response.data.message}`);
          }
        });
    } catch (error) {
      console.error("Login failed:", error);
      const status = err?.response?.status;
      if (status === 401) {
        toast.error("Please enter Valid email/password");
      }
      // Handle errors here (e.g., display an error message to the user)
    }
  };

  var setupTime = localStorage.getItem("setupTime");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("setupTime");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    if (userInfo !== null) {
      setIsAuthenticated(true);
      setUserLevel(userInfo?.userLavel);
      navigate("/dashboard");
    }
    if (now - setupTime > hours * 60 * 60 * 1000) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userLevel }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
