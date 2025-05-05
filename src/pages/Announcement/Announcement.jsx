

// import React, { useContext, useState, useEffect } from 'react';
// import AuthContext from '../../context/AuthContext/AuthContext';
// import { API_URL } from '../../config/config';

// const Announcement = () => {
//     const { user } = useContext(AuthContext);
//     const [announcements, setAnnouncements] = useState([]);
//     const [title, setTitle] = useState('');
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isDeleting, setIsDeleting] = useState(false);
//     const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         const fetchAnnouncements = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/announcements`);
//                 if (!response.ok) throw new Error('Failed to fetch announcements');
//                 const data = await response.json();
//                 setAnnouncements(data);
//             } catch (error) {
//                 console.error('Error fetching announcements:', error);
//             }
//         };
//         fetchAnnouncements();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title.trim() || !message.trim()) {
//             alert('Please fill out both fields.');
//             return;
//         }

//         setIsLoading(true);
//         try {
//             const response = await fetch(`${API_URL}/announcements`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     title,
//                     message,
//                     author: user?.email || 'Admin',
//                     createdAt: new Date().toISOString()
//                 }),
//             });

//             if (!response.ok) throw new Error('Failed to post announcement');
//             const newAnnouncement = await response.json();
//             setAnnouncements([newAnnouncement, ...announcements]);
//             setTitle('');
//             setMessage('');
//         } catch (error) {
//             console.error('Error creating announcement:', error);
//             alert('Failed to create announcement');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this announcement?')) return;

//         setIsDeleting(true);
//         try {
//             const response = await fetch(`${API_URL}/announcements/${id}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) throw new Error('Failed to delete announcement');
//             setAnnouncements(announcements.filter(ann => ann._id !== id));
//         } catch (error) {
//             console.error('Error deleting announcement:', error);
//             alert('Failed to delete announcement');
//         } finally {
//             setIsDeleting(false);
//         }
//     };

//     const truncateText = (text, wordLimit) => {
//         const words = text.split(' ');
//         if (words.length > wordLimit) {
//             return {
//                 text: words.slice(0, wordLimit).join(' ') + '...',
//                 isTruncated: true
//             };
//         }
//         return {
//             text: text,
//             isTruncated: false
//         };
//     };

//     const openModal = (announcement) => {
//         setSelectedAnnouncement(announcement);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setSelectedAnnouncement(null);
//     };

//     return (
//         <div className="container mx-auto px-4 py-10">
//             <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">📢 Announcements</h2>

