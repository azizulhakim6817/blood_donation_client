import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("recipientDistrict");

  // ✅ Load Existing Request
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/single-donation-requests/${id}`);

        // 🔒 Prevent unauthorized edit
        if (res.data.requesterEmail !== user?.email) {
          toast.error("You are not authorized to edit this request.");
          navigate("/dashboard/my-donation-requests");
          return;
        }

        reset(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load donation request");
        navigate("/dashboard/my-donation-requests");
      }
    };

    if (user?.email) fetchRequest();
  }, [id, user?.email, axiosSecure, reset, navigate]);

  // ✅ Load Districts
  useEffect(() => {
    fetch("/data/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data[2]?.data || []);
      })
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  // ✅ Update Upazilas
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

        if (!districtObj) return;

        const filtered = allUpazilas.filter(
          (u) => u.district_id === districtObj.id,
        );

        setUpazilas(filtered);
      });
  }, [selectedDistrict, districts, setValue]);

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/edit-donation-request/all/${id}`,
        data,
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Donation request updated successfully");
        navigate("/dashboard/my-donation-requests");
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      toast.error("Failed to update donation request");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 my-8 max-w-xl mx-auto bg-white shadow-xl rounded-2xl">
      <h2 className="text-center text-primary text-2xl font-bold mb-4">
        Edit Donation Request 🩸
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Recipient Name */}
        <input
          {...register("recipientName", { required: true })}
          placeholder="Recipient Name"
          className="input input-bordered w-full"
        />
        {errors.recipientName && (
          <p className="text-red-500 text-sm">Recipient name is required</p>
        )}

        {/* District */}
        <select
          {...register("recipientDistrict", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          {...register("recipientUpazila", { required: true })}
          disabled={!selectedDistrict}
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Hospital */}
        <input
          {...register("hospitalName", { required: true })}
          placeholder="Hospital Name"
          className="input input-bordered w-full"
        />

        {/* Address */}
        <input
          {...register("fullAddress", { required: true })}
          placeholder="Full Address"
          className="input input-bordered w-full"
        />

        {/* Blood Group */}
        <select
          {...register("bloodGroup", { required: true })}
          className="select select-bordered w-full"
        >
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          {...register("donationDate", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Time */}
        <input
          type="time"
          {...register("donationTime", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Message */}
        <textarea
          {...register("requestMessage")}
          placeholder="Request Message"
          className="textarea textarea-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
