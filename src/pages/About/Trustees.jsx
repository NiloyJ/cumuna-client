

import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';
const Trustees = () => {
    const [trustees, setTrustees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 

    useEffect(() => {
        const fetchTrustees = async () => {
            try {
                const response = await fetch(`${API_URL}/committee`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                // Filter members with Trustee designation
                const trusteeMembers = data.filter(member => member.designation === 'Trustee');
                setTrustees(trusteeMembers);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTrustees();
    }, [API_URL]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error: {error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Our Trustees</h1>
            
            {trustees.length === 0 ? (
                <div className="alert alert-info max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No trustees found</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trustees.map(trustee => (
                        <div key={trustee._id} className="card bg-base-100 shadow-xl">
                            <figure className="px-4 pt-4">
                                <img 
                                    src={trustee.profileUrl || 'https://via.placeholder.com/400x300'} 
                                    alt={trustee.name} 
                                    className="rounded-xl h-64 w-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{trustee.name}</h2>
                                <div className="badge badge-primary">{trustee.designation}</div>
                                
                                {trustee.awards && trustee.awards.length > 0 && (
                                    <div className="mt-2">
                                        <h3 className="font-semibold mb-1">Awards:</h3>
                                        <ul className="space-y-1">
                                            {trustee.awards.map((award, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mr-2 mt-1">✅</span>
                                                    <span>{award}</span>
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
    );
};

export default Trustees;