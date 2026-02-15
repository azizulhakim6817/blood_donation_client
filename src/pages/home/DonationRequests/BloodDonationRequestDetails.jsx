import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { LuCircleDollarSign } from "react-icons/lu";
import OpenDonationModel from "./OpenDonationModel";
import { useRef } from "react";

const BloodDonationRequestDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: request = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-donation-requests/${id}`);
      //console.log(res.data);
      return res.data;
    },
  });

  //! handleOpenModal----------------------
  const openRef = useRef(null);
  const handleOpenModal = () => {
    if (openRef.current) {
      openRef.current.showModal();
    }
  };
  //! handleCloseModal --> close-butotn----------------------
  const handleCloseModal = () => {
    if (openRef.current) {
      openRef.current.close();
    }
  };

  // end-----------------

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Donation Request Details
            </h2>

            {/* Status Badge */}
            <span
              className={`px-4 py-1 text-sm font-semibold rounded-full ${
                request?.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : request?.status === "inprogress"
                    ? "bg-blue-100 text-blue-700"
                    : request?.status === "done"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
              }`}
            >
              {request?.status}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid gap-2">
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-500">Recipient Name</span>
              <span className="font-semibold text-gray-800">
                {request?.recipientName}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-500">Blood Group</span>
              <span className="font-bold text-red-600">
                {request?.bloodGroup}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-500">District</span>
              <span className="font-semibold">
                {request?.recipientDistrict}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-500">Upazila</span>
              <span className="font-semibold">{request?.recipientUpazila}</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-500">Hospital</span>
              <span className="font-semibold">{request?.hospitalName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-500">
                Donation Date & Time
              </span>
              <span className="font-semibold">
                {request?.donationDate} : {request?.donationTime}
              </span>
            </div>
          </div>

          {/* Donate Button */}

          <div className="mt-8 text-center md:text-right">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center gap-1 bg-linear-to-r from-amber-500 to-amber-700 hover:opacity-90 hover:text-gray-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
            >
              <LuCircleDollarSign size={22} /> Donate Now
            </button>
          </div>
        </div>
      </div>
      {/* handleOpenModal--------- */}
      <OpenDonationModel
        openRef={openRef}
        requestRefetch={refetch}
        handleCloseModal={handleCloseModal}
      ></OpenDonationModel>
    </div>
  );
};

export default BloodDonationRequestDetails;
