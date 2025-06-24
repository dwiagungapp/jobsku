import axios from "axios";

export default axios.create({
  baseURL: "https://webmaju.web.id",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
