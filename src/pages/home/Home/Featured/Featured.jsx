import { FaTint, FaUsers, FaHeartbeat } from "react-icons/fa";

const Featured = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 ">
          Why Donate Blood?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-[15px]">
          Every donation can save up to three lives. Be part of something bigger
          and help create a healthier community.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <FaTint className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl text-secondary font-semibold mb-3">
              Save Lives
            </h3>
            <p className="text-gray-600 text-[14px]">
              Your single donation can save multiple lives in emergencies and
              surgeries.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl text-secondary font-semibold mb-3">Build Community</h3>
            <p className="text-gray-600 text-[14px]">
              Join thousands of donors and become a hero in your community.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <FaHeartbeat className="text-pink-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl text-secondary font-semibold mb-3">Emergency Support</h3>
            <p className="text-gray-600 text-[14px]">
              Blood is needed every day for accident victims and critical
              patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
