

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
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Our Visionaries
                </h1>
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
                <div className="alert alert-error max-w-2xl mx-auto my-8 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error: {error}</span>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {founders.map((founder) => (
                                <div
                                    key={founder._id}
                                    className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden hover:shadow-md transition-all duration-300"
                                >
                                    {/* Rectangular Profile Picture */}
                                    <div className="h-80 bg-gray-100 relative">
                                        <img
                                            src={founder.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}
                                            alt={founder.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
                                            }}
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900">{founder.name}</h2>
                                        <div className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-none mt-2">
                                            Founder
                                        </div>

                                        {/* Founder's Details */}
                                        <div className="mt-4 space-y-3">
                                            {founder.awards && founder.awards.length > 0 && (
                                                <div>
                                                    <div className="text-sm font-semibold mb-2">Notable Achievements</div>
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        {founder.awards.slice(0, 3).map((award, i) => (
                                                            <div key={i} className="badge badge-outline">
                                                                ✅ {award}
                                                            </div>
                                                        ))}
                                                    </div>
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
