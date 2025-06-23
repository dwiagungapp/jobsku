import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../services/Api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiBookOpen,
  FiHome,
  FiCreditCard,
  FiTag,
} from "react-icons/fi";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.locale("id"); // gunakan bahasa Indonesia

export default function DetailJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Api.get(`/api/pekerjaan/${id}`)
      .then((res) => {
        const { success, data } = res.data;
        if (success) setJob(data);
        else setError("Data tidak ditemukan");
      })
      .catch(() => setError("Gagal memuat detail pekerjaan"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6"
          >
            <FiArrowLeft className="mr-2" /> Kembali
          </Link>

          {loading ? (
            <div className="text-center py-10">Memuat...</div>
          ) : error ? (
            <div className="text-red-600 text-center py-10">{error}</div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header Card */}
              <div className="px-6 py-8 sm:px-10 sm:py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Kiri: Judul & Info */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.job_title}
                  </h1>
                  <div className="flex items-center text-gray-600 space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <FiBriefcase />
                      <span>{job.company_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiClock className="mr-1 text-sm" />
                      {dayjs(job.created_at).fromNow()}
                    </div>
                  </div>
                </div>

                {/* Kanan: Tombol */}
                <div className="mt-2 sm:mt-0">
                  <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                    Lamar Pekerjaan
                  </button>
                </div>
              </div>

              {/* Info Grid */}
              <div className="bg-blue-100 border-y border-blue-200 px-6 py-8 sm:px-10 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                <div className="flex items-start space-x-3">
                  <FiMapPin className="mt-1 text-indigo-600" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Lokasi
                    </h3>
                    <p className="text-gray-600">{job.job_location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiTag className="mt-1 text-indigo-600" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Tipe Pekerjaan
                    </h3>
                    <p className="text-gray-600">{job.tipe_pekerjaan || "—"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiBookOpen className="mt-1 text-indigo-600" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Pendidikan
                    </h3>
                    <p className="text-gray-600">{job.pendidikan || "—"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiCreditCard className="mt-1 text-indigo-600" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Gaji
                    </h3>
                    <p className="text-gray-600">
                      Rp{job.salary.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="px-6 pb-8 sm:px-10 sm:pb-12 sm:py-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Deskripsi Pekerjaan
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {job.job_description}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
