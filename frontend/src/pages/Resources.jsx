 import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaBookOpen, FaHeadphones, FaMedal } from 'react-icons/fa';
import BookAppointmentCTA from '../components/BookAppointment';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "5 Mindfulness Techniques to Reduce Anxiety",
    excerpt: "Learn simple mindfulness exercises you can practice anywhere to calm your mind and reduce anxiety symptoms.",
    category: "Anxiety Relief",
    readTime: "5 min read",
    icon: <FaLeaf className="text-green-500" />
  },
  {
    id: 2,
    title: "Building Emotional Resilience in Tough Times",
    excerpt: "Discover strategies to strengthen your emotional resilience and cope better with life's challenges.",
    category: "Resilience",
    readTime: "7 min read",
    icon: <FaMedal className="text-amber-500" />
  },
  {
    id: 3,
    title: "The Science of Sleep and Mental Health",
    excerpt: "Understand how sleep affects your mental wellbeing and practical tips for better sleep hygiene.",
    category: "Sleep",
    readTime: "6 min read",
    icon: <FaBookOpen className="text-blue-500" />
  },
  {
    id: 4,
    title: "Guided Meditation for Stress Relief",
    excerpt: "A step-by-step guide to meditation techniques that help alleviate stress and promote relaxation.",
    category: "Meditation",
    readTime: "4 min read",
    icon: <FaHeadphones className="text-purple-500" />
  },
  {
    id: 5,
    title: "Nourishing Your Mind: Nutrition for Mental Health",
    excerpt: "Explore the connection between what you eat and how you feel, with brain-boosting food suggestions.",
    category: "Nutrition",
    readTime: "8 min read",
    icon: <FaHeart className="text-pink-500" />
  },
  {
    id: 6,
    title: "Digital Detox: Reclaiming Your Mental Space",
    excerpt: "How reducing screen time can improve your mental health and practical ways to disconnect.",
    category: "Digital Wellness",
    readTime: "5 min read",
    icon: <FaLeaf className="text-green-500" />
  }
];

 const allCategories = [
  "All Resources",
  "Anxiety Relief",
  "Resilience",
  "Sleep",
  "Meditation",
  "Nutrition",
  "Digital Wellness"
];

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All Resources");

  const filteredPosts = selectedCategory === "All Resources" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section (unchanged) */}

        {/* Category Filters - Now Functional */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {allCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === selectedCategory
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Filtered Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-purple-600">No resources found in this category.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
             <motion.div 
          initial={{ scale: 0.98 }}
          whileInView={{ scale: 1 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-center text-white shadow-xl"
        >
          <div className="max-w-2xl mx-auto">
            <FaHeart className="text-pink-300 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need Personalized Help?</h3>
            <p className="text-lg mb-6">
              Our licensed therapists are available to provide one-on-one support tailored to your unique needs.
            </p>
            <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-50 transition-all shadow-md">
             <Link to='/doctors'>Connect with a Therapist</Link>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


// Extracted Blog Post Card as a separate component for better readability
const BlogPostCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-purple-100 rounded-full mr-4">
          {post.icon}
        </div>
        <div>
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="block text-xs text-gray-500">{post.readTime}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center">
        Read More
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </motion.div>
);

export default Resources;