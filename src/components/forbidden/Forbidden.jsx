import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="flex flex-col items-center text-center max-w-md w-full">
        {/* Icon */}
        <div className="text-red-600 text-7xl sm:text-8xl md:text-9xl">🚫</div>

        {/* Text */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4">
          Access Forbidden
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-2">
          You don’t have permission to access this page.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="mt-6 px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base
                     bg-red-600 text-white rounded-md
                     hover:bg-red-700 transition duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;