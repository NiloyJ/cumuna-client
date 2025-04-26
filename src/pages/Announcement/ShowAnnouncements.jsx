

import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';

const ShowAnnouncements = () => {
    const { user } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`${API_URL}/announcements`);
                if (!response.ok) throw new Error('Failed to fetch announcements');
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !message.trim()) {
            alert('Please fill out both fields.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/announcements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    message,
                    author: user?.email || 'Admin',
                    createdAt: new Date().toISOString()
                }),
            });

            if (!response.ok) throw new Error('Failed to post announcement');
            const newAnnouncement = await response.json();
            setAnnouncements([newAnnouncement, ...announcements]);
            setTitle('');
            setMessage('');
        } catch (error) {
            console.error('Error creating announcement:', error);
            alert('Failed to create announcement');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`${API_URL}/announcements/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete announcement');
            setAnnouncements(announcements.filter(ann => ann._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
            alert('Failed to delete announcement');
        } finally {
            setIsDeleting(false);
        }
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return {
                text: words.slice(0, wordLimit).join(' ') + '...',
                isTruncated: true
            };
        }
        return {
            text: text,
            isTruncated: false
        };
    };

    const openModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAnnouncement(null);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">📢 Announcements</h2>

            {/* Announcement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.map((announcement) => {
                    const { text: displayText, isTruncated } = truncateText(announcement.message, 100);

                    return (
                        <div key={announcement._id} className="bg-blue-700 text-white shadow-xl rounded-2xl p-6 flex flex-col h-full">
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold mb-2 text-center">{announcement.title}</h3>
                                <p className="text-white mb-4">
                                    {displayText}
                                </p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-blue-100 mt-4">
                                <span>{new Date(announcement.createdAt).toLocaleString()}</span>
                                <div className="flex space-x-2">
                                    {isTruncated && (
                                        <button
                                            onClick={() => openModal(announcement)}
                                            className="bg-white text-blue-700 font-semibold px-3 py-1 rounded-md hover:bg-blue-100 transition"
                                        >
                                            Read More
                                        </button>
                                    )}
                                    {user && (
                                        <button
                                            onClick={() => handleDelete(announcement._id)}
                                            className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md transition ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isDeleting}
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

            {/* No announcements */}
            {announcements.length === 0 && (
                <div className="text-center mt-20 text-gray-500">
                    <p className="text-lg">No announcements yet. Stay tuned! 🚀</p>
                </div>
            )}

            {/* Read More Modal */}
            {showModal && selectedAnnouncement && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-white">{selectedAnnouncement.title}</h3>
                            <button
                                onClick={closeModal}
                                className="text-white hover:text-gray-300 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="text-white whitespace-pre-line mb-6">
                            {selectedAnnouncement.message}
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>Posted on: {new Date(selectedAnnouncement.createdAt).toLocaleString()}</span>
                            <button
                                onClick={closeModal}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
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
