

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const Advisors = () => {
    const { auth } = useContext(AuthContext);
    const [advisors, setAdvisors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdvisors = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/committee`);
                const data = await response.json();

                if (response.ok) {
                    const advisorData = data.filter(member =>
                        member.designation?.toLowerCase() === 'advisor' ||
                        member.designation?.toLowerCase() === 'co-advisor'
                    );
                    setAdvisors(advisorData);
                } else {
                    throw new Error(data.message || 'Failed to fetch advisors');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvisors();
    }, []);

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Our Advisory Team
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Experienced professionals guiding our vision forward
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

            {/* Advisors Grid */}
            {!loading && !error && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advisors.length === 0 ? (
                        <div className="text-center py-16 col-span-full">
                            <div className="max-w-md mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium mt-4 text-gray-900">No Advisors Found</h3>
                                <p className="mt-1 text-gray-500">We couldn't find any advisors in our records.</p>
                            </div>
                        </div>
                    ) : (
                        advisors.map((advisor) => (
                            <div
                                key={advisor._id}
                                className="flex items-center border border-gray-200 shadow-md p-6 rounded-lg bg-white h-[350px] hover:shadow-lg transition-all duration-300"
                            >
             

                                <div className="w-36 h-36 rounded-full overflow-hidden border border-primary shadow-md flex-shrink-0">
                                    <img
                                        src={advisor.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}
                                        alt={advisor.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
                                        }}
                                    />
                                </div>

                                {/* Right side: Information */}
                                <div className="ml-6 flex-1 overflow-hidden">
                                    <h2 className="text-2xl font-bold text-gray-900 truncate">{advisor.name}</h2>
                                    <div className="text-gray-600 font-medium truncate bg-primary text-white w-20 rounded-full mt-2 px-2 py-1 text-center">
                                        {advisor.designation?.replace(/_/g, ' ')}
                                    </div>

                                    <div className="mt-2 space-y-1 text-gray-700 text-sm">
                                        {advisor.department && (
                                            <div><strong>Department:</strong> {advisor.department}</div>
                                        )}
                                        {advisor.email && (
                                            <div><strong>Email:</strong> <span className="break-words">{advisor.email}</span></div>
                                        )}
                                        {advisor.phone && (
                                            <div><strong>Phone:</strong> {advisor.phone}</div>
                                        )}
                                    </div>

                                    {/* Message */}
                                    {advisor.message && (
                                        <div className="mt-4 overflow-hidden text-ellipsis">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Message
                                            </h4>
                                            <p className="text-gray-700 text-sm line-clamp-3">{advisor.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Advisors;
