import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2 inline-block">Global MUN Club</h3>
            <p className="mb-4 text-gray-300">
              Empowering future leaders through diplomatic simulation and international affairs education since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Upcoming Conferences</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Committees</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Gallery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Executive Board</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Diplomacy Ave, International Hall, University Campus</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>munclub@university.edu</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to our newsletter for conference updates and MUN tips</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-lg font-medium transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Global MUN Club. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;