

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const Trustees = () => {
    const { auth } = useContext(AuthContext);
    const [trustees, setTrustees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrustees = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/committee`);
                const data = await response.json();
                
                if (response.ok) {
                    const trusteeData = data.filter(member => 
                        member.designation?.toLowerCase().includes('trustee')
                    );
                    setTrustees(trusteeData);
                } else {
                    throw new Error(data.message || 'Failed to fetch trustees');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrustees();
    }, []);

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Board of Trustees
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Dedicated stewards guiding our organization's mission
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

            {/* Trustees Grid */}
            {!loading && !error && (
                <div className="max-w-7xl mx-auto">
                    {trustees.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium mt-4 text-gray-900">No Trustees Found</h3>
                                <p className="mt-1 text-gray-500">We couldn't find any trustees in our records.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trustees.map((trustee) => (
                                <div
                                    key={trustee._id}
                                    className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden hover:shadow-md transition-all duration-300"
                                >
                                    {/* Rectangular Profile Picture */}
                                    <div className="h-80 bg-gray-100 relative">
                                        <img
                                            src={trustee.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'}
                                            alt={trustee.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80';
                                            }}
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900">{trustee.name}</h2>
                                        <div className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-none mt-2">
                                            {trustee.designation.replace(/_/g, ' ')}
                                        </div>

                                        {/* Trustee Details */}
                                        <div className="mt-4 space-y-3">
                                            {trustee.department && (
                                                <div className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span className="text-gray-700">{trustee.department}</span>
                                                </div>
                                            )}
                                            {trustee.email && (
                                                <div className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-gray-700 break-all">{trustee.email}</span>
                                                </div>
                                            )}
                                            {trustee.phone && (
                                                <div className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-gray-700">{trustee.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Awards Section */}
                                        {trustee.awards?.length > 0 && (
                                            <div className="mt-6 pt-4 border-t border-gray-200">
                                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Contributions</h4>
                                                <ul className="space-y-2">
                                                    {trustee.awards.map((award, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-gray-700">{award}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
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

export default Trustees;