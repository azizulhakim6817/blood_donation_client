import { Link, Outlet } from "react-router";
import Logo from "../components/logo/Logo";
import bloodDonationImg from "../assets/blood_donation.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* logo------------------------------------------*/}
      <Link to="/" className="flex justify-start px-4 py-2">
        <Logo />
      </Link>
      {/* outlet--> auth-image ---------------------------*/}
      <div className="grid gap-4 md:gap-2 my-6 grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="flex-1">
          <Outlet />
        </div>
        {/* auth-img */}
        <div className="flex-1 hidden md:block">
          <img
            className="w-100 h-100"
            src={bloodDonationImg}
            alt="bloodDonationImg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
