import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const ShowAdvisorMessage = () => {
    const [advisors, setAdvisors] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

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
                if (advisorsOnly.length > 1) {
                    setNextIndex(1);
                }
            } catch (error) {
                console.error('Error fetching advisors:', error);
            }
        };
        fetchAdvisors();
    }, []);

    useEffect(() => {
        if (advisors.length <= 1) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % advisors.length);
                setNextIndex(prev => (prev + 1) % advisors.length);
                setIsTransitioning(false);
            }, 1000);

        }, 5000);

        return () => clearInterval(interval);
    }, [advisors.length]);

    if (advisors.length === 0) {
        return <div className="text-center py-10">Loading advisor messages...</div>;
    }

    const currentAdvisor = advisors[currentIndex];
    const nextAdvisor = advisors[nextIndex];

    return (
        <div className="w-full flex flex-col items-center justify-center py-6 px-4 bg-gray-100 overflow-hidden relative">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 z-10">Meet Our Advisors</h2>

            <div className="relative w-full max-w-md h-72">
                {/* Current Advisor */}
                <div className={`absolute bg-white rounded-lg p-6 w-full flex flex-col items-center transition-all duration-1000 ease-in-out ${isTransitioning ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 mb-4">
                        <img
                            src={currentAdvisor?.profileUrl || 'https://via.placeholder.com/300'}
                            alt={currentAdvisor?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{currentAdvisor?.name}</h3>
                     {/* Workplace */}
                    <p className="text-md text-white mb-4 bg-primary py-2 px-4 bg-secondary">{currentAdvisor?.designation}</p>
                    <p className="italic text-gray-700 text-center text-md leading-relaxed max-w-xs">
                        "{currentAdvisor?.advisorMessage}"
                    </p>
                    <p className="text-sm  text-xl text-gray-600 mt-2">{currentAdvisor?.worksAt}</p>
                </div>

                {/* Next Advisor */}
                {advisors.length > 1 && (
                    <div
                        className={`absolute bg-white rounded-lg p-4 w-full flex flex-col items-center transition-all duration-1000 ease-in-out ${
                            isTransitioning ? 'translate-x-0 opacity-100' : 'translate-x-[30%] opacity-70'
                        }`}
                        style={{
                            right: isTransitioning ? '0' : '-30%',
                            filter: isTransitioning ? 'none' : 'brightness(0.95)',
                        }}
                    >
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-400 mb-3">
                            <img
                                src={nextAdvisor?.profileUrl || 'https://via.placeholder.com/300'}
                                alt={nextAdvisor?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{nextAdvisor?.name}</h3>
                        <p className="text-sm text-gray-600">{nextAdvisor?.organization}</p> {/* Workplace */}
                        <p className="text-md text-white mb-4 bg-primary py-2 px-4 bg-secondary">{nextAdvisor?.designation}</p>
                        <p className="italic text-gray-700 text-center text-md leading-relaxed max-w-xs">
                            "{nextAdvisor?.advisorMessage}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowAdvisorMessage;
