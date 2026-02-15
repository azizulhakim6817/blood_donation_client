import { useLocation } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-primary font-bold mb-4">
          Thank you for your generous donation.
        </p>
        {sessionId && (
          <p className="text-gray-500 text-sm break-all">
            <span className="font-bold">Your session ID </span>:{" "}
            <span className="font-mono">{sessionId}</span>
          </p>
        )}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-6 bg-primary hover:bg-accent text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
