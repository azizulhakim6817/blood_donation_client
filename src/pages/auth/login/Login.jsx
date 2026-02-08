import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  // react-hook-form---------------------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //! handleRegisterSubmit------------
  const handleLoginSubmit = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      console.log("New user:", result.user);
      toast.success("Login is successful");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
    }
  };

  return (
    <div>
      <div className="mx-auto my-8 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="text-xl md:text-2xl font-bold text-center text-secondary">
            Login
          </h3>
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <fieldset className="fieldset">
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
                <p className="text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}

              {/* submit button----------------- */}

              <button className="btn bg-primary mt-4 text-base-100 hover:bg-accent">
                Login
              </button>
              {/* New to Blood Donatoin account------------- */}
              <p className="text-sm text-center mt-2">
                New to Blood Donatoin account?
                <Link
                  to="/register"
                  /*  state={locatoin.state} */
                  className="text-blue-600 font-bold"
                >
                  <span> Register</span>
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
