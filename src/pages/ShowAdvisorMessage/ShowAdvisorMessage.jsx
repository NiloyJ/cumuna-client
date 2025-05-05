

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
        return <div className="text-center py-10">Loading advisor messages...</div>;
    }

    return (
        <div className="w-full bg-gray-100 py-12 px-4 mt-0">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Meet Our <span className='bg-primary text-white'>Advisors</span></h2>
            <div className="flex flex-wrap justify-center gap-6">
                {advisors.map((advisor, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                            <img
                                src={advisor?.profileUrl || 'https://via.placeholder.com/300'}
                                alt={advisor?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{advisor?.name}</h3>
                        <p className="text-sm text-white bg-secondary px-3 py-1 rounded my-2">{advisor?.designation}</p>
                        <p className="italic text-gray-700 text-center text-sm mb-2">
                            "{advisor?.advisorMessage}"
                        </p>
                        <p className="text-sm text-gray-600">{advisor?.worksAt || advisor?.organization}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAdvisorMessage;

