;

import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const Founders = () => {
    const [founders, setFounders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFounders = async () => {
            try {
                const response = await fetch(`${API_URL}/committee`);
                if (!response.ok) {
                    throw new Error('Failed to fetch founders');
                }
                const data = await response.json();
                const foundersData = data.filter(member =>
                    member.designation === 'Founder' || member.designation === 'Founders'
                );
                setFounders(foundersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFounders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error max-w-2xl mx-auto my-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error: {error}</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-16 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-primary mb-4">Our Visionaries</h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                    The brilliant minds who laid the foundation of our success story
                </p>
            </div>

            {/* Founders Grid */}
            {founders.length > 0 ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {founders.map((founder, index) => (
                        <div
                            key={founder._id}
                            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={founder.imageUrl || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                                            alt={founder.name}
                                            onError={(e) => {
                                                e.target.src = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';
                                            }}
                                        />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-2xl">{founder.name}</h2>
                                <div className="badge badge-primary badge-lg mt-2">
                                    <h2>Founder</h2>
                                </div>

                                {founder.awards && founder.awards.length > 0 && (
                                    <div className="mt-4">
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
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-lg font-medium mt-4">No Founders Found</h3>
                        <p className="mt-1 text-base-content/70">We couldn't find any founders in our records.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Founders;
