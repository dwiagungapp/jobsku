import { useEffect, useState } from "react";
import Api from "../services/Api";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRegClock, FaMoneyBillAlt } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import Header from "../components/Header";
import Footer from "../components/Footer";

dayjs.extend(relativeTime);
dayjs.locale("id"); // gunakan bahasa Indonesia

const DaftarLowongan = () => {
  const [jobs, setJobs] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Api.get("/api/pekerjaan")
      .then((res) => {
        const page = res.data.data;
        setJobs(page.data);
        setNextPageUrl(page.next_page_url);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    if (!nextPageUrl) return;

    const url = new URL(nextPageUrl);
    let relativePath = url.pathname + url.search;

    // Hilangkan '/api' di awal path agar tidak double
    if (relativePath.startsWith("/api/pekerjaan/")) {
      relativePath = relativePath.replace("/api", "");
    }

    Api.get(relativePath).then((res) => {
      const page = res.data.data;
      setJobs((prev) => [...prev, ...page.data]);
      setNextPageUrl(page.next_page_url);
    });
  };

  return (
    <>
      <Header />
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-20 mt-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 font-poppins">
              Tersedia Lowongan Pekerjaan Terbaru
            </h1>
            <p className="lg:w-1/2 mx-auto leading-relaxed text-gray-500 font-poppins">
              Lihat lowongan pekerjaan terbaru untuk Anda.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">Memuat...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-lg p-5 shadow hover:shadow-md transition relative"
                >
                  <Link to={`/detail-lowongan/${job.id}`}>
                    {/* Logo dan Perusahaan */}
                    <div className="flex items-center mb-3">
                      <img
                        src={job.company_logo}
                        alt={job.company_name}
                        className="w-10 h-10 object-contain rounded-full mr-3"
                      />
                      <div>
                        <h3 className="text-blue-600 text-sm font-semibold uppercase leading-tight">
                          {job.company_name}
                        </h3>
                        <p className="text-gray-500 text-sm flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-xs" />
                          {job.job_location}
                        </p>
                      </div>
                    </div>

                    {/* Judul */}
                    <h2 className="font-bold text-gray-800 text-lg mb-3 leading-snug">
                      {job.job_title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[job.tipe_pekerjaan, job.pendidikan, job.level_pekerjaan]
                        .filter(Boolean)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Gaji dan Waktu */}
                    <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-3">
                      <div className="flex items-center">
                        <FaMoneyBillAlt className="mr-1 text-sm" />
                        Rp{job.salary.toLocaleString()}
                      </div>
                      <div className="flex items-center text-xs">
                        <FaRegClock className="mr-1 text-sm" />
                        {dayjs(job.created_at).fromNow()}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          <button
            onClick={loadMore}
            disabled={!nextPageUrl}
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {nextPageUrl ? "Lihat Lowongan Lainnya" : "Tidak ada lagi"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DaftarLowongan;
