

// import React, { useState, useEffect } from 'react';
// import { API_URL } from '../../config/config';

// const ShowAdvisorMessage = () => {
//     const [advisors, setAdvisors] = useState([]);

//     useEffect(() => {
//         const fetchAdvisors = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/committee`);
//                 if (!response.ok) throw new Error('Failed to fetch committee');
//                 const data = await response.json();
//                 const advisorsOnly = data.filter(member =>
//                     member.designation.toLowerCase().includes('advisor')
//                 );
//                 setAdvisors(advisorsOnly);
//             } catch (error) {
//                 console.error('Error fetching advisors:', error);
//             }
//         };
//         fetchAdvisors();
//     }, []);

//     if (advisors.length === 0) {
//         return <div className="text-center py-6">Loading advisor messages...</div>;
//     }

//     return (
//         <div className="w-full bg-white py-8 px-4">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Meet Our <span className='text-white bg-gradient-to-r from-blue-600 to-blue-800'>Advisors</span></h2>
//             <div className="flex flex-wrap justify-center gap-4">
//                 {advisors.map((advisor, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-md w-full max-w-sm p-4 flex flex-col items-center">
//                         <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 mb-3">
//                             <img
//                                 src={advisor?.profileUrl || 'https://via.placeholder.com/300'}
//                                 alt={advisor?.name}
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900">{advisor?.name}</h3>
//                         <p className="text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1 rounded my-1">
//                             {advisor?.designation}
//                         </p>
//                         <p className="italic text-gray-900 text-center text-sm mb-1">
//                             "{advisor?.advisorMessage}"
//                         </p>
//                         <p className="text-sm text-gray-900">{advisor?.worksAt || advisor?.organization}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ShowAdvisorMessage;

import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const ShowAdvisorMessage = () => {
    const [advisors, setAdvisors] = useState([]);
    const [index, setIndex] = useState(0);

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

    const checkNumber = (number) => {
        if (number > advisors.length - 1) {
            return 0;
        }
        if (number < 0) {
            return advisors.length - 1;
        }
        return number;
    };

    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };

    const prevPerson = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };

    const getRandomPerson = () => {
        const getRandomIntInclusive = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let randomIndex = getRandomIntInclusive(0, advisors.length - 1);
        if (randomIndex === index && advisors.length > 1) {
            randomIndex = index + 1;
        }
        setIndex(checkNumber(randomIndex));
    };

    if (advisors.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg"></div>
                    <p className="mt-4 text-gray-600">Loading advisors...</p>
                </div>
            </div>
        );
    }

    const { name, designation, advisorMessage, worksAt, organization, profileUrl } = advisors[index];

    return (
        <div className="w-full bg-gray-50 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Meet Our <span className="text-white bg-gradient-to-r from-blue-600 to-blue-800 px-2">Advisors</span>
                </h2>
                
                <article className="bg-white rounded-lg shadow-md p-8 text-center relative">
                    <div className="relative mx-auto w-36 h-36 rounded-full mb-6">
                        <img
                            src={profileUrl || 'https://via.placeholder.com/300'}
                            alt={name}
                            className="w-full h-full object-cover rounded-full border-4 border-blue-500"
                        />
                        <span className="absolute top-0 left-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white transform translate-x-1 -translate-y-1">
                            <FaQuoteRight className="text-lg" />
                        </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{name}</h4>
                    <p className="text-blue-600 font-medium mb-4">{designation}</p>
                    <p className="text-gray-600 italic mb-6">"{advisorMessage || 'No message available'}"</p>
                    <p className="text-sm text-gray-500">{worksAt || organization}</p>
                    
                    <div className="flex justify-center mt-8 space-x-4">
                        <button 
                            onClick={prevPerson}
                            className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <button 
                            onClick={nextPerson}
                            className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                    
                </article>
            </div>
        </div>
    );
};

export default ShowAdvisorMessage;