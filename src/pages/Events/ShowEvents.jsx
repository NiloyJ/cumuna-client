

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AuthContext from '../../context/AuthContext/AuthContext';
import styles from './Events.module.css' // Assuming you have an AuthContext for managing auth

const ShowEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const { user } = useContext(AuthContext); // Get logged-in user info

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
        if (!autoSlide || events.length <= 2) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % Math.ceil(events.length / 2));
        }, 3000);

        return () => clearInterval(interval);
    }, [events.length, autoSlide]);

    const getCurrentEvents = () => {
        const startIndex = currentSlide * 2;
        return events.slice(startIndex, startIndex + 2);
    };

    const truncateText = (text, wordCount = 20) => {
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

    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`${API_URL}/extraevents/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the event from the local state
                setEvents(events.filter(event => event._id !== eventId));
            } else {
                console.error('Error deleting event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
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
                    <span className="inline-block ">Our </span>
                    <span className="inline-block bg-primary text-white ml-2" style={{paddingRight: ''}}>Latest Events</span>
                </h2>


                {/* Slider Container */}
                <div className="relative mb-8">
                    {/* Event Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
                        {getCurrentEvents().map((event) => {
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
                                    </figure>
                                    <div className="card-body bg-white text-gray-800">
                                        <div className="flex justify-between items-start">
                                            <h2 className="card-title text-primary">{event.title}</h2>

                                            {/* Show delete button if user is an admin */}
                                            {user && user.isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(event._id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
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
                        })}
                    </div>

                    {/* Dot Indicators */}
                    {events.length > 2 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: Math.ceil(events.length / 2) }).map((_, index) => (
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
                    )}
                </div>

            </div>
        </div>
    );
};

export default ShowEvents;
