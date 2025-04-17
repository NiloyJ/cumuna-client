// import React, { useState, useEffect, useContext } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import AuthContext from '../../context/AuthContext/AuthContext';
// import { API_URL } from '../../config/config';

// const ShowPresident = () => {
//     const [presidents, setPresidents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useContext(AuthContext);
//     const [deleting, setDeleting] = useState(false);
//     const controls = useAnimation();
//     const [ref, inView] = useInView({
//         threshold: 0.1,
//         triggerOnce: true
//     });

//     useEffect(() => {
//         if (inView) {
//             controls.start('visible');
//         }
//     }, [controls, inView]);

//     const fetchPresidents = async () => {
//         try {
//             const response = await fetch(`${API_URL}/president`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 credentials: 'omit' // This prevents sending cookies
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setPresidents(data);
//         } catch (err) {
//             console.error('Error fetching presidents:', err);
//             setError(err.message || 'Failed to fetch presidents');
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
//             const response = await fetch(`${API_URL}/president/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': user?.token ? `Bearer ${user.token}` : ''
//                 },
//                 credentials: 'omit'
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             await fetchPresidents();
//         } catch (err) {
//             console.error('Error deleting president:', err);
//             setError(err.message || 'Failed to delete president');
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

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut"
//             }
//         }
//     };

//     return (
//         <motion.div 
//             ref={ref}
//             initial="hidden"
//             animate={controls}
//             variants={containerVariants}
//             className="max-w-6xl mx-auto px-6 py-12"
//         >
//             <motion.div className="text-center mb-16" variants={itemVariants}>
//                 <motion.h1 
//                     className="text-4xl font-light text-gray-800 mb-3 tracking-wide"
//                     variants={itemVariants}
//                 >
//                     LETTER FROM THE PRESIDENT
//                 </motion.h1>
//                 <motion.div 
//                     className="w-24 h-1 bg-blue-600 mx-auto"
//                     initial={{ scaleX: 0 }}
//                     animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                 ></motion.div>
//             </motion.div>

//             {presidents.length === 0 ? (
//                 <div className="text-center py-20">No presidents found</div>
//             ) : (
//                 <div className="space-y-20">
//                     {presidents.map((president, index) => (
//                         <motion.div 
//                             key={president._id} 
//                             className="flex flex-col md:flex-row gap-10 items-stretch"
//                             variants={itemVariants}
//                             custom={index}
//                         >
//                             {/* President's Image - Width increased by ~40% (from 1/3 to ~46%) */}
//                             <div className="w-full md:w-[46%] relative">
//                                 <motion.div 
//                                     className="relative h-full min-h-[400px] overflow-hidden rounded-lg shadow-lg"
//                                     whileHover={{ scale: 1.02 }}
//                                 >
//                                     <motion.img 
//                                         src={president.imageUrl} 
//                                         alt={president.name} 
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => {
//                                             e.target.src = 'https://via.placeholder.com/500x600?text=President+Photo';
//                                         }}
//                                         initial={{ scale: 1 }}
//                                         whileHover={{ scale: 1.05 }}
//                                         transition={{ duration: 0.3 }}
//                                     />
//                                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                                         <h3 className="text-xl font-medium text-white">{president.name}</h3>
//                                         <p className="text-blue-200">Department of {president.department}</p>
//                                     </div>
//                                 </motion.div>
//                                 {user && (
//                                     <motion.button
//                                         onClick={() => handleDelete(president._id)}
//                                         disabled={deleting}
//                                         className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
//                                         title="Delete President"
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
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
//                                     </motion.button>
//                                 )}
//                             </div>

//                             {/* President's Message - Adjusted width to complement image */}
//                             <div className="w-full md:w-[54%] flex flex-col">
//                                 <motion.div 
//                                     className="bg-white p-8 rounded-lg border-l-4 border-blue-600 shadow-sm h-full"
//                                     whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
//                                 >
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
//                                 </motion.div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// export default ShowPresident;

import React, { useState, useEffect, useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AuthContext from '../../context/AuthContext/AuthContext';
import { API_URL } from '../../config/config';

const ShowPresident = () => {
    const [presidents, setPresidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const [deleting, setDeleting] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const fetchPresidents = async () => {
        try {
            const response = await fetch(`${API_URL}/president`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'omit'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPresidents(data);
        } catch (err) {
            console.error('Error fetching presidents:', err);
            setError(err.message || 'Failed to fetch presidents');
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
            const response = await fetch(`${API_URL}/president/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': user?.token ? `Bearer ${user.token}` : ''
                },
                credentials: 'omit'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await fetchPresidents();
        } catch (err) {
            console.error('Error deleting president:', err);
            setError(err.message || 'Failed to delete president');
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-6xl mx-auto px-6 py-12"
        >
            <motion.div className="text-center mb-16" variants={itemVariants}>
                <motion.h1
                    className="text-4xl font-light text-gray-800 mb-3 tracking-wide"
                    variants={itemVariants}
                >
                    LETTER FROM THE PRESIDENT
                </motion.h1>
                <motion.div
                    className="w-24 h-1 bg-blue-600 mx-auto"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
            </motion.div>

            {presidents.length === 0 ? (
                <div className="text-center py-20">No presidents found</div>
            ) : (
                <div className="space-y-20">
                    {presidents.map((president, index) => (
                        <motion.div
                            key={president._id}
                            className="flex flex-col md:flex-row gap-10 items-stretch"
                            variants={itemVariants}
                            custom={index}
                        >
                            {/* President's Image - Standardized container */}
                            {/* President's Image - Updated container without gray background */}
                            {/* President's Image - Container that adjusts to image height */}
                            <div className="w-full md:w-[46%] relative flex flex-col">
                                <motion.div
                                    className="relative rounded-lg shadow-lg overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    style={{ height: 'fit-content' }}  // Container fits image height
                                >
                                    <motion.img
                                        src={president.imageUrl}
                                        alt={president.name}
                                        className="w-full h-auto max-h-[500px] object-contain"
                                        style={{
                                            display: 'block',  // Removes bottom space under image
                                            width: '100%',
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/500x600?text=President+Photo';
                                        }}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>

                                {/* Name and Department with primary background */}
                                <div className="mt-2 bg-blue-600 rounded-b-lg p-4 shadow-md">
                                    <h3 className="text-xl font-medium text-white">{president.name}</h3>
                                    <p className="text-blue-100">Department of {president.department}</p>
                                </div>

                                {user && (
                                    <motion.button
                                        onClick={() => handleDelete(president._id)}
                                        disabled={deleting}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                                        title="Delete President"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {/* Delete button SVG remains the same */}
                                    </motion.button>
                                )}
                            </div>

                            {/* President's Message */}
                            <div className="w-full md:w-[54%] flex flex-col">
                                <motion.div
                                    className="bg-white p-8 rounded-lg border-l-4 border-blue-600 shadow-sm h-full"
                                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                >
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
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ShowPresident;