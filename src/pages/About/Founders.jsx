

import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const Founders = () => {
    const [founders, setFounders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFounders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/committee`);
                const data = await response.json();

                if (response.ok) {
                    const foundersData = data.filter(member =>
                        member.designation?.toLowerCase() === 'founder' ||
                        member.designation?.toLowerCase() === 'founders'
                    );
                    setFounders(foundersData);
                } else {
                    throw new Error(data.message || 'Failed to fetch founders');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFounders();
    }, []);

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-center">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Visionaries</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    The brilliant minds who laid the foundation of our success story
                </p>
                <div className="border-t border-gray-200 w-24 mx-auto my-4"></div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="alert alert-error max-w-2xl mx-auto my-8 shadow-lg text-center justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error: {error}</span>
                    </div>
                </div>
            )}

            {/* Founders Grid */}
            {!loading && !error && (
                <div className="max-w-7xl mx-auto">
                    {founders.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium mt-4 text-gray-900">No Founders Found</h3>
                                <p className="mt-1 text-gray-500">We couldn't find any founders in our records.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center text-center">
                            {founders.map((founder) => (
                                <div
                                    key={founder._id}
                                    className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden hover:shadow-md transition-all duration-300"
                                >
                                    <div className="h-80 bg-gray-100 relative">
                                        <img
                                            src={founder.profileUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}
                                            alt={founder.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
                                            }}
                                        />
                                    </div>

                                    <div className="p-6 text-center">
                                        <h2 className="text-3xl font-bold text-gray-900">{founder.name}</h2>
                                        <div className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 rounded-none mt-2 bg-primary text-white">
                                            Founder
                                        </div>

                                        {/* Founder's Details */}
                                        <div className="mt-4 space-y-3">
                                            {founder.awards && founder.awards.length > 0 && (
                                                <div>
                                                    <div className="text-xl font-semibold mb-2">Notable Achievements</div>
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        {founder.awards.slice(0, 3).map((award, i) => (
                                                            <div key={i} className="badge badge-outline">
                                                                ✅ {award}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Social Media Links */}
                                            {founder.socialMedia && (
                                                <div className="flex justify-center space-x-4 mt-4">
                                                    {founder.socialMedia.facebook && (
                                                        <a 
                                                            href={founder.socialMedia.facebook} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {founder.socialMedia.instagram && (
                                                        <a 
                                                            href={founder.socialMedia.instagram} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-pink-600 hover:text-pink-800"
                                                        >
                                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {founder.socialMedia.linkedin && (
                                                        <a 
                                                            href={founder.socialMedia.linkedin} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-700"
                                                        >
                                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Founders;


