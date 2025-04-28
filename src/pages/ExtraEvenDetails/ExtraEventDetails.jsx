

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { API_URL } from '../../config/config';

const ExtraEventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${API_URL}/extraevents/${id}`);
                const data = await response.json();
                setEvent(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!event) {
        return <div className="text-center py-8 text-2xl font-semibold">Event not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Large Featured Image */}
            <div className="mb-10">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-xl"
                />
            </div>

            {/* Event Title and Metadata */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{event.title}</h1>
                <div className="flex justify-center items-center space-x-4 text-gray-600">


                    <span>{format(new Date(event.createdAt), 'MMMM dd, yyyy')}</span>
                </div>
            </div>

            {/* Event Content */}
            {/* <div className="prose prose-lg max-w-none mx-auto">
                <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                        __html: event.description.replace(
                            /(https?:\/\/[^\s]+)/g, 
                            '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
                        ) 
                    }} 
                />
            </div> */}

            <div
                className="prose max-w-none mx-auto whitespace-pre-line"
                dangerouslySetInnerHTML={{
                    __html: event.description.replace(
                        /(https?:\/\/[^\s]+)/g,
                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
                    )
                }}
            />


        </div>
    );
};

export default ExtraEventDetails;