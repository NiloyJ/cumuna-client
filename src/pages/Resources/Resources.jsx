// import React, { useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../config/config';

// const Resources = () => {
//     const [pdfFiles, setPdfFiles] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     // Fetch all PDFs on component mount
//     React.useEffect(() => {
//         const fetchPdfs = async () => {
//             try {
//                 setIsLoading(true);
//                 const response = await axios.get(`${API_URL}/api/pdfs`);
//                 // Ensure we always have an array, even if response.data is null/undefined
//                 setPdfFiles(Array.isArray(response.data) ? response.data : []);
//                 setError(null);
//             } catch (err) {
//                 setError('Failed to fetch PDFs');
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchPdfs();
//     }, []);

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             setError('Please select a file first');
//             return;
//         }

//         if (selectedFile.type !== 'application/pdf') {
//             setError('Only PDF files are allowed');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdf', selectedFile);

//         try {
//             setError(null);
//             setSuccess(null);
//             const response = await axios.post(`${API_URL}/api/pdfs`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const progress = Math.round(
//                         (progressEvent.loaded * 100) / progressEvent.total
//                     );
//                     setUploadProgress(progress);
//                 },
//             });

//             setSuccess('PDF uploaded successfully!');
//             setPdfFiles(prevFiles => [...prevFiles, response.data]);
//             setSelectedFile(null);
//             setUploadProgress(0);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to upload PDF');
//             console.error(err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${API_URL}/api/pdfs/${id}`);
//             setPdfFiles(prevFiles => prevFiles.filter(file => file._id !== id));
//             setSuccess('PDF deleted successfully!');
//         } catch (err) {
//             setError('Failed to delete PDF');
//             console.error(err);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">PDF Resources</h1>
            
//             {/* Upload Section */}
//             <div className="mb-8 p-4 border rounded-lg bg-gray-50">
//                 <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
//                 <div className="flex flex-col md:flex-row gap-4 items-center">
//                     <input
//                         type="file"
//                         accept="application/pdf"
//                         onChange={handleFileChange}
//                         className="border p-2 rounded"
//                     />
//                     <button
//                         onClick={handleUpload}
//                         disabled={!selectedFile || uploadProgress > 0}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
//                     >
//                         {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload'}
//                     </button>
//                 </div>
//                 {uploadProgress > 0 && uploadProgress < 100 && (
//                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                         <div 
//                             className="bg-blue-600 h-2.5 rounded-full" 
//                             style={{ width: `${uploadProgress}%` }}
//                         ></div>
//                     </div>
//                 )}
//             </div>

//             {/* Status Messages */}
//             {error && (
//                 <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
//                     {error}
//                 </div>
//             )}
//             {success && (
//                 <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
//                     {success}
//                 </div>
//             )}

//             {/* Loading State */}
//             {isLoading && (
//                 <div className="flex justify-center items-center p-8">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//             )}

//             {/* PDF List */}
//             <div className="mt-6">
//                 <h2 className="text-xl font-semibold mb-4">Available PDFs</h2>
//                 {!isLoading && pdfFiles.length === 0 ? (
//                     <p className="text-gray-500">No PDFs available yet.</p>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {pdfFiles.map((pdf) => (
//                             <div key={pdf._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                                 <div className="flex justify-between items-start mb-2">
//                                     <h3 className="font-medium">{pdf.filename}</h3>
//                                     <button
//                                         onClick={() => handleDelete(pdf._id)}
//                                         className="text-red-500 hover:text-red-700"
//                                         title="Delete PDF"
//                                     >
//                                         ×
//                                     </button>
//                                 </div>
//                                 <div className="text-sm text-gray-500 mb-3">
//                                     Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}
//                                 </div>
//                                 <div className="flex justify-center">
//                                     <iframe
//                                         src={`${API_URL}/api/pdfs/${pdf._id}/view`}
//                                         title={pdf.filename}
//                                         className="w-full h-64 border"
//                                         style={{ pointerEvents: 'none' }} // Prevents interaction
//                                     />
//                                 </div>
//                                 <div className="mt-3 flex justify-between">
//                                     <span className="text-sm text-gray-500">
//                                         {(pdf.size / 1024).toFixed(1)} KB
//                                     </span>
//                                     <a
//                                         href={`${API_URL}/api/pdfs/${pdf._id}/download`}
//                                         download
//                                         className="text-blue-500 hover:text-blue-700 text-sm"
//                                     >
//                                         Download
//                                     </a>
//                                 </div>
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
import axios from 'axios';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const Resources = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    // Fetch categories and PDFs on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch available categories
                const categoriesResponse = await axios.get(`${API_URL}/api/pdfs/categories`);
                setCategories(categoriesResponse.data);
                
                // Fetch PDFs
                const pdfsResponse = await axios.get(`${API_URL}/api/pdfs`);
                setPdfFiles(Array.isArray(pdfsResponse.data) ? pdfsResponse.data : []);
                
                setError(null);
            } catch (err) {
                setError('Failed to load resources');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle category filter change
    const handleFilterChange = async (e) => {
        const category = e.target.value;
        setFilterCategory(category);
        
        try {
            setIsLoading(true);
            const url = category === 'all' 
                ? `${API_URL}/api/pdfs`
                : `${API_URL}/api/pdfs?category=${encodeURIComponent(category)}`;
            
            const response = await axios.get(url);
            setPdfFiles(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            setError('Failed to filter PDFs');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        if (!selectedCategory) {
            setError('Please select a category');
            return;
        }

        if (selectedFile.type !== 'application/pdf') {
            setError('Only PDF files are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', selectedFile);
        formData.append('category', selectedCategory);

        try {
            setError(null);
            setSuccess(null);
            const response = await axios.post(`${API_URL}/api/pdfs`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                },
            });

            setSuccess('PDF uploaded successfully!');
            setPdfFiles(prevFiles => [...prevFiles, response.data]);
            setSelectedFile(null);
            setSelectedCategory('');
            setUploadProgress(0);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload PDF');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/pdfs/${id}`);
            setPdfFiles(prevFiles => prevFiles.filter(file => file._id !== id));
            setSuccess('PDF deleted successfully!');
        } catch (err) {
            setError('Failed to delete PDF');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">MUN Resources</h1>
            
            {/* Upload Section */}
            <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">Upload Resource</h2>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="border p-2 rounded flex-grow"
                        />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="border p-2 rounded flex-grow"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || !selectedCategory || uploadProgress > 0}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                        >
                            {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload'}
                        </button>
                    </div>
                    
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Messages */}
            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                    {success}
                </div>
            )}

            {/* Filter Section */}
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Resources Library</h2>
                <select
                    value={filterCategory}
                    onChange={handleFilterChange}
                    className="border p-2 rounded"
                >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* PDF List */}
            <div className="mt-2">
                {!isLoading && pdfFiles.length === 0 ? (
                    <p className="text-gray-500">No resources found in this category.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pdfFiles.map((pdf) => (
                            <div key={pdf._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-medium">{pdf.filename}</h3>
                                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                                            {pdf.category}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(pdf._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete PDF"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 mb-3">
                                    Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}
                                </div>
                                <div className="flex justify-center">
                                    <iframe
                                        src={`${API_URL}/api/pdfs/${pdf._id}/view`}
                                        title={pdf.filename}
                                        className="w-full h-64 border"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div className="mt-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {(pdf.size / 1024).toFixed(1)} KB
                                    </span>
                                    <a
                                        href={`${API_URL}/api/pdfs/${pdf._id}/download`}
                                        download
                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resources;