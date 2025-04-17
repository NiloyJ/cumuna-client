// import React, { useState, useEffect, useContext } from 'react';
// import { API_URL } from '../../config/config';
// import AuthContext from '../../context/AuthContext/AuthContext';

// const Resources = () => {
//     const [resources, setResources] = useState([]);
//     const [newResource, setNewResource] = useState({
//         link: '',
//         title: '',
//         type: 'Rules of Procedure'
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const { user } = useContext(AuthContext);

//     const PDF_CATEGORIES = [
//         "Rules of Procedure",
//         "Position Paper Guidelines",
//         "Resolution Writing",
//         "Public Speaking",
//         "Country Profiles",
//         "Committee Background",
//         "Historical Context",
//         "Sample Documents",
//         "Other"
//     ];

//     useEffect(() => {
//         fetchResources();
//     }, []);

//     const fetchResources = async () => {
//         setIsLoading(true);
//         try {
//             const response = await fetch(`${API_URL}/api/resources`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch resources');
//             }
//             const data = await response.json();
//             setResources(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewResource(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const response = await fetch(`${API_URL}/api/resources`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Include auth token if needed
//                     // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify(newResource)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to add resource');
//             }

//             const result = await response.json();
//             setSuccess('Resource added successfully!');
//             setNewResource({ link: '', title: '', type: 'Rules of Procedure' });
//             fetchResources();
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this resource?')) return;
        
//         try {
//             const response = await fetch(`${API_URL}/api/resources/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     // Include auth token if needed
//                     // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete resource');
//             }

//             setSuccess('Resource deleted successfully!');
//             fetchResources();
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-6 text-center">MUN Resources</h1>
            
//             {/* Add Resource Form (only for authenticated users) */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={newResource.title}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
                    
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
//                         <input
//                             type="url"
//                             name="link"
//                             value={newResource.link}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
                    
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                         <select
//                             name="type"
//                             value={newResource.type}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             {PDF_CATEGORIES.map(category => (
//                                 <option key={category} value={category}>{category}</option>
//                             ))}
//                         </select>
//                     </div>
                    
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                     >
//                         {isLoading ? 'Adding...' : 'Add Resource'}
//                     </button>
//                 </form>
                
//                 {error && <p className="mt-4 text-red-600">{error}</p>}
//                 {success && <p className="mt-4 text-green-600">{success}</p>}
//             </div>
            
//             {/* Resources List */}
//             <div>
//                 <h2 className="text-2xl font-semibold mb-4">Available Resources</h2>
                
//                 {isLoading && !resources.length ? (
//                     <p>Loading resources...</p>
//                 ) : error ? (
//                     <p className="text-red-600">{error}</p>
//                 ) : resources.length === 0 ? (
//                     <p>No resources available yet.</p>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {resources.map(resource => (
//                             <div key={resource._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                                 <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
//                                     {resource.type}
//                                 </span>
//                                 <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
//                                 <a 
//                                     href={resource.link} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:underline block mb-3 truncate"
//                                 >
//                                     {resource.link}
//                                 </a>
//                                 <button
//                                     onClick={() => handleDelete(resource._id)}
//                                     className="text-red-600 hover:text-red-800 text-sm font-medium"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Resources;

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [newResource, setNewResource] = useState({
        link: '',
        title: '',
        type: 'Rules of Procedure'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useContext(AuthContext);

    const PDF_CATEGORIES = [
        "Rules of Procedure",
        "Position Paper Guidelines",
        "Resolution Writing",
        "Public Speaking",
        "Country Profiles",
        "Committee Background",
        "Historical Context",
        "Sample Documents",
        "Other"
    ];

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/resources`);
            if (!response.ok) {
                throw new Error('Failed to fetch resources');
            }
            const data = await response.json();
            setResources(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return; // Additional protection
        
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${API_URL}/api/resources`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Include auth token
                },
                body: JSON.stringify(newResource)
            });

            if (!response.ok) {
                throw new Error('Failed to add resource');
            }

            const result = await response.json();
            setSuccess('Resource added successfully!');
            setNewResource({ link: '', title: '', type: 'Rules of Procedure' });
            fetchResources();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!user) return; // Additional protection
        if (!window.confirm('Are you sure you want to delete this resource?')) return;
        
        try {
            const response = await fetch(`${API_URL}/api/resources/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}` // Include auth token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete resource');
            }

            setSuccess('Resource deleted successfully!');
            fetchResources();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">MUN Resources</h1>
            
            {/* Add Resource Form (only for authenticated users) */}
            {user && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newResource.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                            <input
                                type="url"
                                name="link"
                                value={newResource.link}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                name="type"
                                value={newResource.type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {PDF_CATEGORIES.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Adding...' : 'Add Resource'}
                        </button>
                    </form>
                    
                    {error && <p className="mt-4 text-red-600">{error}</p>}
                    {success && <p className="mt-4 text-green-600">{success}</p>}
                </div>
            )}
            
            {/* Resources List */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Available Resources</h2>
                
                {isLoading && !resources.length ? (
                    <p>Loading resources...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : resources.length === 0 ? (
                    <p>No resources available yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map(resource => (
                            <div key={resource._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                                    {resource.type}
                                </span>
                                <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                                <a 
                                    href={resource.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline block mb-3 truncate"
                                >
                                    {resource.link}
                                </a>
                                {user && (
                                    <button
                                        onClick={() => handleDelete(resource._id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resources;