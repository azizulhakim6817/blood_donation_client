import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        {/* Cancel Icon */}
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-700 mb-2">
          Payment Cancelled
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          Your payment was not completed. Please try again.
        </p>

        {/* Back to Dashboard button */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
