

import React, { useState, useEffect, useContext, useRef } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const HeroBanner = () => {
  const { user } = useContext(AuthContext);
  const [banners, setBanners] = useState([
    { url: 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg', order: 1 },
    { url: 'https://via.placeholder.com/800x200?text=Banner+2', order: 2 },
    { url: 'https://via.placeholder.com/800x200?text=Banner+3', order: 3 }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingTimeoutRef = useRef(null);
  const fullText = "Think Global, Go Global";
  const typingSpeed = 100; // milliseconds per character

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_URL}/about_stats/banners`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const sortedBanners = [...data].sort((a, b) => a.order - b.order);
            setBanners(sortedBanners);
          }
        } else {
          throw new Error('Failed to fetch banners');
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Failed to load banner images');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Typing effect (runs only once)
  useEffect(() => {
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        // Typing complete - hide cursor after a brief delay
        setTimeout(() => setShowCursor(false), 1000);
      }
    };

    // Start typing
    typingTimeoutRef.current = setTimeout(type, typingSpeed);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevSlide = () => setCurrentIndex((prevIndex) => prevIndex === 0 ? banners.length - 1 : prevIndex - 1);
  const goToNextSlide = () => setCurrentIndex((prevIndex) => prevIndex === banners.length - 1 ? 0 : prevIndex + 1);

  if (loading) {
    return (
      <div className="relative w-full h-[50vh] md:h-screen flex items-center justify-center bg-gray-200">
        <p>Loading banners...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-screen overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        <div 
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={banner.url}
                  alt={`YMUN Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = index === 0 
                      ? 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg' 
                      : `https://via.placeholder.com/800x200?text=Banner+${index + 1}`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
              Chittagong University Model United Nations
            </h1>
            <p className="text-lg md:text-2xl text-white h-8 md:h-10 flex items-center justify-center">
              {typedText}
              <span className={`inline-block w-1 h-6 md:h-8 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button 
              onClick={goToPrevSlide}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 md:p-2 rounded-full hover:bg-opacity-75 transition z-20"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNextSlide}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 md:p-2 rounded-full hover:bg-opacity-75 transition z-20"
              aria-label="Next slide"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;