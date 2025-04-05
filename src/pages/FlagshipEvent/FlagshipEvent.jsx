import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';

const FlagshipEvent = () => {
    const { user } = useContext(AuthContext);
    const [year, setYear] = useState('2023');
    const [isEditing, setIsEditing] = useState(false);
    const [tempYear, setTempYear] = useState(year);

    useEffect(() => {
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });
        
        // Elements to animate
        const title = document.querySelector('.conference-title');
        const subtitle = document.querySelector('.conference-subtitle');
        const highlights = document.querySelector('.conference-highlights');
        const button = document.querySelector('.cta-button');
        
        if (title) observer.observe(title);
        if (subtitle) observer.observe(subtitle);
        if (highlights) observer.observe(highlights);
        if (button) observer.observe(button);
        
        // Animate highlight cards one by one
        const cards = document.querySelectorAll('.highlight-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${0.4 + (index * 0.1)}s`;
            observer.observe(card);
        });
        
        return () => {
            observer.disconnect();
        };
    }, []);

    const handleEditClick = () => {
        setTempYear(year);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (/^\d{4}$/.test(tempYear)) {
            setYear(tempYear);
        } else {
            alert('Please enter a valid 4-digit year');
            return;
        }
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleYearChange = (e) => {
        setTempYear(e.target.value);
    };

    return (
        <section className="conference-section max-w-7xl mx-auto px-6 py-20 lg:py-28 relative overflow-hidden">
            {/* Floating background shapes */}
            <div className="floating-shapes absolute w-full h-full top-0 left-0 z-1 overflow-hidden">
                <div className="shape shape-1 bg-primary absolute rounded-full opacity-10 w-[300px] h-[300px] top-[-100px] left-[-100px] animate-float-15" />
                <div className="shape shape-2 bg-primary absolute rounded-full opacity-10 w-[200px] h-[200px] bottom-[-50px] right-[-50px] animate-float-12-reverse" />
            </div>
            
            {/* Content container */}
            <div className="conference-container flex flex-col items-center text-center relative z-10">
                <div className="relative">
                    <h1 className="conference-title text-4xl md:text-5xl font-bold text-gray-800 mb-6 opacity-0 translate-y-[20px]">
                        CUMUNA Conference {year}
                    </h1>
                    {user && (
                        <div className="absolute right-0 top-0">
                            {!isEditing ? (
                                <button 
                                    onClick={handleEditClick}
                                    className="btn btn-sm btn-ghost text-gray-500 hover:text-primary"
                                    title="Edit Year"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            ) : (
                                <div className="flex gap-2 bg-white p-2 rounded-lg shadow-md">
                                    <input
                                        type="text"
                                        value={tempYear}
                                        onChange={handleYearChange}
                                        className="input input-sm input-bordered w-20 text-center"
                                        maxLength="4"
                                        pattern="\d{4}"
                                    />
                                    <button 
                                        onClick={handleSaveClick}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={handleCancelClick}
                                        className="btn btn-sm btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <p className="conference-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mb-12 opacity-0 translate-y-[20px] delay-1">
                    Join us for the premier Model United Nations conference featuring engaging debates, 
                    networking opportunities, and insightful discussions on global issues.
                </p>
                
                <div className="conference-highlights flex flex-wrap justify-center gap-6 mb-12 opacity-0 delay-2">
                    <div className="highlight-card bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full sm:w-80 hover:transform hover:-translate-y-[5px] transition-transform">
                        <div className="text-5xl mb-4">🗣️</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Engaging Debates</h3>
                        <p className="text-gray-600">Participate in stimulating discussions on pressing global issues.</p>
                    </div>
                    
                    <div className="highlight-card bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full sm:w-80 hover:transform hover:-translate-y-[5px] transition-transform">
                        <div className="text-5xl mb-4">🌍</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Perspectives</h3>
                        <p className="text-gray-600">Connect with delegates from diverse backgrounds and cultures.</p>
                    </div>
                    
                    <div className="highlight-card bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full sm:w-80 hover:transform hover:-translate-y-[5px] transition-transform">
                        <div className="text-5xl mb-4">🏆</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Awards & Recognition</h3>
                        <p className="text-gray-600">Outstanding delegates will be recognized for their contributions.</p>
                    </div>
                </div>
                
                <button 
                    className="cta-button btn btn-primary px-8 py-3 text-lg font-semibold opacity-0 translate-y-[20px] delay-3"
                    onClick={() => window.location.href = '/conference'}
                >
                    Learn More
                </button>
            </div>

            {/* Add these to your global CSS or Tailwind config */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, 20px); }
                }
                .animate-float-15 { animation: float 15s infinite ease-in-out; }
                .animate-float-12-reverse { animation: float 12s infinite ease-in-out reverse; }
                .fade-in-up {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .delay-1 { transition-delay: 0.2s !important; }
                .delay-2 { transition-delay: 0.4s !important; }
                .delay-3 { transition-delay: 0.6s !important; }
            `}</style>
        </section>
    );
};

export default FlagshipEvent;