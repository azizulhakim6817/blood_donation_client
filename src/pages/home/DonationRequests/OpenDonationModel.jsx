import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const OpenDonationModel = ({ openRef, handleCloseModal, requestRefetch }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch user info
  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  //! handleConfirmDonation-----------------------
  const handleConfirmDonation = async () => {
    await axiosSecure.patch(`/donation-requests/${id}/status`, {
      status: "inprogress",
    });
    // With options
    toast.success("Donation confirmed!", {
      position: "top-center",
    });
    handleCloseModal();
    refetch?.();
    requestRefetch?.();
    navigate("/donation-reqests");
  };

  return (
    <dialog ref={openRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Confirm Your Donation</h3>

        {/* Donor Info */}
        <div className="space-y-3">
          <input
            type="text"
            value={userInfo?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="email"
            value={userInfo?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Modal Actions */}
        <div className="modal-action flex justify-between">
          <button onClick={handleConfirmDonation} className="btn btn-success">
            Confirm
          </button>
          <button onClick={handleCloseModal} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default OpenDonationModel;
