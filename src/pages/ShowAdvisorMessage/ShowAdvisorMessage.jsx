

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
        <div className="w-full bg-white py-12 px-4 mt-0">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Meet Our <span className=' text-white bg-gradient-to-r from-blue-600 to-blue-800'>Advisors</span></h2>
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
                        {/* <p className="text-sm text-white bg-secondary px-3 py-1 rounded my-2">{advisor?.designation}</p> */}
                        <p className="text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1 rounded my-2">
  {advisor?.designation}
</p>
                        <p className="italic text-gray-900 text-center text-sm mb-2">
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

// import React, { useState, useEffect } from 'react';
// import { API_URL } from '../../config/config';

// const ShowAdvisorMessage = () => {
//     const [advisors, setAdvisors] = useState([]);
//     const [loading, setLoading] = useState(true);

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
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching advisors:', error);
//                 setLoading(false);
//             }
//         };
//         fetchAdvisors();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64 bg-gray-900">
//                 <span className="loading loading-spinner loading-lg text-blue-500"></span>
//             </div>
//         );
//     }

//     if (advisors.length === 0 && !loading) {
//         return (
//             <div className="w-full bg-gray-900 py-16 text-center">
//                 <h3 className="text-xl text-gray-400">No advisors found</h3>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full bg-gray-900 py-16 px-4">
//             <div className="container mx-auto">
//                 <div className="text-center mb-16">
//                     <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
//                         Meet Our Advisors
//                     </h2>
//                     <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {advisors.map((advisor, index) => (
//                         <div 
//                             key={index} 
//                             className="group relative bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-2"
//                         >
//                             <div className="relative w-36 h-36 mb-6">
//                                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 p-1 transform group-hover:rotate-6 transition duration-500">
//                                     <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-gray-900">
//                                         <img
//                                             src={advisor?.profileUrl || 'https://via.placeholder.com/300'}
//                                             alt={advisor?.name}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <h3 className="text-xl font-bold text-white mb-2">{advisor?.name}</h3>
//                             <p className="text-sm text-white bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-1 rounded-full mb-4 shadow-md">
//                                 {advisor?.designation}
//                             </p>
                            
//                             <div className="relative mb-4 w-full">
//                                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
//                                 <p className="italic text-gray-300 text-center text-sm pt-4 px-2">
//                                     "{advisor?.advisorMessage || 'No message available'}"
//                                 </p>
//                             </div>
                            
//                             <p className="text-sm text-gray-400 mt-auto">
//                                 {advisor?.worksAt || advisor?.organization || 'Organization not specified'}
//                             </p>
                            
//                             <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShowAdvisorMessage;

