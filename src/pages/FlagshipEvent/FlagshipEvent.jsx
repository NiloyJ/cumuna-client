
// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext/AuthContext';
// import { API_URL } from '../../config/config';

// const FlagshipEvent = () => {
//     const { user } = useContext(AuthContext);
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         fetch(`${API_URL}/events`)
//             .then(res => res.json())
//             .then(data => {
//                 setEvents(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching event data:', error);
//             });
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('fade-in-up');
//                 }
//             });
//         }, { threshold: 0.1 });

//         const elements = document.querySelectorAll('.animate-on-scroll');
//         elements.forEach(el => observer.observe(el));

//         return () => {
//             observer.disconnect();
//         };
//     }, [events]);

//     return (
//         <section className="conference-section max-w-7xl mx-auto px-6 py-20 lg:py-28 relative overflow-hidden">
//             <div className="floating-shapes absolute w-full h-full top-0 left-0 z-1 overflow-hidden">
//                 <div className="shape shape-1 bg-primary absolute rounded-full opacity-10 w-[300px] h-[300px] top-[-100px] left-[-100px] animate-float-15" />
//                 <div className="shape shape-2 bg-primary absolute rounded-full opacity-10 w-[200px] h-[200px] bottom-[-50px] right-[-50px] animate-float-12-reverse" />
//             </div>

//             <div className="conference-container flex flex-col items-center text-center relative z-10">
//                 <h1 className="conference-title text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-on-scroll opacity-0 translate-y-[20px]">
//                     CUMUNA Conference Events
//                 </h1>

//                 <p className="conference-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mb-12 animate-on-scroll opacity-0 translate-y-[20px] delay-1">
//                     Explore our flagship MUN events with committees, delegates, and impactful themes.
//                 </p>

//                 <div className="conference-highlights flex flex-wrap justify-center gap-6 mb-12 animate-on-scroll opacity-0 delay-2">
//                     {events.map((event) => {
//                         const dateParts = event.dates?.split('/');
//                         const year = dateParts ? dateParts[2] : 'Unknown';

//                         return (
//                             <div key={event._id} className="highlight-card bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full sm:w-80 hover:-translate-y-[5px] transition-transform">
//                                 <img src={event.bannerUrl} alt="Event Banner" className="rounded-lg mb-4 w-full h-40 object-cover" />
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.theme}</h3>
//                                 <p className="text-gray-600 mb-1"><strong>Dates:</strong> {event.dates}</p>
//                                 <p className="text-gray-600 mb-1"><strong>Year:</strong> {year}</p>
//                                 <p className="text-gray-600 mb-1"><strong>Committees:</strong> {event.totalCommittees}</p>
//                                 <p className="text-gray-600 mb-1"><strong>Delegates:</strong> {event.totalDelegates}</p>
//                                 <p className="text-gray-600 mb-4"><strong>International:</strong> {event.internationalDelegates}</p>
//                                 {/* 
//                                 <Link 
//                                     to={`/conference/${event._id}`}
//                                     className="cta-button btn btn-primary px-8 py-3 text-lg font-semibold w-full inline-block text-center"
//                                 >
//                                     Learn More
//                                 </Link> */}
                              

                              
//                                 <Link
//                                     to={`/conference/${event._id}`}
//                                     className="cta-button btn btn-primary px-8 py-3 text-lg font-semibold w-full"
//                                 >
//                                     Learn More
//                                 </Link>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             <style jsx global>{`
//                 @keyframes float {
//                     0%, 100% { transform: translate(0, 0); }
//                     50% { transform: translate(20px, 20px); }
//                 }
//                 .animate-float-15 { animation: float 15s infinite ease-in-out; }
//                 .animate-float-12-reverse { animation: float 12s infinite ease-in-out reverse; }
//                 .fade-in-up {
//                     opacity: 1 !important;
//                     transform: translateY(0) !important;
//                     transition: opacity 0.8s ease, transform 0.8s ease;
//                 }
//                 .delay-1 { transition-delay: 0.2s !important; }
//                 .delay-2 { transition-delay: 0.4s !important; }
//                 .delay-3 { transition-delay: 0.6s !important; }
//             `}</style>
//         </section>
//     );
// };

// export default FlagshipEvent;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';

const FlagshipEvent = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/events`);
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="conference-section max-w-7xl mx-auto px-6 py-20 lg:py-28 relative overflow-hidden">
            <div className="floating-shapes absolute w-full h-full top-0 left-0 z-1 overflow-hidden">
                <div className="shape shape-1 bg-primary absolute rounded-full opacity-10 w-[300px] h-[300px] top-[-100px] left-[-100px] animate-float-15" />
                <div className="shape shape-2 bg-primary absolute rounded-full opacity-10 w-[200px] h-[200px] bottom-[-50px] right-[-50px] animate-float-12-reverse" />
            </div>

            <div className="conference-container flex flex-col items-center text-center relative z-10">
                <h1 className="conference-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    CUMUNA Conference Events
                </h1>

                <p className="conference-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mb-12">
                    Explore our flagship MUN events with committees, delegates, and impactful themes.
                </p>

                <div className="conference-highlights flex flex-wrap justify-center gap-6 mb-12">
                    {events.map((event) => {
                        const dateParts = event.dates?.split('/');
                        const year = dateParts ? dateParts[2] : 'Unknown';

                        return (
                            <div key={event._id} className="highlight-card bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full sm:w-80 hover:-translate-y-[5px] transition-transform">
                                <img src={event.bannerUrl} alt="Event Banner" className="rounded-lg mb-4 w-full h-40 object-cover" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.theme}</h3>
                                <p className="text-gray-600 mb-1"><strong>Dates:</strong> {event.dates}</p>
                                <p className="text-gray-600 mb-1"><strong>Year:</strong> {year}</p>
                                <p className="text-gray-600 mb-1"><strong>Committees:</strong> {event.totalCommittees}</p>
                                <p className="text-gray-600 mb-1"><strong>Delegates:</strong> {event.totalDelegates}</p>
                                <p className="text-gray-600 mb-4"><strong>International:</strong> {event.internationalDelegates}</p>

                                <Link 
                                    to={`/conference/${event._id}`}
                                    className="cta-button btn btn-primary px-8 py-3 text-lg font-semibold w-full block text-center"
                                >
                                    Learn More
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FlagshipEvent;