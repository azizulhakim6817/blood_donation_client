import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { ShieldUser } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";

const AllUsersDashboard = () => {
  const { user, loading: isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [activeUser, setActiveUser] = useState(null);

  //! get-user--/user/status/filter-----------
  useEffect(() => {
    axiosSecure.get(`/user/status/filter`).then((res) => {
      setActiveUser(res.data);
    });
  }, [axiosSecure]);

  //! handl-update-Status-block/unblock-----------
  const updateStatus = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/update/user/status/${id}`, {
        status: newStatus,
      });

      // Update local state instantly
      setActiveUser((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  //! role-update----------------
  const handleRoleUpdate = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/update-user/role/${id}`, {
        role: newRole,
      });

      // instant UI update
      setActiveUser((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  //! loading-----------------
  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h1 className="mt-4 flex items-center justify-center gap-3 text-xl md:text-2xl font-bold text-primary">
        <FaUsers className="text-accent" size={26} />
        ALL USERS
        <span className="badge badge-secondary text-white">
          {activeUser?.length || 0}
        </span>
      </h1>

      {/* all users -table--------------------------------- */}
      <div className="my-4">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Roles</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeUser?.map((user, i) => (
              /* user-photo--------------- */
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={user?.photoURL}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                {/* displayName------------ */}
                <td>{user?.displayName}</td>
                {/* email------------ */}
                <td>{user?.email}</td>
                {/* block-unblocked--------------- */}
                <td>
                  <span
                    className={`badge px-3 py-1 text-white ${
                      user?.status === "active"
                        ? "bg-green-500"
                        : user?.status === "blocked"
                          ? "bg-red-500"
                          : "bg-gray-400"
                    }`}
                  >
                    {user?.status?.charAt(0).toUpperCase() +
                      user?.status?.slice(1)}
                  </span>
                </td>
                {/* roles----- */}
                <td>
                  <span
                    className={`badge px-3 py-1 text-white ${
                      user?.role === "admin"
                        ? "bg-amber-400"
                        : user?.role === "volunteer"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  >
                   <FaUserLarge /> {user?.role}
                  </span>
                </td>

                {/* status-active-block-unblock-button------------ */}
                <td>
                  <div className="dropdown dropdown-end">
                    {/* Three Dot Button */}
                    <label tabIndex={0} className="btn btn-ghost btn-sm">
                      <BsThreeDotsVertical size={18} />
                    </label>

                    {/* Dropdown Menu-------------------------*/}
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
                    >
                      {/* Block / Unblock ----------------------------*/}
                      <li>
                        <button
                          onClick={() =>
                            updateStatus(
                              user._id,
                              user.status === "blocked" ? "active" : "blocked",
                            )
                          }
                          className={`text-sm ${
                            user.status === "blocked"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {user.status === "blocked" ? "Unblock" : "Block"}
                        </button>
                      </li>

                      {/* Make Volunteer-----------------*/}
                      {user.role === "donor" ? (
                        <li>
                          <button
                            onClick={() =>
                              handleRoleUpdate(user._id, "volunteer")
                            }
                            className="text-sm text-blue-500"
                          >
                            Volunteer
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => handleRoleUpdate(user._id, "donor")}
                            className="text-sm text-blue-500"
                          >
                            Donor
                          </button>
                        </li>
                      )}

                      {/* Make Admin --------------*/}
                      {user.role !== "admin" ? (
                        <li>
                          <button
                            onClick={() => handleRoleUpdate(user._id, "admin")}
                            className="text-sm text-orange-500"
                          >
                            Admin
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() =>
                              handleRoleUpdate(user._id, "volunteer")
                            }
                            className="text-sm text-orange-500"
                          >
                            Volunteer
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersDashboard;
