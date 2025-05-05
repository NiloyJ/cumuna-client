
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

//     useEffect(() => {
//         if (!autoSlide || events.length === 0) return;

//         const interval = setInterval(() => {
//             setCurrentSlide(prev => (prev + 1) % 2);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [autoSlide, events.length]);

//     const runningAndUpcomingEvents = events.filter(event =>
//         event.status === 'running' || event.status === 'upcoming'
//     ).slice(0, 2);

//     const previousEvents = events.filter(event =>
//         event.status !== 'running' && event.status !== 'upcoming'
//     ).slice(0, 2);

//     const getSlideEvents = (slideIndex) => {
//         if (slideIndex === 0) {
//             if (runningAndUpcomingEvents.length >= 2) {
//                 return runningAndUpcomingEvents.slice(0, 2);
//             }
//             const needed = 2 - runningAndUpcomingEvents.length;
//             return [...runningAndUpcomingEvents, ...previousEvents.slice(0, needed)];
//         } else {
//             if (previousEvents.length >= 2) {
//                 return previousEvents.slice(0, 2);
//             }
//             const needed = 2 - previousEvents.length;
//             return [...previousEvents, ...runningAndUpcomingEvents.slice(0, needed)];
//         }
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
//         <div className="bg-white py-8">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
//                     <span className="inline-block">Our </span>
//                     <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white ml-2">Events</span>
//                 </h2>

//                 <div className="relative mb-4">
//                     <div className="flex justify-center gap-6 flex-wrap">
//                         {getSlideEvents(currentSlide).length > 0 ? (
//                             getSlideEvents(currentSlide).map((event) => {
//                                 const { text: displayText, isTruncated } = truncateText(event.description);

//                                 return (
//                                     <div
//                                         key={event._id}
//                                         className="card w-[380px] h-[430px] shadow-lg hover:shadow-xl transition duration-300"
//                                     >
//                                         <figure className="relative w-full h-[180px]">
//                                             <img
//                                                 src={event.imageUrl}
//                                                 alt={event.title}
//                                                 className="w-full h-full object-cover rounded-t-lg"
//                                             />
//                                             <div className={`absolute top-2 left-2 px-3 py-1 rounded-md text-white text-sm font-medium ${getStatusColor(event.status)}`}>
//                                                 {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
//                                             </div>
//                                         </figure>
//                                         <div className="card-body p-4 bg-white text-gray-800">
//                                             <div className="flex justify-between items-start mb-2">
//                                                 <h2 className="card-title text-sm font-semibold text-secondary">{event.title}</h2>
//                                                 {user?.isAdmin && (
//                                                     <div className="flex flex-col space-y-1">
//                                                         <select
//                                                             value={event.status || 'upcoming'}
//                                                             onChange={(e) => handleStatusUpdate(event._id, e.target.value)}
//                                                             className="select select-xs select-bordered"
//                                                         >
//                                                             <option value="upcoming">Upcoming</option>
//                                                             <option value="running">Running</option>
//                                                             <option value="serious">Serious</option>
//                                                         </select>
//                                                         <button
//                                                             onClick={() => handleDelete(event._id)}
//                                                             className="btn btn-xs btn-error"
//                                                         >
//                                                             <FaTrash className="mr-1" />
//                                                             Delete
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             <div className="text-xs text-gray-500 mb-1">
//                                                 Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
//                                             </div>
//                                             <div
//                                                 className="text-sm max-h-[80px] overflow-hidden"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: displayText.replace(
//                                                         /(https?:\/\/[^\s]+)/g,
//                                                         '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
//                                                     )
//                                                 }}
//                                             />
//                                             {isTruncated && (
//                                                 <Link to={`/extraevents/${event._id}`} className="link link-primary text-xs mt-1 block">
//                                                     Read more...
//                                                 </Link>
//                                             )}
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <div className="text-center text-gray-500 w-full">
//                                 No events available
//                             </div>
//                         )}
//                     </div>

//                     <div className="flex justify-center mt-6 space-x-2">
//                         {[0, 1].map((index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => {
//                                     setCurrentSlide(index);
//                                     setAutoSlide(false);
//                                     setTimeout(() => setAutoSlide(true), 6000);
//                                 }}
//                                 className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-primary scale-125' : 'bg-gray-400'}`}
//                             />
//                         ))}
//                     </div>
//                     <div className="text-center mt-8">
//                         {/* <Link to={`/extraevents`} className="btn btn-primary">
//                             See More Events
//                         </Link> */}
//                         <Link
//                             to="/extraevents"
//                             className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
//                         >
//                             See More Events
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShowEvents;

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

//     // Determine how many events to show per slide
//     const getEventsPerSlide = () => events.length >= 6 ? 3 : 2;
//     const eventsPerSlide = getEventsPerSlide();

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
//         <div className="bg-gray-800 py-8">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
//                     <span className="inline-block text-white">Our </span>
//                     <span className="inline-block bg-primary text-white ml-2">Events</span>
//                 </h2>

