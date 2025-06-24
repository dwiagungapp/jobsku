// Dashboard.jsx
import { useEffect, useState } from "react";
import { FiBriefcase, FiDownload, FiSearch } from "react-icons/fi";
import { FaMapMarkerAlt, FaRegClock, FaMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import Layout from "../../../components/Layout";

dayjs.extend(relativeTime);
dayjs.locale("id");

function StatCard({ icon: Icon, label, value, color = "blue" }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <div className={`text-${color}-600`}>
        <Icon size={32} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h4 className="text-xl font-semibold">{value}</h4>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPage = (page) => {
    setLoading(true);
    Api.get("/api/pekerjaan/", { params: { page } })
      .then((res) => {
        const pageData = res.data.data;
        setJobs(pageData.data);
        setLastPage(pageData.last_page);
        setTotalJobs(pageData.total);
        setTotalClicks(pageData.total * 3);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  const filtered = jobs.filter(
    (j) =>
      j.company_name?.toLowerCase().includes(query.toLowerCase()) ||
      j.job_title?.toLowerCase().includes(query.toLowerCase()) ||
      j.job_location?.toLowerCase().includes(query.toLowerCase()) ||
      String(j.salary).includes(query)
  );

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await Api.delete(`/api/pekerjaan/${id}`);
      fetchPage(currentPage);
    } catch {
      alert("Gagal menghapus");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={FiBriefcase}
          label="Total Lowongan"
          value={totalJobs.toString()}
          color="indigo"
        />
        <StatCard
          icon={FiDownload}
          label="Klik Lowongan"
          value={totalClicks.toString()}
          color="indigo"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Link to="/admin/job/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto">
              Tambah Lowongan
            </button>
          </Link>
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari lowongan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Memuat...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow hover:shadow-md transition relative flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={job.company_logo}
                    alt={`${job.company_name} Logo`}
                    className="w-12 h-12 object-cover rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-blue-600 text-sm font-semibold uppercase">
                      {job.company_name}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-xs" />
                      {job.job_location}
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {job.job_title}
                </h4>

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

                <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-3 mt-auto">
                  <span className="flex items-center">
                    <FaMoneyBillAlt className="mr-1 text-sm" />
                    Rp{job.salary.toLocaleString()}
                  </span>
                  <span className="flex items-center text-xs">
                    <FaRegClock className="mr-1 text-sm" />
                    {dayjs(job.created_at).fromNow()}
                  </span>
                </div>

                <div className="flex mt-4 space-x-3">
                  <Link
                    to={`/admin/job/edit/${job.id}`}
                    className="flex-1 text-center py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="flex-1 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center space-x-2">
          <Link
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100"
          >
            Prev
          </Link>
          {Array.from({ length: lastPage }, (_, i) => (
            <Link
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border border-gray-200 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
          <Link
            onClick={() => setCurrentPage((p) => Math.min(p + 1, lastPage))}
            disabled={currentPage === lastPage}
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100"
          >
            Next
          </Link>
        </div>
      </div>
    </Layout>
  );
}
