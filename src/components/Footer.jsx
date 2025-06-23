import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 body-font">
      <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Branding */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <img src="/logo-web.png" className="h-10" />
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Platform terbaik untuk menemukan lowongan impian Anda.
          </p>
        </div>
        {/* Links */}
        <div className="flex-grow flex flex-wrap md:pl-20 md:mt-0 mt-10 text-center md:text-left">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Perusahaan
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white">
                  Karir
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Kontak
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Bantuan
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white">
                  Dukungan
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="bg-gray-900">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 Jobsku — All rights reserved
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-400 hover:text-white ml-3">
              <FaFacebookF />
            </a>
            <a className="text-gray-400 hover:text-white ml-3">
              <FaTwitter />
            </a>
            <a className="text-gray-400 hover:text-white ml-3">
              <FaInstagram />
            </a>
            <a className="text-gray-400 hover:text-white ml-3">
              <FaLinkedinIn />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