//                 <div className="relative mb-4 overflow-hidden">
//                     <div className="flex transition-transform duration-500 ease-in-out"
//                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                         {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//                             <div key={slideIndex} className="w-full flex-shrink-0">
//                                 <div className="flex justify-center gap-6 px-4">
//                                     {getSlideEvents().map((event) => {
//                                         const { text: displayText, isTruncated } = truncateText(event.description);

//                                         return (
//                                             <div
//                                                 key={event._id}
//                                                 className="card w-[400px] bg-white shadow-lg hover:shadow-xl transition duration-300"
//                                             >
//                                                 <figure className="relative w-full">
//                                                     <img
//                                                         src={event.imageUrl}
//                                                         alt={event.title}
//                                                         className="w-full h-auto max-h-[220px] object-contain rounded-t-lg"
//                                                     />
//                                                     <div className={`absolute top-2 left-2 px-3 py-1 rounded-md text-white text-sm font-medium ${getStatusColor(event.status)}`}>
//                                                         {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
//                                                     </div>
//                                                 </figure>
//                                                 <div className="card-body p-4 text-gray-800">
//                                                     <div className="flex justify-between items-start mb-2">
//                                                         <h2 className="card-title text-sm font-semibold text-secondary">{event.title}</h2>
//                                                         {user?.isAdmin && (
//                                                             <div className="flex flex-col space-y-1">
//                                                                 <select
//                                                                     value={event.status || 'upcoming'}
//                                                                     onChange={(e) => handleStatusUpdate(event._id, e.target.value)}
//                                                                     className="select select-xs select-bordered"
//                                                                 >
//                                                                     <option value="upcoming">Upcoming</option>
//                                                                     <option value="running">Running</option>
//                                                                     <option value="serious">Serious</option>
//                                                                 </select>
//                                                                 <button
//                                                                     onClick={() => handleDelete(event._id)}
//                                                                     className="btn btn-xs btn-error"
//                                                                 >
//                                                                     <FaTrash className="mr-1" />
//                                                                     Delete
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="text-xs text-gray-500 mb-1">
//                                                         Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
//                                                     </div>
//                                                     <div
//                                                         className="text-sm max-h-[80px] overflow-hidden"
//                                                         dangerouslySetInnerHTML={{
//                                                             __html: displayText.replace(
//                                                                 /(https?:\/\/[^\s]+)/g,
//                                                                 '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
//                                                             )
//                                                         }}
//                                                     />
//                                                     {isTruncated && (
//                                                         <Link to={`/extraevents/${event._id}`} className="link link-primary text-xs mt-1 block">
//                                                             Read more...
//                                                         </Link>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="flex justify-center mt-6 space-x-2">
//                         {Array.from({ length: totalSlides }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => {
//                                     setCurrentSlide(index);
//                                     setAutoSlide(false);
//                                     setTimeout(() => setAutoSlide(true), 6000);
//                                 }}
//                                 className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-primary scale-125' : 'bg-gray-400'}`}
//                             />
//                         ))}
//                     </div>
//                     <div className="text-center mt-8">
//                         <Link
//                             to="/extraevents"
//                             className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
//                         >
//                             See More Events
//                         </Link>
//                     </div>
//                 </div>
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

    // Determine how many events to show per slide
    const getEventsPerSlide = () => events.length >= 6 ? 3 : 2;
    const eventsPerSlide = getEventsPerSlide();

    // Calculate total slides needed
    const totalSlides = Math.ceil(events.length / eventsPerSlide);

    useEffect(() => {
        if (!autoSlide || events.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoSlide, events.length, totalSlides]);

    // Get events for current slide
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
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <span className='text-4xl font-bold '>OUR <span className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-600 to-blue-800">EVENTS</span></span>
            
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-2">
                    Exciting activities and gatherings for our community
                </p>
                <div className="border-t border-gray-200 w-24 mx-auto my-4"></div>
            </div>

            <div className="relative mb-4">
                <div className="flex transition-transform duration-500 ease-in-out"
                     style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                            <div className="flex justify-center gap-8 px-4">
                                {getSlideEvents().map((event) => {
                                    const { text: displayText, isTruncated } = truncateText(event.description);

                                    return (
                                        <div
                                            key={event._id}
                                            className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 w-full max-w-md"
                                        >
                                            <div className="h-80 bg-gray-100 relative">
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

                                            <div className="p-6">
                                                <div className="text-center">
                                                    <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                                                    <div className="text-xs text-gray-500 mt-2">
                                                        Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
                                                    </div>
                                                </div>

                                                <div className="mt-4 space-y-3 text-left">
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
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
                                                        >
                                                            Read more...
                                                        </Link>
                                                    )}
                                                </div>

                                                {user?.isAdmin && (
                                                    <div className="mt-4 flex justify-end space-x-2">
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
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-6 space-x-2">
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

            <div className="text-center mt-8">
                <Link
                    to="/extraevents"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    View All Events
                </Link>
            </div>
        </div>
    );
};

export default ShowEvents;