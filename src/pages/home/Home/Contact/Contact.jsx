import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  //handleSubmit-----------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit click");
    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: "Your message has been sent successfully. We will contact you soon.",
      confirmButtonColor: "#facc15",
    });

    e.target.reset();
  };

  return (
    <section className="relative bg-linear-to-br from-[#7b00a8] via-[#1E3A8A] to-[#012b30] py-10 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl  font-extrabold leading-tight bg-linear-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-[14px] mt-2">
            Have questions or need urgent blood assistance? We’re here
            <br></br> to help you 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg">
              <FaPhoneAlt className="text-yellow-400 text-xl" />
              <div>
                <h4 className="font-semibold">Emergency Hotline</h4>
                <p className="text-gray-200">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg">
              <FaEnvelope className="text-pink-400 text-xl" />
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <p className="text-gray-200">support@bloodconnect.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg">
              <FaMapMarkerAlt className="text-green-400 text-xl" />
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-200">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 space-y-5">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <textarea
              rows="4"
              required
              placeholder="Your Message"
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-700 font-semibold py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
