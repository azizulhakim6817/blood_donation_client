import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";

const DonorSlider = () => {
  const reviews = [
    {
      name: "John Doe",
      text: "Donated blood and saved lives. The process was smooth and staff were very friendly.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      name: "Jane Smith",
      text: "I felt safe donating here. Highly recommended for everyone.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
    },
    {
      name: "Alice Brown",
      text: "Great experience! The team guided me throughout the donation process.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 ">
      <h2 className="text-4xl font-bold text-center mb-12">Donor Reviews</h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop={true}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 bg-white rounded-2xl shadow-md text-center mx-4">
              <img
                src={review.img}
                alt={review.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 mb-4">{review.text}</p>
              <div className="mb-2">{renderStars(review.rating)}</div>
              <p className="font-semibold text-red-600">{review.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DonorSlider;
