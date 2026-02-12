import { Link, NavLink } from "react-router";
import Logo from "../../../components/logo/Logo";
import useAuth from "./../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDashboardCustomize } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  //! signOutUser--------
  const handlesignOutUser = () => {
    signOutUser();
    toast.success("Logout is successfully");
  };

  //! get-user?email---------query-----
  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${user?.email}`);
      return res.data;
    },
  });

  /* navbar items------------------------ */
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition duration-200 ${
              isActive
                ? "font-bold text-primary"
                : "text-gray-700 font-normal hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-reqests"
          className={({ isActive }) =>
            `transition duration-200 ${
              isActive
                ? "font-bold text-primary"
                : "text-gray-700 font-normal hover:text-primary"
            }`
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/fundings"
          className={({ isActive }) =>
            `transition duration-200 ${
              isActive
                ? "font-bold text-primary"
                : "text-gray-700 font-normal hover:text-primary"
            }`
          }
        >
          Funding
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm md:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        {/* Logo-------------------------------------------- */}
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <Link
            to="/login"
            className="btn bg-primary mt-4 text-base-100 hover:bg-accent"
          >
            Login
          </Link>
        )}
      </div>
      {/* dropdown menu---------------- */}
      <div>
        {user && (
          <details className="dropdown dropdown-end">
            <summary
              className="flex items-center gap-2 m-1 cursor-pointer"
              data-tip={userData?.displayName}
            >
              <div
                className="tooltip tooltip-left"
                data-tip={userData?.displayName}
              >
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={userData?.photoURL} alt="Profile" />
                  </div>
                </div>
              </div>
            </summary>

            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `transition duration-200 ${
                      isActive
                        ? "font-bold text-primary"
                        : "text-gray-700 hover:text-primary font-semibold hover:font-bold"
                    }`
                  }
                >
                  <MdDashboardCustomize size={21} /> Dashboard
                </NavLink>
              </li>
              <li>
                <Link
                  onClick={handlesignOutUser}
                  className=" text-rose-700 mt-2 font-semibold hover:font-bold"
                >
                  <LuLogOut size={21} />
                  Log-out
                </Link>
              </li>
            </ul>
          </details>
        )}
      </div>
    </div>
  );
};

export default Navbar;
