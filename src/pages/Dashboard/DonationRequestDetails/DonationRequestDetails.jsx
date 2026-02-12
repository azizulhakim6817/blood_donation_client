import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setLoading, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // state management----------------
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/single-donation-requests/${id}`).then((res) => {
      setRequest(res.data);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  if (loading) {
    return <p className="text-center mt-10">Loading request details...</p>;
  }

  return (
    <div className="md:max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Donation Request Details 🩸
      </h2>

      <div className="  p-6 space-y-6">
        {/* Requester Info */}
        <div>
          <h3 className="text-[16px]  mb-3 border-b pb-2">
            Requester Information  :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> {request?.requesterName}
            </p>
            <p>
              <strong>Email:</strong> {request?.requesterEmail}
            </p>
          </div>
        </div>

        {/* Recipient Info */}
        <div>
          <h3 className="text-[16px]   mb-3 border-b pb-2">
            Recipient Information :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Recipient Name:</strong> {request?.recipientName}
            </p>
            <p>
              <strong>Blood Group:</strong>
              <span className="ml-2 badge badge-error">
                {request?.bloodGroup}
              </span>
            </p>
            <p>
              <strong>District:</strong> {request?.recipientDistrict}
            </p>
            <p>
              <strong>Upazila:</strong> {request?.recipientUpazila}
            </p>
          </div>
        </div>

        {/* Donation Info */}
        <div>
          <h3 className="text-[16px]   mb-3 border-b pb-2">
            Donation Information : 
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Hospital:</strong> {request?.hospitalName}
            </p>
            <p>
              <strong>Date:</strong> {request?.donationDate}
            </p>
            <p>
              <strong>Time:</strong> {request?.donationTime}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 badge
            ${request?.status === "pending" && "badge-warning"}
            ${request?.status === "inprogress" && "badge-info"}
            ${request?.status === "done" && "badge-success"}
            ${request?.status === "canceled" && "badge-error"}
          `}
              >
                {request?.status}
              </span>
            </p>
          </div>
        </div>

        {/* Address & Message */}
        <div>
          <h3 className="text-[16px]   mb-3 border-b pb-2">
            Additional Details :
          </h3>
          <p className="mb-3">
            <strong>Full Address:</strong> {request?.fullAddress}
          </p>
          <p>
            <strong>Message:</strong> {request?.requestMessage}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mb-8 text-center">
        <button onClick={() => navigate(-1)} className="btn btn-primary px-10">
          ← Back
        </button>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
