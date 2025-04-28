
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Events = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        description: '',
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/extraevents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    author: user.name,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                const newEvent = await response.json();
                setEvents([newEvent, ...events]);
                setFormData({
                    title: '',
                    imageUrl: '',
                    description: '',
                });
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/extraevents/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                setEvents(events.filter(event => event._id !== eventId));
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const truncateText = (text, wordCount) => {
        const words = text.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        }
        return text;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-gray-600 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {user && (
                    <div className="bg-base-200 rounded-lg p-6 mb-8 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Event Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter event title"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="Enter image URL"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Event Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter event details (you can include links)"
                                    className="textarea textarea-bordered w-full h-32"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Create Event
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event._id} className="card bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <figure className="relative aspect-video">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body bg-white text-gray-800">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title text-primary">{event.title}</h2>
                                    {user && (
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="btn btn-sm btn-error btn-outline"
                                            aria-label="Delete event"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    Posted by {event.author} on {format(new Date(event.createdAt), 'MMM dd, yyyy')}
                                </div>
                                <div
                                    className="prose prose-sm max-w-none whitespace-pre-line"
                                    dangerouslySetInnerHTML={{
                                        __html: truncateText(event.description, 20).replace(
                                            /(https?:\/\/[^\s]+)/g,
                                            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
                                        )
                                    }}
                                />
                                {event.description.split(' ').length > 20 && (
                                    <Link to={`/extraevents/${event._id}`} className="link link-primary mt-2">
                                        Read more...
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;

