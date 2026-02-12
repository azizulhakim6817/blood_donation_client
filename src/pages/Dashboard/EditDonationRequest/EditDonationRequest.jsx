import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //! react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // State to store fetched data
  const [requestData, setRequestData] = useState(null);

  // Load existing request
  useEffect(() => {
    axiosSecure
      .get(`/single-donation-requests/${id}`)
      .then((res) => {
        setRequestData(res.data);
        reset(res.data);
      })
      .catch(() => {
        toast.error("Failed to load donation request");
      });
  }, [id, reset, axiosSecure]);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("data:", data);
    try {
      const res = await axiosSecure.patch(
        `/edit-donation-request/all/${data?._id}`,
        data,
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Donation request updated successfully");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (err) {
      toast.error("Failed to update donation request");
      console.error(err);
    }
  };

  if (!requestData) {
    return <p className="text-center mt-10">Loading donation request...</p>;
  }

  return (
    <div className="p-6 my-8 max-w-lg mx-auto shadow-2xl">
      <h2 className=" text-center text-primary text-xl md:text-2xl font-bold mb-3">
        Edit Donation Request 🩸
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Recipient Name</label>
        <input
          {...register("recipientName")}
          placeholder="Recipient Name"
          className="input input-bordered w-full"
        />
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Recipient District</label>
        <select
          {...register("recipientDistrict")}
          className="select select-bordered w-full"
        >
          <option value="dhaka">Dhaka</option>
          <option value="comilla">Comilla</option>
        </select>
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Recipient Upazila</label>
        <select
          {...register("recipientUpazila")}
          className="select select-bordered w-full"
        >
          <option value="Dhanmondi">Dhanmondi</option>
          <option value="Mirpur">Mirpur</option>
        </select>
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Hospital Name</label>
        <input
          {...register("hospitalName")}
          placeholder="Hospital Name"
          className="input input-bordered w-full"
        />
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Full Address</label>
        <input
          {...register("fullAddress")}
          placeholder="Full Address"
          className="input input-bordered w-full"
        />
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Blood Group</label>
        <select
          {...register("bloodGroup")}
          className="select select-bordered w-full"
        >
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Donation Date</label>
        <input
          type="date"
          {...register("donationDate")}
          className="input input-bordered w-full"
        />
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Donation Time</label>
        <input
          type="time"
          {...register("donationTime")}
          className="input input-bordered w-full"
        />
        {/* submit button-------------- */}
        <label className="text-[14px] text-gray-600">Request Message</label>
        <textarea
          {...register("requestMessage")}
          className="textarea textarea-bordered w-full"
        />
        {/* submit button-------------- */}
        <button type="submit" className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
