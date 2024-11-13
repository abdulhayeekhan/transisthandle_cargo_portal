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
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      // Send login request to the server
      await axios
        .post(`${baseURL}/account/signin`, { email, password })
        .then((response) => {
          // Save the token and email to localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userInfo", response.data.data);
          toast.success("" + response.data?.message);
          // Update state to reflect authentication
          setIsAuthenticated(true);
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error("" + err);
        });
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors here (e.g., display an error message to the user)
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
