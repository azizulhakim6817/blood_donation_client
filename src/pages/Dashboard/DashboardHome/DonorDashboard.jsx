import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";
import { FaEye, FaUserAstronaut } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //! get donor info--------------
  const [donorUser, setDonorUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;
      const res = await axiosSecure.get(`/get-user?email=${user.email}`);
      setDonorUser(res.data);
    };

    fetchUser();
  }, [user?.email, axiosSecure]);

  //! get user by email --------------------
  const {
    data: donorRequest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?requesterEmail=${user?.email}&limit=3`,
      );
      return res.data;
    },
  });

  //!! Status update handler----------
  const handleStatusUpdate = async (id, newStatus) => {
    await axiosSecure.patch(`/update-donation-status/${id}`, {
      status: newStatus,
    });
    refetch();
  };

  //! Delete handler with confirmation-----------
  const handleDeleteRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/delete-donation-requests/${id}`);
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your donation request has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete donation request.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1 className=" mt-3 flex gap-2 justify-center text-primary text-xl md:text-2xl font-bold text-center">
        Welcome,
        <span className="text-secondary">{donorUser?.displayName}</span>!
        <span className="text-accent">
          <FaUserAstronaut size={23}/>
        </span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : donorRequest.length > 0 ? (
              donorRequest.map((request, index) => (
                <tr key={request._id}>
                  {/* Row Number */}
                  <th>{index + 1}</th>

                  {/* Recipient Name */}
                  <td>{request.recipientName}</td>

                  {/* Recipient Location */}
                  <td>{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>

                  {/* Donation Date */}
                  <td>{new Date(request.donationDate).toLocaleDateString()}</td>

                  {/* Donation Time */}
                  <td>{request.donationTime}</td>

                  {/* Blood Group */}
                  <td>{request.bloodGroup}</td>

                  {/* Status */}
                  <td>{request.status}</td>

                  {/* Donor Info (only when inprogress) */}
                  <td>
                    {request.status === "inprogress"
                      ? `${request.requesterName} (${request.requesterEmail})`
                      : "-"}
                  </td>

                  {/* Actions */}
                  <td className="flex gap-1">
                    {/* Done / Cancel buttons only for inprogress */}
                    {request.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            handleStatusUpdate(request._id, "done")
                          }
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleStatusUpdate(request._id, "canceled")
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {/* View button */}
                    <Link
                      to={`/dashboard/donation-request-details/${request?._id}`}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye size={16} /> View
                    </Link>
                    {/* Edit button */}
                    <Link
                      to={`/dashboard/edit-donation-request/${request?._id}`}
                      title={
                        request.status === "done" ||
                        request.status === "canceled"
                          ? "Cannot edit a completed or canceled request"
                          : "Edit this donation request"
                      }
                      className="btn btn-sm btn-info"
                      disabled={
                        request.status === "done" ||
                        request.status === "canceled"
                      }
                    >
                      <FaEdit size={16} /> Edit
                    </Link>

                    {/* Delete button */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      <MdDelete size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  No donation requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorDashboard;
