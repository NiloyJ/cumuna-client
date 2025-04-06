import React, { useContext } from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaHandshake } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext/AuthContext';

const AboutSection = () => {
  const { user, signOutUser } = useContext(AuthContext);
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our MUN Club</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* 1. History & Purpose */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Our Story
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2018 at XYZ University, our Model UN Club was created to empower students with <span className="font-semibold text-blue-600">leadership, diplomacy, and critical thinking skills</span> through realistic UN simulations. What began as a small group of 20 passionate delegates has grown into one of the region's most prestigious MUN programs.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="italic text-gray-700">
                "We believe in shaping future leaders who can navigate complex global challenges with confidence and compassion."
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Founding members"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>

        {/* 2. Impact & Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">50+</h4>
            <p className="text-gray-600">Delegates Trained Every year</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaCalendarAlt className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">1</h4>
            <p className="text-gray-600">Conferences every year</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaHandshake className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">20+</h4>
            <p className="text-gray-600">Partner Institutions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaTrophy className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-gray-800">20</h4>
            <p className="text-gray-600">Awards each year on average</p>
          </div>
        </div>

        {/* Bonus: Video Testimonial */}

      </div>
    </section>
  );
};

export default AboutSection;

