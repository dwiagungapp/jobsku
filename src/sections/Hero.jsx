import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative bg-blue-600 text-white">
      {/* Container */}
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-poppins">
            Temukan Lowongan <br />
            Pekerjaan Terbaru
          </h1>
          <p className="text-lg mb-8 text-white/90 font-poppins">
            Jelajahi ribuan lowongan dari perusahaan ternama dan mulailah karier
            impianmu bersama Jobsku.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-md shadow"
            >
              <FiSearch className="mr-2" />
              Cari Lowongan
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 bg-white/20 border border-white hover:bg-white/30 text-white font-medium rounded-md"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://dcvxs6ggqztsa.cloudfront.net/assets/public/quick_start/hero/post-jobs-for-free-for-15-days-7716c2804be41e00a79b47a29392fe1327993126db1c0cd0d44a8d4d294670e0.png"
            alt="Jobsku Hero"
            className="w-4/5 md:w-full max-w-md md:max-w-lg rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
