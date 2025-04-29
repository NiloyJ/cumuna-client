// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../config/config';
// const GoverningBoardMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 

//   useEffect(() => {
//     const fetchGoverningBoardMembers = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/committee`);
//         // Filter members with 'Governing Board' designation
//         const governingBoardMembers = response.data.filter(
//           member => member.designation === 'Governing Board'
//         );
//         setMembers(governingBoardMembers);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchGoverningBoardMembers();
//   }, [API_URL]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error max-w-md mx-auto">
//         <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <span>Error: {error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Governing Board Members</h1>
      
//       {members.length === 0 ? (
//         <div className="alert alert-info max-w-md mx-auto">
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>No governing board members found</span>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {members.map(member => (
//             <div key={member._id} className="card bg-white shadow-xl">
//               <figure className="px-4 pt-4">
//                 <img 
//                   src={member.profileUrl || 'https://via.placeholder.com/400x300'} 
//                   alt={member.name} 
//                   className="rounded-xl h-64 w-full object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">{member.name}</h2>
//                 <div className="badge badge-primary">{member.designation}</div>
                
//                 {member.awards && member.awards.length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="font-semibold mb-2">Awards:</h3>
//                     <ul className="space-y-2">
//                       {member.awards.map((award, index) => (
//                         <li key={index} className="flex items-start">
//                           <span className="mr-2">✅</span>
//                           <span>{award}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoverningBoardMembers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';

const GoverningBoardMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoverningBoardMembers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/committee`);
                const data = response.data;

                if (response.status === 200) {
                    const governingBoardData = data.filter(member =>
                        member.designation?.toLowerCase() === 'governing board'
                    );
                    setMembers(governingBoardData);
                } else {
                    throw new Error(data.message || 'Failed to fetch governing board members');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGoverningBoardMembers();
    }, [API_URL]);

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-center">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Governing Board</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    The leadership team guiding our organization's vision
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
                <div className="alert alert-error max-w-2xl mx-auto my-8 shadow-lg text-center justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error: {error}</span>
                    </div>
                </div>
            )}

            {/* Members Grid */}
            {!loading && !error && (
                <div className="max-w-7xl mx-auto">
                    {members.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium mt-4 text-gray-900">No Members Found</h3>
                                <p className="mt-1 text-gray-500">We couldn't find any governing board members in our records.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center text-center">
                            {members.map((member) => (
                                <div
                                    key={member._id}
                                    className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden hover:shadow-md transition-all duration-300"
                                >
                                    <div className="h-80 bg-gray-100 relative">
                                        <img
                                            src={member.profileUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2';
                                            }}
                                        />
                                    </div>

                                    <div className="p-6 text-center">
                                        <h2 className="text-3xl font-bold text-gray-900">{member.name}</h2>
                                        <div className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 rounded-none mt-2 bg-primary text-white">
                                            Governing Board
                                        </div>

                                        {/* Member's Details */}
                                        <div className="mt-4 space-y-3">
                                            {member.awards && member.awards.length > 0 && (
                                                <div>
                                                    <div className="text-sm font-semibold mb-2">Notable Achievements</div>
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        {member.awards.slice(0, 3).map((award, i) => (
                                                            <div key={i} className="badge badge-outline">
                                                                ✅ {award}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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

export default GoverningBoardMembers;