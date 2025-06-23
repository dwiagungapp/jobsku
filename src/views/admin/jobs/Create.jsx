import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Layout from "../../../components/Layout";
import { Link } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    company_logo: null,
    job_title: "",
    job_description: "",
    job_location: "",
    salary: "",
    tipe_pekerjaan: "",
    pendidikan: "",
    level_pekerjaan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: name === "company_logo" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));

    try {
      await Api.post("/api/pekerjaan/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setModal({
        open: true,
        success: true,
        message: "Lowongan berhasil ditambahkan!",
      });
    } catch (err) {
      let msg = "Gagal menambahkan lowongan.";
      if (err.response?.status === 422) {
        msg = Object.values(err.response.data).flat().join(" ");
      }
      setModal({ open: true, success: false, message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
    if (modal.success) navigate("/admin/jobs");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Tambah Pekerjaan
        </h2>
        <p className="text-gray-600 mb-6">
          Isi form berikut untuk menambah lowongan baru.
        </p>

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nama Perusahaan"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Contoh: PT Maju Mundur"
              />
              <div>
                <label className="block text-gray-700 mb-1">
                  Logo Perusahaan (File)
                </label>
                <input
                  name="company_logo"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Judul Pekerjaan"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                placeholder="Contoh: Marketing"
              />
              <Input
                label="Lokasi Pekerjaan"
                name="job_location"
                value={formData.job_location}
                onChange={handleChange}
                placeholder="Contoh: DKI Jakarta"
              />
              <Input
                label="Salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Contoh: 5000000"
              />
              <Input
                label="Tipe Pekerjaan"
                name="tipe_pekerjaan"
                value={formData.tipe_pekerjaan}
                onChange={handleChange}
                placeholder="Contoh: Full Time"
              />
              <Input
                label="Pendidikan"
                name="pendidikan"
                value={formData.pendidikan}
                onChange={handleChange}
                placeholder="Contoh: D3/S1"
              />
              <Input
                label="Level Pekerjaan"
                name="level_pekerjaan"
                value={formData.level_pekerjaan}
                onChange={handleChange}
                placeholder="Contoh: Staff"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Deskripsi Pekerjaan
              </label>
              <textarea
                name="job_description"
                value={formData.job_description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                placeholder="Jelaskan tanggung jawab, kualifikasi, dsb."
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-2">
              <Link
                to="/admin/dashboard"
                className="w-full sm:w-auto inline-block text-center py-3 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
              >
                Kembali
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto py-3 px-6 rounded-lg text-white font-semibold ${
                  isSubmitting
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
            {modal.success ? (
              <FiCheckCircle className="mx-auto text-green-500 text-5xl" />
            ) : (
              <FiXCircle className="mx-auto text-red-500 text-5xl" />
            )}
            <p className="mt-4 text-lg text-gray-800">{modal.message}</p>
            <button
              onClick={closeModal}
              className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              {modal.success ? "Lihat Daftar Lowongan" : "Tutup"}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Komponen input reusable kecil
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
