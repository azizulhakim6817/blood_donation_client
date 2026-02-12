import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { IoLogoUsd } from "react-icons/io5";

const FundingDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: funds = [], isLoading } = useQuery({
    queryKey: ["fundings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get-funding");
      return res.data;
    },
  });

  //! loading-------------------
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-4 md:px-10 mt-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className=" mt-3 flex gap-2 justify-center items-center text-primary text-xl md:text-2xl font-bold text-center">
          <span className="hidden md:block"> Welcome,</span>
          <span className="text-secondary text-[16px] md:text-2xl">Funding History</span>!
          <span className="text-accent text-[16px] md:text-2xl">
            <IoLogoUsd />
          </span>
        </h1>

        <button className="btn bg-primary text-white hover:bg-accent">
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
                <td>{new Date(fund.fundingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundingDashboard;
