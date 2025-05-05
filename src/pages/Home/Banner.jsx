
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
  const typingSpeed = 100;

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
      setCurrentIndex(prev => prev === banners.length - 1 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    let currentIndex = 0;
    const type = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => setShowCursor(false), 1000);
      }
    };
    typingTimeoutRef.current = setTimeout(type, typingSpeed);
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevSlide = () => setCurrentIndex(prev => prev === 0 ? banners.length - 1 : prev - 1);
  const goToNextSlide = () => setCurrentIndex(prev => prev === banners.length - 1 ? 0 : prev + 1);

  if (loading) return (
    <div className="relative w-full h-[50vh] md:h-screen flex items-center justify-center bg-gray-200">
      <p>Loading banners...</p>
    </div>
  );

  return (
    <div className="relative w-full h-[50vh] md:h-screen overflow-hidden">
      <div className="relative w-full h-full">
        <div className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={banner.url}
                alt={`CUMUNA Banner ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = index === 0 
                    ? 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg' 
                    : `https://via.placeholder.com/800x200?text=Banner+${index + 1}`;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>

        {/* Left-aligned text container with reduced padding */}
        <div className="absolute inset-0 flex items-center z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-12">
          <div className="text-left max-w-3xl">
            <div className="mb-2 sm:mb-3">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center">
                {typedText}
                <span className={`inline-block w-1 h-6 md:h-8 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              </p>
            </div>
            
            <div className="text-white">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 leading-tight">
                Chittagong University<br className="hidden sm:inline" /> Model United Nations Association
              </h1>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-md sm:max-w-lg">
              CUMUNA, founded on 
              April 30, 2014, is one of Bangladesh's preeminent MUN clubs..
              </p>
            </div>
          </div>
        </div>

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
          </>
        )}
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;