//             {/* Create New Announcement Form */}
//             {user && (
//                 <div className="bg-white shadow-2xl rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
//                     <h3 className="text-2xl font-semibold mb-6 text-gray-700">Create a New Announcement</h3>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter title"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
//                             <textarea
//                                 placeholder="Enter message"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 required
//                             ></textarea>
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? 'Posting...' : 'Post'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* Announcement Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {announcements.map((announcement) => {
//                     const { text: displayText, isTruncated } = truncateText(announcement.message, 100);

//                     return (
//                         <div key={announcement._id} className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-full border border-gray-200">
//                             {/* Title with primary background */}
//                             <div className="bg-blue-700 px-6 py-4">
//                                 <h3 className="text-xl font-bold text-white text-center">{announcement.title}</h3>
//                             </div>
                            
//                             {/* Message content with white background */}
//                             <div className="flex-grow p-6">
//                                 <p className="text-gray-800 mb-4">
//                                     {displayText}
//                                 </p>
//                             </div>
                            
//                             {/* Footer with actions */}
//                             <div className="flex justify-between items-center text-sm bg-gray-50 px-6 py-4 border-t border-gray-200">
//                                 <span className="text-gray-500">{new Date(announcement.createdAt).toLocaleString()}</span>
//                                 <div className="flex items-center space-x-2">
//                                     <button
//                                         onClick={() => handleDelete(announcement._id)}
//                                         className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md transition ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                         disabled={isDeleting}
//                                     >
//                                         Delete
//                                     </button>
//                                     {isTruncated && (
//                                         <button
//                                             onClick={() => openModal(announcement)}
//                                             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md transition"
//                                         >
//                                             Read More
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* No announcements */}
//             {announcements.length === 0 && (
//                 <div className="text-center mt-20 text-gray-500">
//                     <p className="text-lg">No announcements yet. Stay tuned! 🚀</p>
//                 </div>
//             )}

//             {/* Read More Modal */}
//             {showModal && selectedAnnouncement && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="flex justify-between items-start mb-4">
//                             <h3 className="text-2xl font-bold text-gray-800">{selectedAnnouncement.title}</h3>
//                             <button
//                                 onClick={closeModal}
//                                 className="text-gray-500 hover:text-gray-700 text-2xl"
//                             >
//                                 &times;
//                             </button>
//                         </div>
//                         <div className="text-gray-700 whitespace-pre-line mb-6">
//                             {selectedAnnouncement.message}
//                         </div>
//                         <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
//                             <span>Posted on: {new Date(selectedAnnouncement.createdAt).toLocaleString()}</span>
//                             <button
//                                 onClick={closeModal}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Announcement;

import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';
import { FiTrash2, FiX, FiPlus, FiChevronRight } from 'react-icons/fi';

const NoticeBoard = () => {
    const { user } = useContext(AuthContext);
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch(`${API_URL}/announcements`);
                if (!response.ok) throw new Error('Failed to fetch notices');
                const data = await response.json();
                setNotices(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };
        fetchNotices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/announcements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    message: content,
                    author: user?.email || 'Administrator',
                    createdAt: new Date().toISOString()
                }),
            });

            if (!response.ok) throw new Error('Failed to post notice');
            const newNotice = await response.json();
            setNotices([newNotice, ...notices]);
            setTitle('');
            setContent('');
            setShowForm(false);
        } catch (error) {
            console.error('Error creating notice:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this notice permanently?')) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`${API_URL}/announcements/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete notice');
            setNotices(notices.filter(notice => notice._id !== id));
        } catch (error) {
            console.error('Error deleting notice:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const truncateContent = (text) => {
        const words = text.split(' ');
        if (words.length > 60) {
            return {
                text: words.slice(0, 60).join(' '),
                isTruncated: true
            };
        }
        return {
            text: text,
            isTruncated: false
        };
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-medium text-gray-900">OFFICIAL NOTICE BOARD</h1>
                    <div className="mt-2 h-0.5 w-24 bg-gray-300 mx-auto"></div>
                </div>

                {user && (
                    <div className="mb-10 flex justify-center">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded"
                        >
                            <FiPlus size={18} /> {showForm ? 'Cancel' : 'New Notice'}
                        </button>
                    </div>
                )}

                {showForm && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-12 p-6 max-w-3xl mx-auto">
                        <h2 className="text-xl font-medium mb-4 text-gray-800">CREATE NEW NOTICE</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Notice Title"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Notice Content"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Posting...' : 'Post Notice'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="flex flex-wrap gap-6 justify-center">
                    {notices.length > 0 ? (
                        notices.map((notice) => {
                            const { text, isTruncated } = truncateContent(notice.message);
                            return (
                                <div key={notice._id} className="flex-1 min-w-[300px] max-w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-5">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{notice.title}</h3>
                                            {user && (
                                                <button
                                                    onClick={() => handleDelete(notice._id)}
                                                    className="text-gray-400 hover:text-red-600 transition"
                                                    disabled={isDeleting}
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            {text}
                                            {isTruncated && (
                                                <button 
                                                    onClick={() => {
                                                        setSelectedNotice(notice);
                                                        setShowModal(true);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                                                >
                                                    Read more
                                                </button>
                                            )}
                                        </p>
                                        <div className="text-xs text-gray-500 mt-4">
                                            <div>Posted by: {notice.author}</div>
                                            <div>{formatDate(notice.createdAt)}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 text-gray-500 w-full">
                            <p className="text-lg">No notices currently posted</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Notice Detail Modal */}
            {showModal && selectedNotice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">{selectedNotice.title}</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="prose prose-sm text-gray-700 mb-6 whitespace-pre-line">
                                {selectedNotice.message}
                            </div>
                            <div className="text-sm text-gray-500 border-t pt-4">
                                <div>Posted by: {selectedNotice.author}</div>
                                <div>Date: {formatDate(selectedNotice.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticeBoard;