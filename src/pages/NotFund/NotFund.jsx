import { Link } from "react-router";

const NotFund = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-primary mb-2">
        404 - Page Not Found
      </h1>

      <p className="text-gray-500 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      {/*  link*/}
      <Link to="/">
        <button className="btn bg-primary text-white px-6">Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFund;
