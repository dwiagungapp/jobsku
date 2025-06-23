import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Tentang Jobsku
        </h1>

        <p className="text-gray-600 leading-relaxed mb-4">
          <strong>Jobsku</strong> adalah platform pencarian lowongan kerja yang
          membantu pencari kerja menemukan peluang karir yang sesuai dengan
          minat, lokasi, dan keahlian mereka. Dengan antarmuka yang sederhana
          dan bersahabat, Jobsku menghadirkan ribuan lowongan dari berbagai
          perusahaan terpercaya di seluruh Indonesia.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          Kami berkomitmen untuk mempermudah proses rekrutmen dan pencarian
          kerja dengan menyediakan fitur-fitur yang efisien dan informatif —
          mulai dari pencarian berdasarkan kata kunci, filter lokasi dan gaji,
          hingga sistem manajemen lowongan yang terus diperbarui secara
          real-time.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          Dengan Jobsku, kami berharap dapat menjadi jembatan antara para
          pencari kerja dan perusahaan yang sedang mencari talenta terbaik,
          dalam upaya menciptakan ekosistem ketenagakerjaan yang lebih inklusif
          dan produktif.
        </p>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Versi: <span className="font-medium">v1.0.0</span>
          </p>
          <p>
            Dikembangkan oleh: <span className="font-medium">Tim Jobsku</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
