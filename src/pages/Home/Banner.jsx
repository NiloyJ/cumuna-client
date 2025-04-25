

// import React, { useState, useEffect, useContext } from 'react';
// import { API_URL } from '../../config/config';
// import AuthContext from '../../context/AuthContext/AuthContext';

// const HeroBanner = () => {
//   const { user } = useContext(AuthContext);
//   const [bannerUrl, setBannerUrl] = useState('https://i.postimg.cc/PqQrYR6F/cumun-1.jpg');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch banner URL from API
//   useEffect(() => {
//     const fetchBanner = async () => {
//       try {
//         const response = await fetch(`${API_URL}/about_stats/banner`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.url) {
//             setBannerUrl(data.url);
//           }
//         } else {
//           throw new Error('Failed to fetch banner');
//         }
//       } catch (err) {
//         console.error('Error fetching banner:', err);
//         setError('Failed to load banner image');
//         // Keep the default banner image if API fails
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanner();
//   }, []);

//   // If you want the banner to update in real-time when changed elsewhere
//   // You could implement WebSocket or polling here

//   if (loading) {
//     return (
//       <div className="relative w-full h-screen flex items-center justify-center bg-gray-200">
//         <p>Loading banner...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-auto min-h-screen">
//       {/* Background Image - Full height on mobile */}
//       <div className="h-screen max-h-[100vh] w-full overflow-hidden">
//         <img
//           src={bannerUrl}
//           alt="YMUN Background"
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             // Fallback to default image if the fetched URL fails
//             e.target.src = 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg';
//           }}
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//       </div>

//       {/* Text Content - Appears below image on mobile */}
//       <div className="container mx-auto px-4 py-12 md:absolute md:inset-0 md:flex md:items-center md:justify-end">
//         <div className="relative z-10 w-full md:ml-auto md:max-w-xl bg-white bg-opacity-80 p-6 md:p-8 rounded-lg shadow-xl">
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
//             Join the Yale Model United Nations
//           </h1>
//           <p className="text-base md:text-lg text-gray-700 mb-6">
//             Experience the world's most realistic simulation of the United Nations with delegates from over 50 countries.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded transition duration-300">
//               Register Now
//             </button>
//             <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 md:py-3 md:px-6 rounded transition duration-300">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Scrolling Indicator - Only shows on mobile */}
//       <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
//         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//         </svg>
//       </div>

//       {/* Error message if banner fails to load */}
//       {error && (
//         <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeroBanner;

import React, { useState, useEffect, useContext } from 'react';
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

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_URL}/about_stats/banners`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            // Sort banners by their order
            const sortedBanners = [...data].sort((a, b) => a.order - b.order);
            setBanners(sortedBanners);
          }
        } else {
          throw new Error('Failed to fetch banners');
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Failed to load banner images');
        // Keep the default banners if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length <= 1) return; // No need for rotation if only 1 banner
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-200">
        <p>Loading banners...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-auto min-h-screen">
      {/* Slider Container */}
      <div className="h-screen max-h-[100vh] w-full overflow-hidden relative">
        {/* Slides */}
        <div className="flex h-full w-full transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={banner.url}
                alt={`YMUN Banner ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to default image if the fetched URL fails
                  e.target.src = index === 0 
                    ? 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg' 
                    : `https://via.placeholder.com/800x200?text=Banner+${index + 1}`;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button 
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-20"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-20"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Content - Same as before */}
      <div className="container mx-auto px-4 py-12 md:absolute md:inset-0 md:flex md:items-center md:justify-end">
        <div className="relative z-10 w-full md:ml-auto md:max-w-xl bg-white bg-opacity-80 p-6 md:p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Join the Yale Model United Nations
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Experience the world's most realistic simulation of the United Nations with delegates from over 50 countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded transition duration-300">
              Register Now
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 md:py-3 md:px-6 rounded transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Error message if banners fail to load */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;