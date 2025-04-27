
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';

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
                setAnnouncements(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    // Auto-slide with faster transition
    useEffect(() => {
        if (!autoSlide || announcements.length <= 2) return;
        
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % Math.ceil(announcements.length / 2));
        }, 3000);

        return () => clearInterval(interval);
    }, [announcements.length, autoSlide]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            const response = await fetch(`${API_URL}/announcements/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete announcement');
            setAnnouncements(announcements.filter(ann => ann._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
            alert('Failed to delete announcement');
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

    const truncateText = (text, wordCount = 120) => {
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

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">📢 Announcements</h2>

            {/* Slider Container */}
            <div className="relative mb-8">
                {/* Announcement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[300px]">
                    {getCurrentAnnouncements().map((announcement) => {
                        const { text: displayText, isTruncated } = truncateText(announcement.message);
                        
                        return (
                            <div 
                                key={announcement._id} 
                                className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-full border border-gray-200 transition-opacity duration-500"
                            >
                                {/* Title with primary background */}
                                <div className="bg-blue-700 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white text-center">{announcement.title}</h3>
                                </div>
                                
                                {/* Message content with white background */}
                                <div className="flex-grow p-6">
                                    <p className="text-gray-800 mb-4">
                                        {displayText}
                                    </p>
                                </div>
                                
                                {/* Footer with actions */}
                                <div className="flex justify-between items-center text-sm bg-gray-50 px-6 py-4 border-t border-gray-200">
                                    <span className="text-gray-500">{new Date(announcement.createdAt).toLocaleString()}</span>
                                    <div className="flex items-center space-x-2">
                                        {isTruncated && (
                                            <button
                                                onClick={() => openModal(announcement)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md transition"
                                            >
                                                Read More
                                            </button>
                                        )}
                                        {user && (
                                            <button
                                                onClick={() => handleDelete(announcement._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md transition"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Dot Indicators */}
                {announcements.length > 2 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: Math.ceil(announcements.length / 2) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentSlide(index);
                                    setAutoSlide(false);
                                    setTimeout(() => setAutoSlide(true), 6000);
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-blue-700 scale-125' : 'bg-gray-300'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Read More Modal */}
            {showModal && selectedAnnouncement && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{selectedAnnouncement.title}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="text-gray-700 whitespace-pre-line mb-6">
                            {selectedAnnouncement.message}
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                            <span>Posted on: {new Date(selectedAnnouncement.createdAt).toLocaleString()}</span>
                            <button
                                onClick={closeModal}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowAnnouncements;