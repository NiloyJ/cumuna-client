// // import React, { useState, useEffect, useContext } from 'react';
// // import AuthContext from '../../context/AuthContext/AuthContext';

// // const ShowPresident = () => {
// //     const [presidents, setPresidents] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const { user } = useContext(AuthContext);

// //     useEffect(() => {
// //         const fetchPresidents = async () => {
// //             try {
// //                 const response = await fetch('http://localhost:5000/president');
// //                 if (!response.ok) {
// //                     throw new Error('Failed to fetch presidents');
// //                 }
// //                 const data = await response.json();
// //                 setPresidents(data);
// //             } catch (err) {
// //                 setError(err.message);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchPresidents();
// //     }, []);

// //     if (loading) {
// //         return <div className="text-center py-20">Loading presidents...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-center py-20 text-red-500">Error: {error}</div>;
// //     }

// //     return (
// //         <div className="max-w-6xl mx-auto px-6 py-12">
// //             <div className="text-center mb-16">
// //                 <h1 className="text-4xl font-light text-gray-800 mb-3 tracking-wide">LETTER FROM THE PRESIDENT</h1>
// //                 <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
// //             </div>
            
// //             {presidents.length === 0 ? (
// //                 <div className="text-center py-20">No presidents found</div>
// //             ) : (
// //                 <div className="space-y-20">
// //                     {presidents.map((president) => (
// //                         <div key={president._id} className="flex flex-col md:flex-row gap-10 items-center">
// //                             {/* President's Image */}
// //                             <div className="w-full md:w-1/3">
// //                                 {president.imageUrl && (
// //                                     <div className="relative overflow-hidden rounded-lg shadow-lg">
// //                                         <img 
// //                                             src={president.imageUrl} 
// //                                             alt={president.name} 
// //                                             className="w-full h-auto object-cover"
// //                                             onError={(e) => {
// //                                                 e.target.src = 'https://via.placeholder.com/500x600?text=President+Photo';
// //                                             }}
// //                                         />
// //                                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
// //                                             <h3 className="text-xl font-medium text-white">{president.name}</h3>
// //                                             <p className="text-blue-200">Department of {president.department}</p>
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* President's Message */}
// //                             <div className="w-full md:w-2/3">
// //                                 <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600 shadow-sm">
// //                                     <h2 className="text-2xl font-light text-gray-700 mb-6">Dear Delegates,</h2>
// //                                     <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
// //                                         {president.message}
// //                                     </div>
// //                                     <div className="mt-8 pt-4 border-t border-gray-100">
// //                                         <p className="text-gray-500">With warm regards,</p>
// //                                         <p className="text-blue-600 font-medium">{president.name}</p>
// //                                         <p className="text-sm text-gray-400 mt-2">
// //                                             {new Date(president.created_at).toLocaleDateString('en-US', {
// //                                                 year: 'numeric',
// //                                                 month: 'long',
// //                                                 day: 'numeric'
// //                                             })}
// //                                         </p>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ShowPresident;

// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../../context/AuthContext/AuthContext';

// const ShowPresident = () => {
//     const [presidents, setPresidents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useContext(AuthContext);
//     const [deleting, setDeleting] = useState(false);

//     const fetchPresidents = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/president');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch presidents');
//             }
//             const data = await response.json();
//             setPresidents(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPresidents();
//     }, []);

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this president?')) {
//             return;
//         }

//         setDeleting(true);
//         try {
//             const response = await fetch(`http://localhost:5000/president/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${user.token}` // Assuming your API needs auth
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete president');
//             }

//             // Refresh the list after deletion
//             await fetchPresidents();
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setDeleting(false);
//         }
//     };

//     if (loading) {
//         return <div className="text-center py-20">Loading presidents...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-20 text-red-500">Error: {error}</div>;
//     }

//     return (
//         <div className="max-w-6xl mx-auto px-6 py-12">
//             <div className="text-center mb-16">
//                 <h1 className="text-4xl font-light text-gray-800 mb-3 tracking-wide">LETTER FROM THE PRESIDENT</h1>
//                 <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
//             </div>
            
