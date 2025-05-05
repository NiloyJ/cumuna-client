
// import React, { useContext, useState, useEffect } from 'react';
// import AuthContext from '../../context/AuthContext/AuthContext';
// import { API_URL } from '../../config/config';
// import { FiTrash2, FiX, FiChevronRight } from 'react-icons/fi';

// const ShowAnnouncements = () => {
//     const { user } = useContext(AuthContext);
//     const [announcements, setAnnouncements] = useState([]);
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [autoSlide, setAutoSlide] = useState(true);
//     const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         const fetchAnnouncements = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/announcements`);
//                 if (!response.ok) throw new Error('Failed to fetch announcements');
//                 const data = await response.json();
//                 setAnnouncements(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//             } catch (error) {
//                 console.error('Error fetching announcements:', error);
//             }
//         };
//         fetchAnnouncements();
//     }, []);

//     useEffect(() => {
//         if (!autoSlide || announcements.length <= 2) return;
        
//         const interval = setInterval(() => {
//             setCurrentSlide(prev => (prev + 1) % Math.ceil(announcements.length / 2));
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [announcements.length, autoSlide]);

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this announcement?')) return;
//         try {
//             const response = await fetch(`${API_URL}/announcements/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete announcement');
//             setAnnouncements(announcements.filter(ann => ann._id !== id));
//         } catch (error) {
//             console.error('Error deleting announcement:', error);
//         }
//     };

//     const openModal = (announcement) => {
//         setSelectedAnnouncement(announcement);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setSelectedAnnouncement(null);
//     };

//     const getCurrentAnnouncements = () => {
//         const startIndex = currentSlide * 2;
//         return announcements.slice(startIndex, startIndex + 2);
//     };

//     const truncateText = (text, wordCount = 60) => {
//         const words = text.split(' ');
//         if (words.length > wordCount) {
//             return {
//                 text: words.slice(0, wordCount).join(' ') + '...',
//                 isTruncated: true
//             };
//         }
//         return {
//             text: text,
//             isTruncated: false
//         };
//     };

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-12">
//                     <h1 className="text-3xl font-medium text-gray-900">OFFICIAL NOTICE BOARD</h1>
//                     <div className="mt-2 h-0.5 w-24 bg-gray-300 mx-auto"></div>
//                 </div>

//                 <div className="relative mb-8">
//                     <div className="flex flex-wrap gap-6 justify-center">
//                         {getCurrentAnnouncements().map((announcement) => {
//                             const { text: displayText, isTruncated } = truncateText(announcement.message);
                            
//                             return (
//                                 <div 
//                                     key={announcement._id} 
//                                     className="flex-1 min-w-[300px] max-w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//                                 >
//                                     {/* Title with sky blue background */}
//                                     <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-6 py-4">
//                                         <h3 className="text-xl font-semibold text-white text-center">{announcement.title}</h3>
//                                     </div>
                                    
//                                     <div className="p-5">
//                                         <p className="text-gray-600 mb-4">
//                                             {displayText}
//                                             {isTruncated && (
//                                                 <button 
//                                                     onClick={() => openModal(announcement)}
//                                                     className="text-blue-600 hover:text-blue-800 ml-1 font-medium flex items-center"
//                                                 >
//                                                     Read more <FiChevronRight className="ml-1" />
//                                                 </button>
//                                             )}
//                                         </p>
//                                         <div className="text-xs text-gray-500 mt-4">
//                                             <div>Posted on: {formatDate(announcement.createdAt)}</div>
//                                             <div>Author: {announcement.author}</div>
//                                         </div>
//                                     </div>
                                    
//                                     {user && (
//                                         <div className="border-t border-gray-200 px-5 py-3 flex justify-end">
//                                             <button
//                                                 onClick={() => handleDelete(announcement._id)}
//                                                 className="text-red-500 hover:text-red-700 transition flex items-center"
//                                             >
//                                                 <FiTrash2 className="mr-1" /> Delete
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Dot Indicators */}
//                     {announcements.length > 2 && (
//                         <div className="flex justify-center mt-6 space-x-2">
//                             {Array.from({ length: Math.ceil(announcements.length / 2) }).map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => {
//                                         setCurrentSlide(index);
//                                         setAutoSlide(false);
//                                         setTimeout(() => setAutoSlide(true), 6000);
//                                     }}
//                                     className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
//                                     aria-label={`Go to slide ${index + 1}`}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Read More Modal */}
//                 {showModal && selectedAnnouncement && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                         <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                             <div className="p-6">
//                                 <div className="flex justify-between items-start mb-4">
//                                     <h3 className="text-xl font-semibold text-gray-800">{selectedAnnouncement.title}</h3>
//                                     <button
//                                         onClick={closeModal}
//                                         className="text-gray-500 hover:text-gray-700"
//                                     >
//                                         <FiX size={24} />
//                                     </button>
//                                 </div>
//                                 <div className="prose prose-sm text-gray-700 mb-6 whitespace-pre-line">
//                                     {selectedAnnouncement.message}
//                                 </div>
//                                 <div className="text-sm text-gray-500 border-t pt-4">
//                                     <div>Posted by: {selectedAnnouncement.author}</div>
//                                     <div>Date: {formatDate(selectedAnnouncement.createdAt)}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ShowAnnouncements;

import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';
import { FiTrash2, FiX, FiChevronRight } from 'react-icons/fi';

const ShowAnnouncements = () => {
    const { user } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`${API_URL}/announcements`);
                if (!response.ok) throw new Error('Failed to fetch announcements');
                const data = await response.json();
                const latestFour = data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4);
                setAnnouncements(latestFour);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (!autoSlide || announcements.length <= 2) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 2); // Only two slides
        }, 4000);

        return () => clearInterval(interval);
    }, [announcements.length, autoSlide]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            const response = await fetch(`${API_URL}/announcements/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete announcement');
            setAnnouncements(prev => prev.filter(ann => ann._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const openModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAnnouncement(null);
    };

    const getCurrentAnnouncements = () => {
        const startIndex = currentSlide * 2;
        return announcements.slice(startIndex, startIndex + 2);
    };

    const truncateText = (text, wordCount = 60) => {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return {
                text: words.slice(0, wordCount).join(' ') + '...',
                isTruncated: true
            };
        }
        return {
            text: text,
            isTruncated: false
        };
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-medium text-gray-900">OFFICIAL NOTICE BOARD</h1>
                    <div className="mt-2 h-0.5 w-24 bg-gray-300 mx-auto"></div>
                </div>

                <div className="relative mb-8">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {getCurrentAnnouncements().map((announcement) => {
                            const { text: displayText, isTruncated } = truncateText(announcement.message);
                            return (
                                <div 
                                    key={announcement._id} 
                                    className="flex-1 min-w-[300px] max-w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                >
                                    <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-6 py-4">
                                        <h3 className="text-xl font-semibold text-white text-center">{announcement.title}</h3>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-gray-600 mb-4">
                                            {displayText}
                                            {isTruncated && (
                                                <button 
                                                    onClick={() => openModal(announcement)}
                                                    className="text-blue-600 hover:text-blue-800 ml-1 font-medium flex items-center"
                                                >
                                                    Read more <FiChevronRight className="ml-1" />
                                                </button>
                                            )}
                                        </p>
                                        <div className="text-xs text-gray-500 mt-4">
                                            <div>Posted on: {formatDate(announcement.createdAt)}</div>
                                            <div>Author: {announcement.author}</div>
                                        </div>
                                    </div>

                                    {user && (
                                        <div className="border-t border-gray-200 px-5 py-3 flex justify-end">
                                            <button
                                                onClick={() => handleDelete(announcement._id)}
                                                className="text-red-500 hover:text-red-700 transition flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Dot Indicators */}
                    {announcements.length > 2 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {[0, 1].map(index => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentSlide(index);
                                        setAutoSlide(false);
                                        setTimeout(() => setAutoSlide(true), 6000);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Read More Modal */}
                {showModal && selectedAnnouncement && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{selectedAnnouncement.title}</h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <FiX size={24} />
                                    </button>
                                </div>
                                <div className="prose prose-sm text-gray-700 mb-6 whitespace-pre-line">
                                    {selectedAnnouncement.message}
                                </div>
                                <div className="text-sm text-gray-500 border-t pt-4">
                                    <div>Posted by: {selectedAnnouncement.author}</div>
                                    <div>Date: {formatDate(selectedAnnouncement.createdAt)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowAnnouncements;
