import { Link, Outlet } from "react-router";
import { MdHome } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { Save, SaveAll } from "lucide-react";
import { IoSettings } from "react-icons/io5";
import useRole from "../hooks/useRole";
import { RiRefund2Fill } from "react-icons/ri";
import logo from "../assets/logo.png";

const DashboardLayout = () => {
  const { role } = useRole();
  //console.log(role); // donor + admin

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar------------*/}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon--------*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-bold text-primary ">
              Blood Donation Application 🩸
            </div>
          </nav>
          {/* Page content here------*/}
          <Outlet></Outlet>
          {/* <div className="p-4">Page Content</div>-----*/}
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here----*/}
            <ul className="menu w-full grow space-y-1">
              {/* List item----*/}
              {/*Home------------------- */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  {/* Home icon---*/}
                  <div>
                    <img className="h-8 w-8" src={logo} alt="" />
                  </div>

                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </li>
              {/* Dashboard Home------------------- */}
              <li>
                <Link
                  to="/dashboard"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard Home"
                >
                  {/* Home icon---*/}
                  <MdHome size={26} />
                  <span className="is-drawer-close:hidden">Dashboard Home</span>
                </Link>
              </li>

              {/* All Blood Donation Request------------------- */}
              {["admin", "volunteer"].includes(role) && (
                <li>
                  <Link
                    to="/dashboard/all-blood-donation-request"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Blood Donation Request"
                  >
                    <SaveAll size={20} className="mr-2" />
                    <span className="is-drawer-close:hidden">
                      All Blood Donation Request
                    </span>
                  </Link>
                </li>
              )}

              {/* Create Donation Request------------------- */}
              <li>
                <Link
                  to="/dashboard/donation-request"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Create Donation Request"
                >
                  {/* Home icon */}
                  <FaClipboardList size={20} className="mr-2" />
                  <span className="is-drawer-close:hidden">
                    Create Donation Request
                  </span>
                </Link>
              </li>
              {/* My Donation Requests------------------ */}
              <li>
                <Link
                  to="/dashboard/my-donation-requests"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                  data-tip="My Donation Requests"
                >
                  <Save size={20} />
                  <span className="is-drawer-close:hidden">
                    My Donation Requests
                  </span>
                </Link>
              </li>

              {/* Admin --volunteer logic-------------------- */}
              {(role === "admin" || role === "volunteer") && (
                <>
                  {/* Funding Dashboard */}
                  <li>
                    <Link
                      to="/dashboard/funding-dasboard"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="$ Funding"
                    >
                      <RiRefund2Fill size={24} />
                      <span className="is-drawer-close:hidden">Funding</span>
                    </Link>
                  </li>
                </>
              )}

              {/* All Users Dashboard------------------- */}
              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/all-users-dashboard"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="All Users Dashboard"
                    >
                      <FaUsers size={22} />
                      <span className="is-drawer-close:hidden">
                        All Users Dashboard
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {/* My Profile Dashboard------------------- */}
              <li>
                <Link
                  to="/dashboard/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                >
                  {/* Home icon */}
                  <FaUserLarge size={20} />
                  <span className="is-drawer-close:hidden">
                    My Profile Dashboard
                  </span>
                </Link>
              </li>

              {/* Sitting-------------------- */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <IoSettings size={20} />
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
