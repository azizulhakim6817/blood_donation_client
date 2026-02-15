import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useRole from "../../../hooks/useRole";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  console.log(role);

  const {
    data: requestData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-blood/donations/request`);
      return res.data;
    },
  });

  //! Status update
  const handleStatusUpdate = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/update-donation-status/${id}`, { status });

          refetch();
          Swal.fire(
            "Status!",
            `Your donation status has been ${status}.`,
            "success",
          );
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to Status donation request.", "error");
        }
      }
    });
  };

  //! Delete handler
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
          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success",
          );
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete donation request.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="my-4 text-center text-primary text-xl md:text-2xl font-bold mb-3">
        All Blood Donation Requests 🩸
      </h1>

      {/* table----------------------- */}
      <div className="overflow-x-auto">
        <table className="table">
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
            {requestData.length > 0 ? (
              requestData.map((req, index) => (
                <tr key={req._id}>
                  <th>{index + 1}</th>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>

                  {/* status---pending------ */}
                  <td>
                    {req?.status && (
                      <button
                        className={`btn btn-xs text-white ${
                          req.status === "pending"
                            ? "bg-error"
                            : req.status === "inprogress"
                              ? "bg-warning"
                              : req.status === "done"
                                ? "bg-primary"
                                : req.status === "canceled"
                                  ? "bg-gray-500"
                                  : "bg-secondary"
                        }`}
                      >
                        {req.status}
                      </button>
                    )}
                  </td>
                  {/* inprogress--done-canceled----ui show----- */}
                  <td>
                    {req.status === "inprogress"
                      ? `${req.requesterName} ${req.requesterEmail}`
                      : `${req.requesterEmail}`}
                  </td>
                  {/* status--progress---done--canceled- */}
                  <td className="flex gap-1">
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusUpdate(req._id, "done")}
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {/* view-edit-delete---only-addmin accessabel---- */}
                    {/* view-button========-- */}
                    <Link
                      to={`/dashboard/donation-request-details/${req._id}`}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye size={16} /> View
                    </Link>
                    {role === "admin" && (
                      <>
                        {/* edite-----button------- */}
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          title={
                            req.status === "done" || req.status === "canceled"
                              ? "Cannot edit completed/canceled request"
                              : "Edit this donation request"
                          }
                          className={`btn btn-sm btn-info ${req.status === "done" || req.status === "canceled" ? "opacity-50 bg-gray-500 pointer-events-none" : ""}`}
                        >
                          <FaEdit size={16} /> Edit
                          {/* delete button---------- */}
                        </Link>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDeleteRequest(req._id)}
                        >
                          <MdDelete size={16} /> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
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

export default AllBloodDonationRequest;
