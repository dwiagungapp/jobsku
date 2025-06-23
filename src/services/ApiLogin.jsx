// src/services/ApiLogin.js
import axios from "axios";

const ApiLogin = axios.create({
  baseURL: "http://127.0.0.1:8000", // root, bukan /api
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default ApiLogin;
