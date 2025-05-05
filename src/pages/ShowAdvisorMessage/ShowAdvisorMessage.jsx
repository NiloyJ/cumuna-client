

import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const ShowAdvisorMessage = () => {
    const [advisors, setAdvisors] = useState([]);

    useEffect(() => {
        const fetchAdvisors = async () => {
            try {
                const response = await fetch(`${API_URL}/committee`);
                if (!response.ok) throw new Error('Failed to fetch committee');
                const data = await response.json();
                const advisorsOnly = data.filter(member =>
                    member.designation.toLowerCase().includes('advisor')
                );
                setAdvisors(advisorsOnly);
            } catch (error) {
                console.error('Error fetching advisors:', error);
            }
        };
        fetchAdvisors();
    }, []);

    if (advisors.length === 0) {
        return <div className="text-center py-6">Loading advisor messages...</div>;
    }

    return (
        <div className="w-full bg-white py-8 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Meet Our <span className='text-white bg-gradient-to-r from-blue-600 to-blue-800'>Advisors</span></h2>
            <div className="flex flex-wrap justify-center gap-4">
                {advisors.map((advisor, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md w-full max-w-sm p-4 flex flex-col items-center">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 mb-3">
                            <img
                                src={advisor?.profileUrl || 'https://via.placeholder.com/300'}
                                alt={advisor?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{advisor?.name}</h3>
                        <p className="text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1 rounded my-1">
                            {advisor?.designation}
                        </p>
                        <p className="italic text-gray-900 text-center text-sm mb-1">
                            "{advisor?.advisorMessage}"
                        </p>
                        <p className="text-sm text-gray-900">{advisor?.worksAt || advisor?.organization}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAdvisorMessage;