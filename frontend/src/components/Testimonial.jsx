import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaHeart,
  FaUserCircle,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Mood Mantra helped me find a therapist who truly understands my needs. The personalized matching made all the difference in my healing journey.",
      author: "Sarah K.",
      role: "Patient since 2022",
      rating: 5,
      avatar: "SK",
      color: "from-blue-500 to-cyan-500",
    },
    {
      quote:
        "The assessment tools gave me insights I never had before about my anxiety patterns. It's like they know exactly what I need.",
      author: "Michael T.",
      role: "User for 8 months",
      rating: 5,
      avatar: "MT",
      color: "from-purple-500 to-pink-500",
    },
    {
      quote:
        "As a professional, I appreciate how easy Mood Mantra makes it to connect with clients. The platform is intuitive and secure.",
      author: "Dr. Priya M.",
      role: "Therapist Partner",
      rating: 5,
      avatar: "PM",
      color: "from-green-500 to-emerald-500",
    },
    {
      quote:
        "I was skeptical at first, but after just 3 sessions I noticed significant improvement in my mood. The therapists are amazing.",
      author: "David R.",
      role: "Patient for 3 months",
      rating: 5,
      avatar: "DR",
      color: "from-orange-500 to-red-500",
    },
    {
      quote:
        "The matching algorithm is incredible - my therapist is perfectly suited to my personality. I feel truly understood.",
      author: "Emma L.",
      role: "Patient since 2021",
      rating: 5,
      avatar: "EL",
      color: "from-indigo-500 to-purple-500",
    },
    {
      quote:
        "Mood Mantra's platform is intuitive and the support team is responsive and caring. They really care about your well-being.",
      author: "James P.",
      role: "Patient for 1 year",
      rating: 5,
      avatar: "JP",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <FaStar
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "50+", label: "Expert Therapists" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8 border border-purple-100"
          >
            <FaHeart className="text-pink-500 text-xl mr-3" />
            <span className="text-purple-800 font-semibold">
              Client Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Voices of{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Trust
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from people who've transformed their mental health journey with
            Mood Mantra
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 h-full relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

              
 

                {/* Rating */}
                <div className="mb-6">
                  <RatingStars rating={testimonial.rating} />
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-8 text-lg leading-relaxed relative z-10">
                  {testimonial.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <FaCheckCircle className="mr-3" />
            <span className="text-lg font-semibold">Share Your Story</span>
            <FaArrowRight className="ml-3" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
