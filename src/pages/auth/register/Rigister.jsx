import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import useAuth from "./../../../hooks/useAuth";
import axios from "axios";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const Rigister = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const axiosInstance = useAxiosInstance();

  // react-hook-form---------------------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //! district---upazilas------------------------------
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const selectedDistrictId = watch("district");
  // districts load
  useEffect(() => {
    fetch("/data/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data[2].data);
      });
  }, []);

  // upazilas load & filter
  useEffect(() => {
    if (!selectedDistrictId) {
      setUpazilas([]);
      return;
    }
    fetch("/data/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const allUpazilas = data[2].data;
        const filtered = allUpazilas.filter(
          (u) => u.district_id === selectedDistrictId,
        );

        setUpazilas(filtered);
      });
  }, [selectedDistrictId]);

  //! handleRegisterSubmit------------
  const handleRegisterSubmit = async (data) => {
    //console.log("Data user", data);
    const avatarImg = data?.avatar?.[0];
    try {
      const result = await registerUser(data.email, data.password);
      //console.log("firebase user:", result.user);
      //!imgbb upload image ------------------------------
      // new FormData()----js--------
      const formData = new FormData();
      formData?.append("image", avatarImg);
      //imgbb api_url-------
      const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_APIKEY}`;

      axios.post(img_api_url, formData).then((res) => {
        //console.log("user", res?.data?.data?.display_url);
        const photoURL = res?.data?.data?.display_url;
        const districtName = districts.find(
          (d) => d.id === data.district,
        )?.name;

        const userInfo = {
          displayName: data?.name,
          email: data?.email,
          photoURL: photoURL,
          blood_group: data?.blood_group,
          district: districtName,
          upazila: data?.upazila,
        };

        axiosInstance.post(`user`, userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log(res.data);
          }
        });
      });
      /* end-------- */
      toast.success("Registration is successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register and Email already existed!");
    }
  };

  return (
    <div className="mx-auto my-10 card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="text-xl md:text-2xl font-bold text-center text-secondary">
          Registration
        </h3>
        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="Your email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <label className="label">Confirm Password</label>
            <input
              type="password"
              {...register("confirm_password", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full"
              placeholder="Confirm password"
            />
            {errors.confirm_password && (
              <p className="text-red-500">{errors.confirm_password.message}</p>
            )}

            {/* Avatar */}
            <label className="label">Avatar</label>
            <input
              type="file"
              accept="image/*"
              {...register("avatar", { required: "Avatar is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.avatar && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}

            {/* blood_group ------------------ */}
            <label className="label">Blood Group</label>
            <select
              {...register("blood_group", { required: true })}
              className="select select-bordered w-full"
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
            {errors.blood_group && (
              <p className="text-red-500">Blood Group is required</p>
            )}

            {/* District ------------------ */}
            <label className="label">District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>

              {districts?.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>

            {errors?.district && (
              <p className="text-red-500">District is required</p>
            )}
            {/* Upazila ------------------ */}
            <label className="label">Upazila</label>
            <select
              {...register("upazila", { required: true })}
              className="select select-bordered w-full"
              disabled={!selectedDistrictId}
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>

            {errors?.upazila && (
              <p className="text-red-500">Upazila is required</p>
            )}
            {/* submit button--------------- */}
            <button className="btn bg-primary mt-4 text-base-100 hover:bg-accent">
              Register
            </button>
            <p className="text-sm text-center mt-2">
              {/* already have an account------------- */}
              Already have an account?
              <Link
                /*  state={locatoin.state} */
                to="/login"
                className="text-blue-600 font-bold"
              >
                <span> Login</span>
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Rigister;
