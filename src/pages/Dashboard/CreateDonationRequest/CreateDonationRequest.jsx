import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districtLoading, setDistrictLoading] = useState(true);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${user?.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const selectedDistrict = watch("district");

  //! Load districts
  useEffect(() => {
    fetch("/data/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data[2]?.data || []);
        setDistrictLoading(false);
      })
      .catch(() => setDistrictLoading(false));
  }, []);

  //! Update upazilas when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      setValue("recipientUpazila", "");
      return;
    }

    fetch("/data/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const allUpazilas = data[2]?.data || [];
        const districtObj = districts.find((d) => d.name === selectedDistrict);

        if (!districtObj) {
          setUpazilas([]);
          setValue("recipientUpazila", "");
          return;
        }

        const filtered = allUpazilas.filter(
          (u) => u.district_id === districtObj.id,
        );
        setUpazilas(filtered);
        setValue("recipientUpazila", "");
      });
  }, [selectedDistrict, districts, setValue]);

  //! Handle form submit
  const onSubmit = async (data) => {
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
        recipientDistrict: data.district,
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
    <div className="my-8 max-w-xl mx-auto p-6 shadow-2xl rounded bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Create Donation Request 🩸
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Requester Name */}
        <label className="text-sm text-gray-600">Requester Name</label>
        <input
          type="text"
          value={profile?.displayName || ""}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        {/* Requester Email */}
        <label className="text-sm text-gray-600">Requester Email</label>
        <input
          type="email"
          value={profile?.email || ""}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />

        {/* Recipient Info------------------------- */}
        {/* Recipient Name----*/}
        <label className="text-sm text-gray-600">Recipient Name</label>
        <input
          type="text"
          placeholder="Recipient Name"
          {...register("recipientName", { required: true })}
          className="w-full border p-2 rounded"
        />
        {/* District------------------- */}
        <label className="text-sm text-gray-600">District</label>
        <select
          {...register("district", { required: true })}
          disabled={districtLoading}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-red-400"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        {/* Recipient Upazila------------------- */}
        <label className="text-sm text-gray-600">Recipient Upazila</label>
        <select
          {...register("recipientUpazila", { required: true })}
          disabled={!selectedDistrict || upazilas.length === 0}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-red-400"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
        {/* Hospital Name------------------- */}
        <label className="text-sm text-gray-600">Hospital Name</label>
        <input
          type="text"
          placeholder="Hospital Name"
          {...register("hospitalName", { required: true })}
          className="w-full border p-2 rounded"
        />
        {/* Full Address------------------ */}
        <label className="text-sm text-gray-600">Full Address</label>
        <input
          type="text"
          placeholder="Full Address"
          {...register("fullAddress", { required: true })}
          className="w-full border p-2 rounded"
        />
        {/* bloodGroup------------------ */}
        <label className="text-sm text-gray-600">Blood Group</label>
        <select
          {...register("bloodGroup", { required: true })}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
        {/* date------------------- */}
        <label className="text-sm text-gray-600">Recipient Name</label>
        <input
          type="date"
          {...register("donationDate", { required: true })}
          className="w-full border p-2 rounded"
        />
        {/* Recipient Name------------------- */}
        <label className="text-sm text-gray-600">Recipient Name</label>
        <input
          type="time"
          {...register("donationTime", { required: true })}
          className="w-full border p-2 rounded"
        />
        {/*  equest Message------------------- */}
        <label className="text-sm text-gray-600">Request Message</label>
        <textarea
          placeholder="Request Message..."
          {...register("requestMessage", { required: true })}
          rows={4}
          className="w-full border p-2 rounded"
        />
        {/* submit button------------------- */}

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
