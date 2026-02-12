import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

//Distirct -----------------------
const districtsData = [
  { id: "dhaka", name: "Dhaka", upazilas: ["Dhanmondi", "Gulshan", "Mirpur"] },
  {
    id: "comilla",
    name: "Comilla",
    upazilas: ["Debidwar", "Chandina", "Muradnagar"],
  },
];

const CreateDonationRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [upazilas, setUpazilas] = useState([]);

  //! get user by email --------------------
  const {
    data: profile,
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
  //console.log("profile", profile);

  //! react-form hook------------------
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const selectedDistrict = watch("recipientDistrict");

  useEffect(() => {
    // Update upazilas when district changes
    if (selectedDistrict) {
      const district = districtsData.find((d) => d.id === selectedDistrict);
      setUpazilas(district ? district.upazilas : []);
      setValue("recipientUpazila", "");
    }
  }, [selectedDistrict, setValue]);

  const onSubmit = async (data) => {
    console.log("data:", data);
    if (profile?.status !== "active") {
      toast.error(
        "Your account is blocked. You cannot create donation requests.",
      );
      return;
    }

    try {
      const donationRequest = {
        requesterName: profile.displayName,
        requesterEmail: profile.email,
        recipientName: data.recipientName,
        recipientDistrict: data.recipientDistrict,
        recipientUpazila: data.recipientUpazila,
        hospitalName: data.hospitalName,
        fullAddress: data.fullAddress,
        bloodGroup: data.bloodGroup,
        donationDate: data.donationDate,
        donationTime: data.donationTime,
        requestMessage: data.requestMessage,
      };

      const res = await axiosSecure.post("/donation-requests", donationRequest);

      if (res.data?.insertedId) {
        toast.success("Donation request created successfully!");
        reset();
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create donation request.");
    }
  };

  return (
    <div className="my-8 max-w-xl mx-auto p-6 shadow-2xl rounded">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-primary">
        Create Donation Request 🩸
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* displayName- readOnly-----------*/}
        <div>
          <label className="text-[14px] text-gray-600">Requester Name</label>
          <input
            type="text"
            value={profile?.displayName}
            readOnly
            className="w-full border border-gray-300 p-2 rounded bg-gray-100"
          />
        </div>
        {/* email-- readOnly------------- */}
        <div>
          <label className="text-[14px] text-gray-600">Requester Email</label>
          <input
            type="email"
            value={profile?.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/*recipientName */}
        <div>
          <label className="text-[14px] text-gray-600">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Recipient Name"
          />
        </div>
        {/* recipient District------------------ */}
        <div>
          <label className="text-[14px] text-gray-600">
            Recipient District
          </label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select District</option>
            {districtsData.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        {/* recipient Upazila----------------- */}
        <div>
          <label className="text-[14px] text-gray-600">Recipient Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        {/* hospital Name------------ */}
        <div>
          <label className="text-[14px] text-gray-600">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Hospital Name"
          />
        </div>
        {/* full Address-----------------*/}
        <div>
          <label className="text-[14px] text-gray-600">Full Address</label>
          <input
            type="text"
            {...register("fullAddress", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Full Address"
          />
        </div>
        {/* bloodGroup-------------------- */}
        <div>
          <label className="text-[14px] text-gray-600">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        {/* donation Date----------- */}
        <div>
          <label className="text-[14px] text-gray-600">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>
        {/* donationTime------------------- */}
        <div>
          <label className="text-[14px] text-gray-600">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>
        {/* requestMessage---------- */}
        <div>
          <label className="text-[14px] text-gray-600">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Request Message..."
          />
        </div>
        {/* button----------------- */}
        <button
          type="submit"
          className="w-full bg-primary text-white px-6 py-2 rounded hover:bg-accent transition"
        >
          Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
