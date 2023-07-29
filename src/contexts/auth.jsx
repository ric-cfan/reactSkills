import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    const token = localStorage.getItem("token");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (usuario, password) => {
    try {
      const response = await createSession(usuario, password);

      console.log("login", response.data);

      const loggedUser = response.config.data;
      const token = response.headers.authorization;

      console.log("config data", response.config.data)

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("username", usuario);
      localStorage.setItem("password", password);
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(loggedUser);
      navigate("/");
    }
    catch {
      alert("Login ou senha incorretos!");
    }
  };

  const logout = () => {
    console.log("logout");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if(!JSON.parse(localStorage.getItem("rememberMe"))) {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    api.defaults.headers.Authorization = null;

    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}