//             {presidents.length === 0 ? (
//                 <div className="text-center py-20">No presidents found</div>
//             ) : (
//                 <div className="space-y-20">
//                     {presidents.map((president) => (
//                         <div key={president._id} className="flex flex-col md:flex-row gap-10 items-center">
//                             {/* President's Image */}
//                             <div className="w-full md:w-1/3 relative">
//                                 {president.imageUrl && (
//                                     <div className="relative overflow-hidden rounded-lg shadow-lg">
//                                         <img 
//                                             src={president.imageUrl} 
//                                             alt={president.name} 
//                                             className="w-full h-auto object-cover"
//                                             onError={(e) => {
//                                                 e.target.src = 'https://via.placeholder.com/500x600?text=President+Photo';
//                                             }}
//                                         />
//                                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                                             <h3 className="text-xl font-medium text-white">{president.name}</h3>
//                                             <p className="text-blue-200">Department of {president.department}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {user && (
//                                     <button
//                                         onClick={() => handleDelete(president._id)}
//                                         disabled={deleting}
//                                         className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                                         title="Delete President"
//                                     >
//                                         {deleting ? (
//                                             <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                             </svg>
//                                         ) : (
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                         )}
//                                     </button>
//                                 )}
//                             </div>

//                             {/* President's Message */}
//                             <div className="w-full md:w-2/3">
//                                 <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600 shadow-sm">
//                                     <h2 className="text-2xl font-light text-gray-700 mb-6">Dear Delegates,</h2>
//                                     <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
//                                         {president.message}
//                                     </div>
//                                     <div className="mt-8 pt-4 border-t border-gray-100">
//                                         <p className="text-gray-500">With warm regards,</p>
//                                         <p className="text-blue-600 font-medium">{president.name}</p>
//                                         <p className="text-sm text-gray-400 mt-2">
//                                             {new Date(president.created_at).toLocaleDateString('en-US', {
//                                                 year: 'numeric',
//                                                 month: 'long',
//                                                 day: 'numeric'
//                                             })}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShowPresident;

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';

const ShowPresident = () => {
    const [presidents, setPresidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const [deleting, setDeleting] = useState(false);

    const fetchPresidents = async () => {
        try {
            const response = await fetch('http://localhost:5000/president');
            if (!response.ok) {
                throw new Error('Failed to fetch presidents');
            }
            const data = await response.json();
            setPresidents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPresidents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this president?')) {
            return;
        }

        setDeleting(true);
        try {
            const response = await fetch(`http://localhost:5000/president/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete president');
            }

            await fetchPresidents();
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20">Loading presidents...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-light text-gray-800 mb-3 tracking-wide">LETTER FROM THE PRESIDENT</h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            {presidents.length === 0 ? (
                <div className="text-center py-20">No presidents found</div>
            ) : (
                <div className="space-y-20">
                    {presidents.map((president) => (
                        <div key={president._id} className="flex flex-col md:flex-row gap-10 items-stretch"> {/* Changed to items-stretch */}
                            {/* President's Image - Made taller */}
                            <div className="w-full md:w-1/3 relative">
                                {president.imageUrl && (
                                    <div className="relative h-full min-h-[400px] overflow-hidden rounded-lg shadow-lg"> {/* Added fixed height */}
                                        <img 
                                            src={president.imageUrl} 
                                            alt={president.name} 
                                            className="w-full h-full object-cover" /* Changed to full height */
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/500x600?text=President+Photo';
                                            }}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                            <h3 className="text-xl font-medium text-white">{president.name}</h3>
                                            <p className="text-blue-200">Department of {president.department}</p>
                                        </div>
                                    </div>
                                )}
                                {user && (
                                    <button
                                        onClick={() => handleDelete(president._id)}
                                        disabled={deleting}
                                        className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                                        title="Delete President"
                                    >
                                        {deleting ? (
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* President's Message */}
                            <div className="w-full md:w-2/3 flex flex-col"> {/* Added flex-col */}
                                <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600 shadow-sm h-full"> {/* Added h-full */}
                                    <h2 className="text-2xl font-light text-gray-700 mb-6">Dear Delegates,</h2>
                                    <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                        {president.message}
                                    </div>
                                    <div className="mt-8 pt-4 border-t border-gray-100">
                                        <p className="text-gray-500">With warm regards,</p>
                                        <p className="text-blue-600 font-medium">{president.name}</p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            {new Date(president.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowPresident;