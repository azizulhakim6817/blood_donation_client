import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../../components/logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-4">
        {/* contents */}
        <div>
          {/* Logo */}
          <div className="ml-12 mb-3">
            <Logo></Logo>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">BloodConnect</h2>
          <p className="text-sm">
            Connecting donors with patients to save lives and build a healthier
            community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donation-reqests" className="hover:text-yellow-400">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-yellow-400">
                Search Donors
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-400">
                Become a Donor
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
