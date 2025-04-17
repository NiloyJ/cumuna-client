// import React, { useContext } from 'react';
// import AuthContext from '../../context/AuthContext/AuthContext';

// const HeroBanner = () => {
//   const {user} = useContext(AuthContext);
//   return (
//     <div className="relative w-full h-auto min-h-screen">
//       {/* Background Image - Full height on mobile */}
//       <div className="h-screen max-h-[100vh] w-full overflow-hidden">
//         <img
//           src="https://i.postimg.cc/PqQrYR6F/cumun-1.jpg"
//           alt="YMUN Background"
//           className="w-full h-full object-cover"
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
//     </div>
//   );
// };

// export default HeroBanner;

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const HeroBanner = () => {
  const { user } = useContext(AuthContext);
  const [bannerUrl, setBannerUrl] = useState('https://i.postimg.cc/PqQrYR6F/cumun-1.jpg');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch banner URL from API
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`${API_URL}/about_stats/banner`);
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setBannerUrl(data.url);
          }
        } else {
          throw new Error('Failed to fetch banner');
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
        setError('Failed to load banner image');
        // Keep the default banner image if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // If you want the banner to update in real-time when changed elsewhere
  // You could implement WebSocket or polling here

  if (loading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-200">
        <p>Loading banner...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-auto min-h-screen">
      {/* Background Image - Full height on mobile */}
      <div className="h-screen max-h-[100vh] w-full overflow-hidden">
        <img
          src={bannerUrl}
          alt="YMUN Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to default image if the fetched URL fails
            e.target.src = 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Text Content - Appears below image on mobile */}
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

      {/* Scrolling Indicator - Only shows on mobile */}
      <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Error message if banner fails to load */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;