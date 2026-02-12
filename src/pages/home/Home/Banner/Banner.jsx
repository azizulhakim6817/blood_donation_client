import { Link } from "react-router";
import { FaUser, FaSearch } from "react-icons/fa";
import { GiBloodDrop } from "react-icons/gi";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-pink-500 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-white overflow-hidden">
      {/* Decorative Floating Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 animate-pulse"></div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="flex justify-center items-center gap-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          Give Blood, Save Lives
          <GiBloodDrop className="text-yellow-300 animate-bounce" size={36} />
        </h1>

        {/* Subtext */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-10 max-w-3xl mx-auto drop-shadow-sm">
          Your donation can save up to three lives. Join our community of donors
          and make a difference today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-red-700 font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
          >
            Join as a Donor <FaUser />
          </Link>

          <Link
            to="/search"
            className="w-full sm:w-auto border border-white text-white hover:bg-white hover:text-red-500 font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
          >
            Search Donors <FaSearch />
          </Link>
        </div>
      </div>

      {/* Optional Hero Blood Drop Illustration */}
      <div className="hidden md:block absolute right-0 bottom-0 w-64 h-64 bg-red-700/20 rounded-full -translate-x-1/4 translate-y-1/4 animate-pulse"></div>
    </div>
  );
};

export default Banner;
