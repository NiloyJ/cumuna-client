
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
//             setCurrentSlide(prev => (prev + 1) % 2); // Only 2 slides
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [autoSlide, events.length]);

//     // Categorize events
//     const runningAndUpcomingEvents = events.filter(event => 
//         event.status === 'running' || event.status === 'upcoming'
//     ).slice(0, 2); // Take only first 2

//     const previousEvents = events.filter(event =>
//         event.status !== 'running' && event.status !== 'upcoming'
//     ).slice(0, 2); // Take only first 2

//     // Ensure we always have exactly 2 events per slide
//     const getSlideEvents = (slideIndex) => {
//         if (slideIndex === 0) {
//             // If we don't have 2 upcoming/running events, fill with previous events
//             if (runningAndUpcomingEvents.length >= 2) {
//                 return runningAndUpcomingEvents.slice(0, 2);
//             }
//             const needed = 2 - runningAndUpcomingEvents.length;
//             return [...runningAndUpcomingEvents, ...previousEvents.slice(0, needed)];
//         } else {
//             // If we don't have 2 previous events, fill with upcoming/running
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
//         <div className="bg-white min-h-screen py-12">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
//                     <span className="inline-block">Our </span>
//                     <span className="inline-block bg-primary text-white ml-2">Events</span>
//                 </h2>

//                 <div className="relative mb-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
//                         {getSlideEvents(currentSlide).length > 0 ? (
//                             getSlideEvents(currentSlide).map((event) => {
//                                 const { text: displayText, isTruncated } = truncateText(event.description);

//                                 return (
//                                     <div
//                                         key={event._id}
//                                         className="card shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full"
//                                     >
//                                         <figure className="relative aspect-video">
//                                             <img
//                                                 src={event.imageUrl}
//                                                 alt={event.title}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                             <div className={`absolute top-2 left-2 px-3 py-1 rounded-md text-white text-sm font-medium ${getStatusColor(event.status)}`}>
//                                                 {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
//                                             </div>
//                                         </figure>
//                                         <div className="card-body bg-white text-gray-800">
//                                             <div className="flex justify-between items-start">
//                                                 <h2 className="card-title text-primary">{event.title}</h2>
//                                                 {user?.isAdmin && (
//                                                     <div className="flex space-x-2">
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
//                                                             className="btn btn-error btn-sm flex items-center"
//                                                         >
//                                                             <FaTrash className="mr-2" />
//                                                             Delete
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             <div className="text-sm text-gray-500 mb-2">
//                                                 Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
//                                             </div>
//                                             <div
//                                                 className="prose prose-sm max-w-none whitespace-pre-line"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: displayText.replace(
//                                                         /(https?:\/\/[^\s]+)/g,
//                                                         '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
//                                                     )
//                                                 }}
//                                             />
//                                             {isTruncated && (
//                                                 <Link to={`/extraevents/${event._id}`} className="link link-primary mt-2">
//                                                     Read more...
//                                                 </Link>
//                                             )}
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <div className="col-span-2 text-center text-gray-500">
//                                 No events available
//                             </div>
//                         )}
//                     </div>

//                     {/* Slide indicators */}
//                     <div className="flex justify-center mt-6 space-x-2">
//                         {[0, 1].map((index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => {
//                                     setCurrentSlide(index);
//                                     setAutoSlide(false);
//                                     setTimeout(() => setAutoSlide(true), 6000);
//                                 }}
//                                 className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-gray-800 scale-125' : 'bg-gray-400'}`}
//                                 aria-label={`Go to slide ${index + 1}`}
//                             />
//                         ))}
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

    useEffect(() => {
        if (!autoSlide || events.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 2); // Only 2 slides
        }, 5000);

        return () => clearInterval(interval);
    }, [autoSlide, events.length]);

    // Categorize events
    const runningAndUpcomingEvents = events.filter(event =>
        event.status === 'running' || event.status === 'upcoming'
    ).slice(0, 2); // Take only first 2

    const previousEvents = events.filter(event =>
        event.status !== 'running' && event.status !== 'upcoming'
    ).slice(0, 2); // Take only first 2

    // Ensure we always have exactly 2 events per slide
    const getSlideEvents = (slideIndex) => {
        if (slideIndex === 0) {
            // If we don't have 2 upcoming/running events, fill with previous events
            if (runningAndUpcomingEvents.length >= 2) {
                return runningAndUpcomingEvents.slice(0, 2);
            }
            const needed = 2 - runningAndUpcomingEvents.length;
            return [...runningAndUpcomingEvents, ...previousEvents.slice(0, needed)];
        } else {
            // If we don't have 2 previous events, fill with upcoming/running
            if (previousEvents.length >= 2) {
                return previousEvents.slice(0, 2);
            }
            const needed = 2 - previousEvents.length;
            return [...previousEvents, ...runningAndUpcomingEvents.slice(0, needed)];
        }
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
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    <span className="inline-block">Our </span>
                    <span className="inline-block bg-primary text-white ml-2">Events</span>
                </h2>

                <div className="relative mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
                        {getSlideEvents(currentSlide).length > 0 ? (
                            getSlideEvents(currentSlide).map((event) => {
                                const { text: displayText, isTruncated } = truncateText(event.description);

                                return (
                                    <div
                                        key={event._id}
                                        className="card shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full"
                                    >
                                        <figure className="relative aspect-video">
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className={`absolute top-2 left-2 px-3 py-1 rounded-md text-white text-sm font-medium ${getStatusColor(event.status)}`}>
                                                {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
                                            </div>
                                        </figure>
                                        <div className="card-body bg-white text-gray-800">
                                            <div className="flex justify-between items-start">
                                                <h2 className="card-title text-primary">{event.title}</h2>
                                                {user?.isAdmin && (
                                                    <div className="flex space-x-2">
                                                        <select
                                                            value={event.status || 'upcoming'}
                                                            onChange={(e) => handleStatusUpdate(event._id, e.target.value)}
                                                            className="select select-xs select-bordered"
                                                        >
                                                            <option value="upcoming">Upcoming</option>
                                                            <option value="running">Running</option>
                                                            <option value="serious">Serious</option>
                                                        </select>
                                                        <button
                                                            onClick={() => handleDelete(event._id)}
                                                            className="btn btn-error btn-sm flex items-center"
                                                        >
                                                            <FaTrash className="mr-2" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500 mb-2">
                                                Posted on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
                                            </div>
                                            <div
                                                className="prose prose-sm max-w-none whitespace-pre-line"
                                                dangerouslySetInnerHTML={{
                                                    __html: displayText.replace(
                                                        /(https?:\/\/[^\s]+)/g,
                                                        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
                                                    )
                                                }}
                                            />
                                            {isTruncated && (
                                                <Link to={`/extraevents/${event._id}`} className="link link-primary mt-2">
                                                    Read more...
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-2 text-center text-gray-500">
                                No events available
                            </div>
                        )}
                    </div>

                    {/* Slide indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {[0, 1].map((index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentSlide(index);
                                    setAutoSlide(false);
                                    setTimeout(() => setAutoSlide(true), 6000);
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-gray-800 scale-125' : 'bg-gray-400'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link to={`/extraevents`} className="btn btn-primary">
                            See More Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowEvents;