// src/routes/RoutesIndex.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/auth/Login";
import Dashboard from "../views/admin/dashboard";
import CreateJob from "../views/admin/jobs/Create";
import EditJob from "../views/admin/jobs/Update";
import ProtectedRoute from "../components/ProtectedRoute";
import DetailJob from "../sections/DetailJob";
import About from "../sections/About";
import DaftarLowongan from "../sections/DaftarLowongan";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route publik */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cari-lowongan" element={<DaftarLowongan />} />
      <Route path="/login" element={<Login />} />{" "}
      {/* ← Tambahkan route Login */}
      <Route path="/detail-lowongan/:id" element={<DetailJob />} />
      {/* group route admin */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/job/create" element={<CreateJob />} />
        <Route path="/admin/job/edit/:id" element={<EditJob />} />
      </Route>
      {/* fallback: 404 or redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
