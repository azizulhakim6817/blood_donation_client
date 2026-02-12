import useAxiosInstance from "./../../../hooks/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfileDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //!district and upazilas setState-----------------
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  //! react-form-hook-------------------------
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {},
  });

  //! toggle button edit and save----------
  const [isEditing, setIsEditing] = useState(false);

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

  //  set react-hook-form values------------
  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  // form selete distict----------------------------
  const selectedDistrictId = watch("district");

  //! onSubmit button ---------------------
  const onSubmit = async (data) => {
    try {
      const { _id, ...updateData } = data;
      await axiosSecure.patch(`/update-user/${profile?._id}`, updateData);
      toast.success("Profile updated successfully");
      refetch();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed!");
    }
  };

  // load districts
  useEffect(() => {
    fetch("/data/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data[2]?.data || []));
  }, []);

  // load upazilas based on district
  useEffect(() => {
    if (!selectedDistrictId) {
      setUpazilas([]);
      return;
    }

    fetch("/data/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const allUpazilas = data[2]?.data || [];

        const districtObj = districts.find(
          (d) => d.name === selectedDistrictId,
        );

        if (!districtObj) {
          setUpazilas([]);
          return;
        }
        setUpazilas(
          allUpazilas.filter((u) => u.district_id === districtObj.id),
        );
      });
  }, [selectedDistrictId, districts]);

  if (isLoading) return <Loading />;

  return (
    <div className="my-8 max-w-xl mx-auto p-6 bg-white shadow-2xl rounded">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        {!isEditing ? (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-2"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
            Edit
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-primary text-white px-6 py-1 rounded flex items-center gap-2"
          >
            <FaSave />
            Save
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block ">Display Name</label>
          <input
            type="text"
            {...register("displayName")}
            disabled={!isEditing}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block ">Email</label>
          <input
            type="email"
            {...register("email")}
            disabled
            className="w-full border px-2 py-1 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block ">Photo URL</label>
          <input
            type="text"
            {...register("photoURL")}
            disabled={!isEditing}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block ">District</label>
          <select
            {...register("district")}
            disabled={!isEditing}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block ">Upazila</label>
          <select
            {...register("upazila")}
            disabled={!isEditing || !selectedDistrictId}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Select Upazila</option>
            {upazilas?.map((u) => (
              <option key={u?.id} value={u?.name}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block ">Blood Group</label>
          <select
            {...register("blood_group")}
            disabled={!isEditing}
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
      </form>
    </div>
  );
};

export default ProfileDashboard;
