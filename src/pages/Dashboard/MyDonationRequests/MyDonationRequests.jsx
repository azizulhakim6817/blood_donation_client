import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ITEMS_PER_PAGE = 10;

const MyDonationmyRequestsData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch donor's own requests
  const {
    data: myRequestsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-donation-myRequestsData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/all?email=${user.email}`,
      );
      return res.data;
    },
  });

  // 🔍 Filter by status
  const filteredmyRequestsData =
    statusFilter === "all"
      ? myRequestsData
      : myRequestsData.filter((r) => r.status === statusFilter);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredmyRequestsData.length / ITEMS_PER_PAGE);
  const clampedPage = Math.min(currentPage, totalPages || 1); // make sure page is valid
  const startIndex = (clampedPage - 1) * ITEMS_PER_PAGE;
  const paginatedmyRequestsData = filteredmyRequestsData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // 🔁 Status update
  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/update-donation-status/${id}`, { status });
      refetch();
      Swal.fire("Updated!", `Status updated to "${status}"`, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  // ❌ Delete request
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
    <div className="p-2">
      <h1 className="text-center text-primary text-xl md:text-2xl font-bold mb-3">
        My Donation Requests 🩸
      </h1>

      {/* 🔍 Status Filter */}
      <div className="mb-4 text-center">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // reset page on filter change
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* 📊 Table */}
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
            {paginatedmyRequestsData.length > 0 ? (
              paginatedmyRequestsData.map((req, index) => (
                <tr key={req._id}>
                  <th>{startIndex + index + 1}</th>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === "inprogress"
                      ? `${req.requesterName} (${req.requesterEmail})`
                      : "-"}
                  </td>
                  <td className="flex gap-1 flex-wrap">
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleStatusUpdate(req._id, "done")}
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* View */}
                    <Link
                      to={`/dashboard/donation-request-details/${req._id}`}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye size={16} /> View
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/dashboard/edit-donation-request/${req._id}`}
                      title={
                        req.status === "done" || req.status === "canceled"
                          ? "Cannot edit a completed/canceled request"
                          : "Edit this donation request"
                      }
                      className={`btn btn-sm btn-info ${
                        req.status === "done" || req.status === "canceled"
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    >
                      <FaEdit size={16} /> Edit
                    </Link>

                    {/* Delete */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteRequest(req._id)}
                    >
                      <MdDelete size={16} /> Delete
                    </button>
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

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`btn btn-sm ${
                clampedPage === page + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <p className="text-center mt-2">
          Page {clampedPage} of {totalPages}
        </p>
      )}
    </div>
  );
};

export default MyDonationmyRequestsData;
