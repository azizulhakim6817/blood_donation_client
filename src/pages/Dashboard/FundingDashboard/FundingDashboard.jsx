import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { IoLogoUsd } from "react-icons/io5";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";

const FundingDashboard = () => {
  const openRef = useRef(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users, setUusers] = useState([]);
  const [amount, setAmount] = useState("");

  //! get-funding -----------------
  const { data: funds = [], isLoading } = useQuery({
    queryKey: ["fundings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get-funding");
      return res.data;
    },
  });

  //! handleOpenModal----------------------
  const handleOpenModal = () => {
    if (openRef.current) {
      openRef.current.showModal();
    }
  };
  //! handleCloseModal --> close-butotn----------------------
  const handleCloseModal = () => {
    if (openRef.current) {
      openRef.current.close();
    }
  };

  //! user find by email-----------------
  useEffect(() => {
    const usersFind = async () => {
      try {
        if (!user?.email) return;
        const res = await axiosSecure.get(`/get-user?email=${user?.email}`);
        setUusers(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    usersFind();
  }, [user?.email]);

  //! handlePayment----------------------
  const handlePayment = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return toast.error("Please enter a valid amount");
    }

    const paymentInfo = {
      donorName: users?.displayName,
      donorEmail: users?.email,
      amount: Number(amount),
    };

    try {
      // 1️⃣ Save funding
      const fundingRes = await axiosSecure.post("/funding", paymentInfo);
      if (!fundingRes.data.insertedId) {
        return toast.error("Failed to save funding");
      }

      // 2️⃣ Create Stripe session
      const sessionRes = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      if (sessionRes.data.url) {
        window.location.assign(sessionRes.data.url);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Payment failed");
    }
  };

  //! loading-------------------
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-4 md:px-10 mt-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className=" mt-3 flex gap-2 justify-center items-center text-primary text-xl md:text-2xl font-bold text-center">
          <span className="hidden md:block"> Welcome,</span>
          <span className="text-secondary text-[16px] md:text-2xl">
            Funding History
          </span>
          !
          <span className="text-accent text-[16px] md:text-2xl">
            <IoLogoUsd />
          </span>
        </h1>

        <button
          onClick={handleOpenModal}
          className="btn bg-primary text-white hover:bg-accent"
        >
          <FaMoneyBillWave /> Give Fund
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={fund._id}>
                <td>{index + 1}</td>
                <td>{fund.donorName}</td>
                <td>${fund.amount}</td>
                <td>{new Date(fund.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Dialogs--------------------- */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={openRef} className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">Confirm Your Donation</h3>

          {/* Donor Info */}
          <div className="space-y-3">
            <input
              type="text"
              value={users?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="email"
              value={users?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Your Amount..."
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-action flex justify-between mt-4">
            <button onClick={handlePayment} className="btn btn-success">
              Confirm
            </button>
            <button onClick={handleCloseModal} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FundingDashboard;
