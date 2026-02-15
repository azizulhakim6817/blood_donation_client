import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home/Home/Home";
import Login from "../pages/auth/login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import ProfileDashboard from "../pages/Dashboard/ProfileDashboard/ProfileDashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layout/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/auth/register/Register";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests/MyDonationRequests";
import EditDonationRequest from "../pages/Dashboard/EditDonationRequest/EditDonationRequest";
import DonationRequestDetails from "../pages/Dashboard/DonationRequestDetails/DonationRequestDetails";
import AdminRoute from "./AdminRoute";
import FundingDashboard from "../pages/Dashboard/FundingDashboard/FundingDashboard";
import AllUsersDashboard from "../pages/Dashboard/AllUsersDashboard/AllUsersDashboard";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import DonationRequests from "../pages/home/DonationRequests/DonationRequests";
import Fundings from "../pages/home/Fundings/Fundings";
import Search from "../pages/home/Search/Search";
import BloodDonationRequestDetails from "../pages/home/DonationRequests/BloodDonationRequestDetails";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payments/PaymentCancel/PaymentCancel";

const route = createBrowserRouter([
  /* rool-layout---------------- */
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "donation-reqests",
        Component: DonationRequests,
      },
      {
        path: "blood-donation-reqests-details/:id",
        element: (
          <PrivateRoute>
            <BloodDonationRequestDetails></BloodDonationRequestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "fundings",
        Component: Fundings,
      },
      {
        path: "search",
        Component: Search,
      },
    ],
  },
  /* Auth layout---------- */
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  /* dashboard layout------------- */
  {
    path: "/dashboard",
    Component: DashboardLayout,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: ProfileDashboard,
      },
      {
        path: "donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },

      {
        path: "edit-donation-request/:id",
        Component: EditDonationRequest,
      },
      /* Donation Request Details------------*/
      {
        path: "donation-request-details/:id",
        Component: DonationRequestDetails,
      },

      /* if (role !== "admin" && role !== "volunteer"---------------) 
      {return <Forbidden />;}------------- */
      {
        path: "funding-dasboard",
        element: (
          <AdminRoute>
            <FundingDashboard></FundingDashboard>
          </AdminRoute>
        ),
      },
      /* all users dashboard----------------------- */
      {
        path: "all-users-dashboard",
        Component: AllUsersDashboard,
      },
      /* all-blood-donation-request---------------- */
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBloodDonationRequest></AllBloodDonationRequest>
          </AdminRoute>
        ),
      },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancel", Component: PaymentCancel },
    ],
  },
]);

export default route;
