import { useState, useEffect } from "react";

// Simple counter animation for statistics
const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 50);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 50);
  }, [value]);
  return <span>{count}</span>;
};

const About = () => {
  return (
    <div className="bg-red-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex flex-col justify-center items-center text-center px-4 bg-red-100 overflow-hidden">
        <h1 className="text-5xl  font-extrabold text-red-700 mb-4">
          Donate Blood, Save Lives
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mb-6">
          Your single donation can save up to 3 lives. Join our community of
          donors today.
        </p>
        <button className="bg-red-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition mb-6">
          Donate Now
        </button>

        {/* Interactive element: Simple animated background circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-16 text-center">
        <h2 className="text-4xl font-bold mb-12">How It Helps</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition transform">
            <div className="text-red-600 text-5xl mb-4">❤️</div>
            <h3 className="text-2xl font-semibold mb-2">Save Lives</h3>
            <p className="text-gray-600">
              Every donation helps patients survive in critical conditions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition transform">
            <div className="text-red-600 text-5xl mb-4">💪</div>
            <h3 className="text-2xl font-semibold mb-2">Healthy Habit</h3>
            <p className="text-gray-600">
              Regular donations promote good health and community engagement.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition transform">
            <div className="text-red-600 text-5xl mb-4">🌍</div>
            <h3 className="text-2xl font-semibold mb-2">Community Impact</h3>
            <p className="text-gray-600">
              Helps hospitals maintain steady blood supply for those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics */}
      <section className="py-16 px-4 md:px-16 bg-red-100 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-4xl font-bold text-red-700">
              <AnimatedNumber value={10000} />+
            </h3>
            <p className="text-gray-700 mt-2">Donors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-red-700">
              <AnimatedNumber value={25000} />+
            </h3>
            <p className="text-gray-700 mt-2">Blood Units Collected</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-red-700">
              <AnimatedNumber value={50} />+
            </h3>
            <p className="text-gray-700 mt-2">Campaigns</p>
          </div>
        </div>
      </section>

      {/* Donor Stories / Carousel */}
      <section className="py-20 px-4 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-12">Donor Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-600 mb-4">
              "Donating blood was a simple way to help others. I feel proud to
              save lives."
            </p>
            <p className="font-semibold text-red-600">– John Doe</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-600 mb-4">
              "This platform made it easy to donate. The staff were friendly and
              professional."
            </p>
            <p className="font-semibold text-red-600">– Jane Smith</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-600 mb-4">
              "I encourage everyone to donate. It’s rewarding and saves lives!"
            </p>
            <p className="font-semibold text-red-600">– Alice Brown</p>
          </div>
        </div>
      </section>

      {/* Blood Donation Process */}
      <section className="py-20 px-4 md:px-16 text-center">
        <h2 className="text-4xl font-bold mb-12">Donation Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Register</h3>
            <p className="text-gray-600">Sign up online or at the center.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Screening</h3>
            <p className="text-gray-600">Health check before donation.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Donate</h3>
            <p className="text-gray-600">Safe blood donation procedure.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Recovery</h3>
            <p className="text-gray-600">
              Rest and refreshments after donation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-gray-700 mb-6">
          Join our community of blood donors and save lives today.
        </p>
        <button className="bg-red-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition">
          Donate Now
        </button>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Who can donate blood?</h3>
            <p className="text-gray-600">
              Healthy individuals aged 18–65, meeting weight and health
              criteria.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">How often can I donate?</h3>
            <p className="text-gray-600">
              Whole blood donation: every 3 months; platelets: every 2 weeks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Is it safe?</h3>
            <p className="text-gray-600">
              Yes, all procedures follow strict hygiene and safety standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
