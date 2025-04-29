

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
                const trusteeMembers = data.filter(member => member.designation === 'Trustee');
                setTrustees(trusteeMembers);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTrustees();
    }, []);

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
                        <div key={trustee._id} className="card bg-base-100 shadow-xl min-h-[500px] flex flex-col">
                            <figure className="px-4 pt-4">
                                <img 
                                    src={trustee.profileUrl || 'https://via.placeholder.com/400x500'} 
                                    alt={trustee.name} 
                                    className="rounded-xl h-80 w-full object-cover object-top"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-3xl">{trustee.name}</h2>
                                <div className='inline-block px-3 py-1 text-sm font-medium bg-gray-100 rounded-none mt-2 bg-primary text-white text-xl'>
                                    {trustee.designation}
                                </div>

                                {trustee.awards && trustee.awards.length > 0 && (
                                    <div className="mt-2">
                                        <h3 className="font-semibold mb-1">Awards:</h3>
                                        <ul className="space-y-1">
                                            {trustee.awards.map((award, index) => (
                                                <li key={index} className="flex items-start justify-center">
                                                    <span className="mr-2 mt-1">✅</span>
                                                    <span>{award}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Social Media Links */}
                                {trustee.socialMedia && (
                                    <div className="flex justify-center space-x-4 mt-4">
                                        {trustee.socialMedia.facebook && (
                                            <a 
                                                href={trustee.socialMedia.facebook} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                                </svg>
                                            </a>
                                        )}
                                        {trustee.socialMedia.instagram && (
                                            <a 
                                                href={trustee.socialMedia.instagram} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-pink-600 hover:text-pink-800"
                                            >
                                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                                </svg>
                                            </a>
                                        )}
                                        {trustee.socialMedia.linkedin && (
                                            <a 
                                                href={trustee.socialMedia.linkedin} 
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default Trustees;