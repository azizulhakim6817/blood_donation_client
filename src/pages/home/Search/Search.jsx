import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const SearchDonor = () => {
  const { loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districtLoading, setDistrictLoading] = useState(true);

  //! react-hook-form--------------------
  const { register, handleSubmit, watch, reset } = useForm();

  //! handleDataSubmit-----------------
  const handleDataSubmit = async (data) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await axiosSecure.get(
        `/match-data/blood/donations/request?bloodGroup=${data.bloodGroup}&district=${data.district}&upazila=${data.upazila}`,
      );
      // Handlearray or object response
      const donorData = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setDonors(donorData);

      // reset 
      reset({
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      });
    } catch (error) {
      console.log(error);
      setDonors([]);
    }
    setLoading(false);
  };

  //! Watch selected district
  const selectedDistrict = watch("district");

  //! Load districts
  useEffect(() => {
    fetch("/data/districts.json")
      .then((res) => res.json())
      .then((data) => {
        // safe check for structure
        const allDistricts = data?.data || data[2]?.data || [];
        setDistricts(allDistricts);
        setDistrictLoading(false);
      })
      .catch(() => setDistrictLoading(false));
  }, []);

  //! Load upazilas based on district
  useEffect(() => {
    fetch("/data/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const allUpazilas = data?.data || data[2]?.data || [];
        const districtObj = districts.find((d) => d.name === selectedDistrict);

        const filtered = allUpazilas.filter(
          (u) => u?.district_id === districtObj?.id,
        );
        setUpazilas(filtered);
      });
  }, [selectedDistrict, districts]);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Search Blood Donors
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(handleDataSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 grid md:grid-cols-4 gap-6"
        >
          {/* Blood Group */}
          <select
            {...register("bloodGroup", { required: true })}
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            {...register("district", { required: true })}
            disabled={districtLoading}
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d?.id} value={d?.name}>
                {d?.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            {...register("upazila", { required: true })}
            disabled={!selectedDistrict}
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u?.id} value={u?.name}>
                {u?.name}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-accent text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition"
          >
            <FaSearch />
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Results Section */}
        <div className="mt-12">
          {/* Default message */}
          {!searched && !loading && (
            <div className="text-center text-gray-500">
              🔍 Search donors by selecting blood group and location.
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center text-blue-500 font-semibold mt-6">
              Searching donors...
            </div>
          )}

          {/* No donors found */}
          {searched && !loading && donors.length === 0 && (
            <div className="text-center text-red-500 font-semibold mt-6">
              No donors found.
            </div>
          )}

          {/* Donor list */}
          {donors.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {donors
                .filter((donor) => donor?.status === "done")
                .map((donor) => (
                  <div
                    key={donor?._id || donor?.id}
                    className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold">
                      {donor?.recipientName || donor?.name}
                    </h3>
                    <p className="text-red-600 font-semibold">
                      <span className="text-gray-500 text-sm">
                        Blood Group :{" "}
                      </span>
                      {donor?.bloodGroup}
                    </p>
                    <p>
                      {donor?.recipientDistrict || donor?.district} -{" "}
                      {donor?.recipientUpazila || donor?.upazila}
                    </p>
                    <p>Hospital: {donor?.hospitalName || donor?.hospital}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Donation Date: {donor?.donationDate} |{" "}
                      {donor?.donationTime}
                    </p>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg mt-2 w-full">
                      Contact
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchDonor;
