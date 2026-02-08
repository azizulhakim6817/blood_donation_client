import { Outlet } from "react-router";
import Navbar from "../pages/shared/navbar/Navbar";
import Footer from "./../pages/shared/footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <div className=" mx-auto flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
