import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const Fundings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users, setUusers] = useState([]);
  const [amount, setAmount] = useState("");

  //! get-funding -----------------
  const { data: funds = [], isLoading } = useQuery({
    queryKey: ["fundings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get-single-funding?email=${user?.email}`,
      );
      return res.data;
    },
  });

  //! total fund only by email user---------------
  const total = funds.reduce((sum, fund) => sum + fund?.amount, 0);
  <p>Total: ${total}</p>;

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

  //! handleOpenModal----------------------
  const openRef = useRef(null);
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
      // Save funding
      const fundingRes = await axiosSecure.post("/funding", paymentInfo);
      if (!fundingRes.data.insertedId) {
        return toast.error("Failed to save funding");
      }

      // Create Stripe session
      const sessionRes = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      console.log("Stripe session URL:", sessionRes.data.url); // debug

      if (sessionRes.data.url) {
        window.location.assign(sessionRes.data.url);
      } else {
        toast.error("Stripe session not created");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.error || "Payment failed");
    }
  };

  return (
    <div className="mt-4 mx-4 md:mx-14">
      {/* Welcome back------- */}
      <div className=" text-center bg-linear-to-r from-primary to-secondary text-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Welcome back 👋</h2>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Support our mission and help save lives through funding ❤️
        </p>
      </div>
      {/* Give Fund--> $ --secesion----------------*/}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        {/* Top Section: Button + Total Funds */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Total Funds Card */}
          <div className="flex items-center gap-4 bg-green-100 px-6 py-4 rounded-2xl shadow w-full md:w-auto">
            {/* Icon */}
            <div className="text-4xl md:text-5xl">💰</div>

            {/* Texts */}
            <div className="flex flex-col items-center md:items-start">
              {/* Title */}
              <h3 className="text-sm md:text-base font-semibold text-gray-600">
                Total Funds Raised
              </h3>
              {/* Amount */}
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                ${total}
              </p>
            </div>
          </div>

          {/* Optional: Give Fund Button */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleOpenModal}
              className="btn bg-primary text-white hover:bg-secondary px-6 py-2 rounded-xl shadow w-full md:w-auto"
            >
              💳 Give Fund
            </button>
          </div>
        </div>
      </div>

      {/* show all funiding table------------ */}
      <div className="mb-12 bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, i) => (
              <tr key={i} className="hover">
                <td>{i + 1}</td>
                <td>{fund?.donorName}</td>
                <td className="text-green-600 font-semibold">
                  ${fund?.amount}
                </td>
                <td>{new Date(fund?.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* mobile */}
      <div className="my-4 grid md:hidden gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="font-semibold">Azizul</h4>
          <p className="text-green-600 font-bold">$20</p>
          <p className="text-sm text-gray-500">Feb 14, 2026</p>
        </div>
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

export default Fundings;
