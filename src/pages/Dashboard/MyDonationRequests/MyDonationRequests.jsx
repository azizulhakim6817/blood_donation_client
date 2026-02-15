import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
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

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ================= Fetch My Requests =================
  const {
    data: myRequestsData = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["my-donation-myRequestsData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/donation-requests/all?email=${user.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load data</p>;

  // ================= Filter =================
  const filteredData =
    statusFilter === "all"
      ? myRequestsData
      : myRequestsData.filter(
          (r) => r.status?.toLowerCase() === statusFilter.toLowerCase(),
        );

  // ================= Pagination =================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );

  const clampedPage = Math.min(currentPage, totalPages);
  const startIndex = (clampedPage - 1) * ITEMS_PER_PAGE;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // ================= Status Update =================
  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/update-donation-status/${id}`, {
        status,
      });
      Swal.fire("Updated!", `Status updated to "${status}"`, "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  // ================= Delete =================
  const handleDeleteRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/delete-donation-requests/${id}`);
          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success",
          );
          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete donation request.", "error");
        }
      }
    });
  };

  // ================= Status Badge Style =================
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "badge-warning";
      case "inprogress":
        return "badge-info";
      case "done":
        return "badge-success";
      case "canceled":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-center text-primary text-xl md:text-2xl font-bold mb-4">
        My Donation Requests 🩸
      </h1>

      {/* ================= Filter ================= */}
      <div className="mb-4 text-center">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* ================= Table ================= */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
            {paginatedData.length > 0 ? (
              paginatedData.map((req, index) => (
                <tr key={req._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td>
                    <span
                      className={`badge text-white ${getStatusBadge(
                        req.status,
                      )}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status?.toLowerCase() === "inprogress"
                      ? `${req.requesterName || "N/A"} (${
                          req.requesterEmail || "N/A"
                        })`
                      : "-"}
                  </td>
                  <td className="flex gap-1 flex-wrap">
                    {req.status?.toLowerCase() === "inprogress" && (
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

                    <Link
                      to={`/dashboard/donation-request-details/${req._id}`}
                      className="btn btn-xs btn-info"
                    >
                      <FaEye /> View
                    </Link>

                    <Link
                      to={`/dashboard/edit-donation-request/${req._id}`}
                      className={`btn btn-xs btn-primary ${
                        req.status?.toLowerCase() === "done" ||
                        req.status?.toLowerCase() === "canceled"
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    >
                      <FaEdit /> Edit
                    </Link>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteRequest(req._id)}
                    >
                      <MdDelete /> Delete
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

      {/* ================= Pagination ================= */}
      {filteredData.length > ITEMS_PER_PAGE && (
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

      {filteredData.length > ITEMS_PER_PAGE && (
        <p className="text-center mt-2">
          Page {clampedPage} of {totalPages}
        </p>
      )}
    </div>
  );
};

export default MyDonationmyRequestsData;
