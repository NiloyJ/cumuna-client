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
                    // Filter for trustees (case insensitive)
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
        <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3">
                    Board of Trustees
                </h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                    Dedicated stewards guiding our organization's mission
                </p>
                <div className="divider w-24 mx-auto my-4"></div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium mt-4">No Trustees Found</h3>
                                <p className="mt-1 text-base-content/70">We couldn't find any trustees in our records.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trustees.map((trustee, index) => (
                                <div
                                    key={trustee._id}
                                    className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <figure className="px-8 pt-8">
                                        <div className="avatar">
                                            <div className="w-40 h-40 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                                                <img
                                                    src={trustee.imageUrl || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                                                    alt={trustee.name}
                                                    onError={(e) => {
                                                        e.target.src = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </figure>
                                    <div className="card-body items-center text-center pt-4">
                                        <h2 className="card-title text-2xl">{trustee.name}</h2>
                                        <div className="badge badge-accent badge-lg mt-2">
                                            {trustee.designation}
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            {trustee.email && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm">{trustee.email}</span>
                                                </div>
                                            )}
                                            {trustee.phone && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-sm">{trustee.phone}</span>
                                                </div>
                                            )}
                                            {trustee.department && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span className="text-sm">{trustee.department}</span>
                                                </div>
                                            )}
                                        </div>

                                        {trustee.awards?.length > 0 && (
                                            <div className="mt-6 w-full">
                                                <div className="text-sm font-semibold mb-2 text-accent">Key Contributions</div>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {trustee.awards.slice(0, 3).map((award, i) => (
                                                        <div key={i} className="badge badge-outline gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {award}
                                                        </div>
                                                    ))}
                                                </div>
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