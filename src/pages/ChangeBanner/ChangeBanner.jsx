import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const ChangeBanner = () => {
    const [banners, setBanners] = useState([]);
    const [newBannerUrl, setNewBannerUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editUrl, setEditUrl] = useState('');

    // Fetch current banners on component mount
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${API_URL}/about_stats/banners`);
                if (response.ok) {
                    const data = await response.json();
                    // Sort banners by their order
                    const sortedBanners = [...data].sort((a, b) => a.order - b.order);
                    setBanners(sortedBanners);
                } else {
                    throw new Error('Failed to fetch banners');
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setStatus({
                    success: false,
                    message: 'Failed to load current banners'
                });
                // Set default banners if API fails
                setBanners([
                    { url: 'https://i.postimg.cc/PqQrYR6F/cumun-1.jpg', order: 1 },
                    { url: 'https://via.placeholder.com/800x200?text=Banner+2', order: 2 },
                    { url: 'https://via.placeholder.com/800x200?text=Banner+3', order: 3 }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const handleAddBanner = async (e) => {
        e.preventDefault();
        if (!newBannerUrl) return;
    
        try {
            // Create new banners array with the new banner
            const updatedBanners = [...banners];
            if (updatedBanners.length >= 3) {
                // Replace the last banner if we already have 3
                updatedBanners[2] = { url: newBannerUrl, order: 3 };
            } else {
                // Add new banner with appropriate order
                updatedBanners.push({ url: newBannerUrl, order: updatedBanners.length + 1 });
            }

            const response = await fetch(`${API_URL}/about_stats/banners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ banners: updatedBanners }),
            });

            const result = await response.json();

            if (response.ok) {
                setBanners(updatedBanners);
                setNewBannerUrl('');
                setStatus({
                    success: true,
                    message: 'Banners updated successfully!'
                });
            } else {
                throw new Error(result.message || 'Failed to update banners');
            }
        } catch (error) {
            setStatus({
                success: false,
                message: error.message
            });
        }
    };

    const handleUpdateBanner = async (index) => {
        if (!editUrl) return;
    
        try {
            const updatedBanners = [...banners];
            updatedBanners[index] = { ...updatedBanners[index], url: editUrl };

            const response = await fetch(`${API_URL}/about_stats/banners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ banners: updatedBanners }),
            });

            const result = await response.json();

            if (response.ok) {
                setBanners(updatedBanners);
                setEditingIndex(null);
                setEditUrl('');
                setStatus({
                    success: true,
                    message: 'Banner updated successfully!'
                });
            } else {
                throw new Error(result.message || 'Failed to update banner');
            }
        } catch (error) {
            setStatus({
                success: false,
                message: error.message
            });
        }
    };

    const handleDeleteBanner = async (index) => {
        try {
            const updatedBanners = [...banners];
            updatedBanners.splice(index, 1);
            
            // Reassign order numbers
            const orderedBanners = updatedBanners.map((banner, i) => ({
                ...banner,
                order: i + 1
            }));

            const response = await fetch(`${API_URL}/about_stats/banners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ banners: orderedBanners }),
            });

            const result = await response.json();

            if (response.ok) {
                setBanners(orderedBanners);
                setStatus({
                    success: true,
                    message: 'Banner deleted successfully!'
                });
            } else {
                throw new Error(result.message || 'Failed to delete banner');
            }
        } catch (error) {
            setStatus({
                success: false,
                message: error.message
            });
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading banner information...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Slider Banners</h2>
            
            {status && (
                <div className={`mb-4 p-3 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.message}
                </div>
            )}

            <div className="mb-6">
                <p className="font-medium mb-2">Current Banners:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {banners.map((banner, index) => (
                        <div key={index} className="border rounded-lg p-3 relative">
                            <img 
                                src={banner.url} 
                                alt={`Banner ${index + 1}`}
                                className="w-full h-40 object-cover rounded border border-gray-200 mb-2"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/800x200';
                                    e.target.className = 'w-full h-40 object-cover rounded border border-gray-200 mb-2 bg-gray-100';
                                }}
                            />
                            <div className="text-sm text-gray-600 mb-2">Position: {banner.order}</div>
                            
                            {editingIndex === index ? (
                                <div className="space-y-2">
                                    <input
                                        type="url"
                                        value={editUrl}
                                        onChange={(e) => setEditUrl(e.target.value)}
                                        className="w-full p-2 border rounded text-sm"
                                        placeholder="Enter new image URL"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleUpdateBanner(index)}
                                            className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingIndex(null);
                                                setEditUrl('');
                                            }}
                                            className="bg-gray-200 text-gray-800 py-1 px-3 rounded text-sm hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingIndex(index);
                                            setEditUrl(banner.url);
                                        }}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded text-sm hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBanner(index)}
                                        className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleAddBanner} className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Add or Replace Banner</h3>
                <div>
                    <label htmlFor="newBannerUrl" className="block mb-1 font-medium">
                        Banner Image URL
                    </label>
                    <input
                        type="url"
                        id="newBannerUrl"
                        value={newBannerUrl}
                        onChange={(e) => setNewBannerUrl(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/banner-image.jpg"
                        required
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                    >
                        {banners.length >= 3 ? 'Replace Last Banner' : 'Add Banner'}
                    </button>
                    <div className="text-sm text-gray-600">
                        {banners.length >= 3 ? 
                            'You have reached the maximum of 3 banners. Adding a new one will replace the last banner.' : 
                            `${3 - banners.length} slots remaining`}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangeBanner;