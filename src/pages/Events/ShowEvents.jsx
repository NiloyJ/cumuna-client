

// import React, { useState, useEffect, useContext } from 'react';
// import { API_URL } from '../../config/config';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import AuthContext from '../../context/AuthContext/AuthContext';
// import { FaTrash } from 'react-icons/fa';

// const ShowEvents = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [autoSlide, setAutoSlide] = useState(true);
//     const { user } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/extraevents`);
//                 const data = await response.json();
//                 setEvents(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//                 setLoading(false);
//             }
//         };
//         fetchEvents();
//     }, []);

//     // Determine how many events to show per slide based on screen size
//     const getEventsPerSlide = () => {
//         if (typeof window === 'undefined') return 1;
//         if (window.innerWidth >= 1024) return 3; // Desktop
//         if (window.innerWidth >= 768) return 2;  // Tablet
//         return 1;                                // Mobile
//     };

//     const [eventsPerSlide, setEventsPerSlide] = useState(getEventsPerSlide());

//     useEffect(() => {
//         const handleResize = () => {
//             setEventsPerSlide(getEventsPerSlide());
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Calculate total slides needed
//     const totalSlides = Math.ceil(events.length / eventsPerSlide);

//     useEffect(() => {
//         if (!autoSlide || events.length === 0) return;

//         const interval = setInterval(() => {
//             setCurrentSlide(prev => (prev + 1) % totalSlides);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [autoSlide, events.length, totalSlides]);

//     // Get events for current slide
//     const getSlideEvents = () => {
//         const startIndex = currentSlide * eventsPerSlide;
//         const endIndex = startIndex + eventsPerSlide;
//         return events.slice(startIndex, endIndex);
//     };

//     const truncateText = (text, wordCount = 20) => {
//         const words = text.split(' ');
//         if (words.length > wordCount) {
//             return {
//                 text: words.slice(0, wordCount).join(' ') + '...',
//                 isTruncated: true,
//             };
//         }
//         return {
//             text: text,
//             isTruncated: false,
//         };
//     };

//     const handleDelete = async (eventId) => {
//         try {
//             const response = await fetch(`${API_URL}/extraevents/${eventId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${user?.token}`,
//                 },
//             });

//             if (response.ok) {
//                 setEvents(events.filter(event => event._id !== eventId));
//             } else {
//                 console.error('Error deleting event');
//             }
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     };

//     const handleStatusUpdate = async (eventId, newStatus) => {
//         try {
//             const response = await fetch(`${API_URL}/extraevents/${eventId}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user?.token}`,
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (response.ok) {
//                 setEvents(events.map(event =>
//                     event._id === eventId ? { ...event, status: newStatus } : event
//                 ));
//             }
//         } catch (error) {
//             console.error('Error updating event status:', error);
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'serious': return 'bg-red-500';
//             case 'running': return 'bg-green-500';
//             case 'upcoming': return 'bg-blue-500';
//             default: return 'bg-gray-500';
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//                 <span className='text-4xl font-bold '>OUR <span className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-600 to-blue-800">EVENTS</span></span>
            
//                 <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-2">
//                     Exciting activities and gatherings for our community
//                 </p>
//                 <div className="border-t border-gray-200 w-24 mx-auto my-4"></div>
//             </div>

//             <div className="relative mb-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
//                     {getSlideEvents().map((event) => {
//                         const { text: displayText, isTruncated } = truncateText(event.description);

//                         return (
//                             <div
//                                 key={event._id}
//                                 className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 w-full"
//                             >
//                                 <div className="h-80 bg-gray-100 relative">
//                                     <img
//                                         src={event.imageUrl}
//                                         alt={event.title}
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => {
//                                             e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
//                                         }}
//                                     />
//                                     <div className={`absolute top-2 left-2 px-3 py-1 rounded-md text-white text-sm font-medium ${getStatusColor(event.status)}`}>
//                                         {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
//                                     </div>
//                                 </div>

//                                 <div className="p-6">
//                                     <div className="text-center">
//                                         <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
//                                         <div className="text-xs text-gray-500 mt-2">
//                                             Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
//                                         </div>
//                                     </div>

//                                     <div className="mt-4 space-y-3 text-left">
//                                         <div
//                                             className="text-gray-700 text-sm max-h-[100px] overflow-hidden"
//                                             dangerouslySetInnerHTML={{
//                                                 __html: displayText.replace(
//                                                     /(https?:\/\/[^\s]+)/g,
//                                                     '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
//                                                 )
//                                             }}
//                                         />
//                                         {isTruncated && (
//                                             <Link 
//                                                 to={`/extraevents/${event._id}`} 
//                                                 className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
//                                             >
//                                                 Read more...
//                                             </Link>
//                                         )}
//                                     </div>

//                                     {user?.isAdmin && (
//                                         <div className="mt-4 flex justify-end space-x-2">
//                                             <select
//                                                 value={event.status || 'upcoming'}
//                                                 onChange={(e) => handleStatusUpdate(event._id, e.target.value)}
//                                                 className="select select-sm select-bordered"
//                                             >
//                                                 <option value="upcoming">Upcoming</option>
//                                                 <option value="running">Running</option>
//                                                 <option value="serious">Serious</option>
//                                             </select>
//                                             <button
//                                                 onClick={() => handleDelete(event._id)}
//                                                 className="btn btn-sm btn-error"
//                                             >
//                                                 <FaTrash className="mr-1" />
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 <div className="flex justify-center mt-6 space-x-2">
//                     {Array.from({ length: totalSlides }).map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => {
//                                 setCurrentSlide(index);
//                                 setAutoSlide(false);
//                                 setTimeout(() => setAutoSlide(true), 6000);
//                             }}
//                             className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
//                         />
//                     ))}
//                 </div>
//             </div>

//             <div className="text-center mt-8">
//                 <Link
//                     to="/extraevents"
//                     className="btn btn-primary px-6 py-3 text-lg"
//                 >
//                     View All Events
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ShowEvents;

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AuthContext from '../../context/AuthContext/AuthContext';
import { FaTrash } from 'react-icons/fa';

const ShowEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/extraevents`);
                const data = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const getEventsPerSlide = () => {
        if (typeof window === 'undefined') return 1;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    const [eventsPerSlide, setEventsPerSlide] = useState(getEventsPerSlide());

    useEffect(() => {
        const handleResize = () => {
            setEventsPerSlide(getEventsPerSlide());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(events.length / eventsPerSlide);

    useEffect(() => {
        if (!autoSlide || events.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoSlide, events.length, totalSlides]);

    const getSlideEvents = () => {
        const startIndex = currentSlide * eventsPerSlide;
        const endIndex = startIndex + eventsPerSlide;
        return events.slice(startIndex, endIndex);
    };

    const truncateText = (text, wordCount = 20) => {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return {
                text: words.slice(0, wordCount).join(' ') + '...',
                isTruncated: true,
            };
        }
        return {
            text: text,
            isTruncated: false,
        };
    };

    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`${API_URL}/extraevents/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                },
            });

            if (response.ok) {
                setEvents(events.filter(event => event._id !== eventId));
            } else {
                console.error('Error deleting event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleStatusUpdate = async (eventId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/extraevents/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setEvents(events.map(event =>
                    event._id === eventId ? { ...event, status: newStatus } : event
                ));
            }
        } catch (error) {
            console.error('Error updating event status:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'serious': return 'bg-red-500';
            case 'running': return 'bg-green-500';
            case 'upcoming': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <span className='text-4xl font-bold'>OUR <span className="text-4xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-800">EVENTS</span></span>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-2">
                    Exciting activities and gatherings for our community
                </p>
                <div className="border-t border-gray-200 w-24 mx-auto my-3"></div>
            </div>

            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {getSlideEvents().map((event) => {
                        const { text: displayText, isTruncated } = truncateText(event.description);

                        return (
                            <div
                                key={event._id}
                                className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 w-full"
                            >
                                <div className="h-72 bg-gray-100 relative">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
                                        }}
                                    />
                                    <div className={`absolute top-2 left-2 px-3 py-1 rounded-md text-white text-sm font-medium ${getStatusColor(event.status)}`}>
                                        {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                                        <div className="text-xs text-gray-500 mt-2">
                                            Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-2 text-left">
                                        <div
                                            className="text-gray-700 text-sm max-h-[100px] overflow-hidden"
                                            dangerouslySetInnerHTML={{
                                                __html: displayText.replace(
                                                    /(https?:\/\/[^\s]+)/g,
                                                    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
                                                )
                                            }}
                                        />
                                        {isTruncated && (
                                            <Link 
                                                to={`/extraevents/${event._id}`} 
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 inline-block"
                                            >
                                                Read more...
                                            </Link>
                                        )}
                                    </div>

                                    {user?.isAdmin && (
                                        <div className="mt-3 flex justify-end space-x-2">
                                            <select
                                                value={event.status || 'upcoming'}
                                                onChange={(e) => handleStatusUpdate(event._id, e.target.value)}
                                                className="select select-sm select-bordered"
                                            >
                                                <option value="upcoming">Upcoming</option>
                                                <option value="running">Running</option>
                                                <option value="serious">Serious</option>
                                            </select>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                <FaTrash className="mr-1" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                                setAutoSlide(false);
                                setTimeout(() => setAutoSlide(true), 6000);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="text-center mt-6">
                <Link
                    to="/extraevents"
                    className="btn btn-primary px-6 py-3 text-lg"
                >
                    View All Events
                </Link>
            </div>
        </div>
    );
};

export default ShowEvents;