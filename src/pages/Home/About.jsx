import React, { useContext } from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaHandshake } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext/AuthContext';

const AboutSection = () => {
  const { user, signOutUser } = useContext(AuthContext);
  
  // Preload the background image to prevent flickering
  React.useEffect(() => {
    const img = new Image();
    img.src = 'https://i.postimg.cc/LsbSJ2Qw/aboutback.jpg';
  }, []);

  return (
    <section className="py-16 relative overflow-hidden bg-gray-50">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {/* Background image with multiple fallback mechanisms */}
        <picture>
          <source 
            srcSet="https://i.postimg.cc/LsbSJ2Qw/aboutback.jpg" 
            type="image/jpeg" 
          />
          <img
            src="https://i.postimg.cc/LsbSJ2Qw/aboutback.jpg"
            alt="MUN Club Background"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.1,
              filter: 'blur(0.5px)',
              willChange: 'transform' // Optimizes animations
            }}
            loading="eager"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </picture>
        {/* Overlay for better text contrast */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/70"
          aria-hidden="true"
        />
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with improved semantics */}
        <header className="text-center mb-16 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Our MUN Club
          </h1>
          <div 
            className="w-20 h-1 bg-blue-600 mx-auto"
            aria-hidden="true"
          />
        </header>

        {/* History Section */}
        <article className="mb-16 max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
            <FaCalendarAlt 
              className="mr-3 text-blue-600" 
              aria-hidden="true" 
            />
            <span>Our Story</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Founded in 2018 at XYZ University, our Model UN Club was created to empower students with{' '}
            <span className="font-semibold text-blue-600">
              leadership, diplomacy, and critical thinking skills
            </span>{' '}
            through realistic UN simulations. What began as a small group of 20 passionate delegates has grown into one of the region's most prestigious MUN programs.
          </p>
          <blockquote className="bg-blue-50/80 p-6 rounded-lg border-l-4 border-blue-600 shadow-inner">
            <p className="italic text-gray-800 text-lg">
              "We believe in shaping future leaders who can navigate complex global challenges with confidence and compassion."
            </p>
          </blockquote>
        </article>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: FaUsers, value: '50+', label: 'Delegates Trained Annually' },
            { icon: FaCalendarAlt, value: '1', label: 'Annual Conference' },
            { icon: FaHandshake, value: '20+', label: 'Partner Institutions' },
            { icon: FaTrophy, value: '20', label: 'Average Annual Awards' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <stat.icon 
                className="text-4xl text-blue-600 mx-auto mb-4" 
                aria-hidden="true" 
              />
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

