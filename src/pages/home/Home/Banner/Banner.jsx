import { Link } from "react-router";
import { FaUser, FaSearch } from "react-icons/fa";
import img2 from "../../../../assets/blood_donation.png";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#7b00a8] via-[#1E3A8A] to-[#012b30] text-white">
      {/* Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl sm:text-5xl  font-extrabold leading-tight mb-6">
              <span className="bg-linear-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                Give Blood
              </span>
              <span> Save Lives</span>
            </h1>

            <p className="text-gray-300 text-[14px]   max-w-xl mx-auto lg:mx-0 mb-8">
              Your donation can save up to three lives.<br></br> Join our
              trusted donor community and become someone’s hero today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="group bg-linear-to-r from-yellow-400 to-red-500 hover:bg-yellow-300  text-red-700 font-semibold px-8 py-3 rounded-full shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Join as Donor
                <FaUser className=" group-hover:translate-x-1 transition duration-300" />
              </Link>

              <Link
                to="/search"
                className="group border border-white/70 text-white hover:bg-linear-to-r from-yellow-400 to-red-500 hover:text-accent font-semibold px-8 py-3 rounded-full shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Search Donors
                <FaSearch className="group-hover:translate-x-1 transition duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={img2}
              alt="Blood Donation"
              className="w-72 h-72 sm:w-96 lg:w-96 md:h-96 rounded-2xl max-w-md drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
