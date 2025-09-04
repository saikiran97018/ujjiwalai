import React, { useEffect, useState } from "react";
import Section from "../layout/Section";
import TestimonialCard from "../ui/TestimonialCard";
import { api } from "../actions/api";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const [position, setPosition] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Fetch top 10 reviews
  useEffect(() => {
    fetch(api + "/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // ✅ Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showForm && e.target.closest('.review-form-container') === null) {
        setShowForm(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showForm]);

  // ✅ Prevent background scrolling when form is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  // ✅ Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return alert("Please enter a review");
    if (stars < 1 || stars > 5) return alert("Please give a star rating (1–5)");

    setIsSubmitting(true);
    try {
      const res = await fetch(`${api}/review/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: reviewText,
          stars,
          position,
          workplace,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Review added successfully");
        setReviews((prev) => [data.review, ...prev].slice(0, 10)); // keep only top 10
        setReviewText("");
        setStars(0);
        setPosition("");
        setWorkplace("");
        setShowForm(false);
      } else {
        alert(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Star rating component
  const StarRating = ({ rating, onRate }) => (
    <div className="flex space-x-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          className={`text-2xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400 transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <Section
      id="testimonials"
      className="bg-white relative"
      title="What Our Users Say"
      subtitle="Join thousands of professionals who have transformed how they work with documents"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 font-semibold"
        >
          ✍️ Write a Review
        </button>
      </div>

      {/* ✅ Reviews Carousel */}
      {reviews.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          autoplay={{ 
            delay: 4000,
            disableOnInteraction: false 
          }}
          loop
          className="pb-12"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="py-4">
              <TestimonialCard
                quote={review.quote}
                initials={review.initials}
                name={review.name}
                position={`${review.position}${review.workplace ? ` @ ${review.workplace}` : ''}`}
                rating={review.stars}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌟</div>
          <p className="text-gray-600 text-lg">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}

      {/* ✅ Enhanced Review Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
          <div className="review-form-container bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Share Your Experience</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your experience? *
                </label>
                <StarRating rating={stars} onRate={setStars} />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  rows="6"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with our service... What did you like? How has it helped you?"
                  required
                />
              </div>

              {/* Position and Workplace */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Position
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., Software Engineer, Student, Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Workplace
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                    placeholder="e.g., Google, Stanford University, Self-Employed"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50"
                  disabled={isSubmitting || !reviewText.trim() || stars === 0}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Testimonials;