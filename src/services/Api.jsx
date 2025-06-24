import axios from "axios";

export default axios.create({
  baseURL: "http://webmaju.web.id",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
