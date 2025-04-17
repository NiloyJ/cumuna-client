import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const ChangeBanner = () => {
    console.log(API_URL);
    const [bannerUrl, setBannerUrl] = useState('');
    const [currentBanner, setCurrentBanner] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    // Fetch current banner URL on component mount
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch(`${API_URL}/about_stats/banner`);
                if (response.ok) {
                    const data = await response.json();
                    setCurrentBanner(data.url);
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
                setStatus({
                    success: false,
                    message: 'Failed to load current banner'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bannerUrl) return;

        try {
            const response = await fetch(`${API_URL}/about_stats/banner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: bannerUrl }),
            });

            const result = await response.json();
            
            if (response.ok) {
                setCurrentBanner(bannerUrl);
                setBannerUrl('');
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

    if (loading) {
        return <div className="text-center p-4">Loading banner information...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Change Home Banner</h2>
            
            {status && (
                <div className={`mb-4 p-3 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.message}
                </div>
            )}

            {currentBanner && (
                <div className="mb-6">
                    <p className="font-medium mb-2">Current Banner:</p>
                    <img 
                        src={currentBanner} 
                        alt="Current Home Banner" 
                        className="w-full h-auto rounded border border-gray-200"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x200';
                            e.target.className = 'w-full h-auto rounded border border-gray-200 bg-gray-100';
                        }}
                    />
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="bannerUrl" className="block mb-1 font-medium">
                        New Banner URL
                    </label>
                    <input
                        type="url"
                        id="bannerUrl"
                        value={bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/banner-image.jpg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                    Update Banner
                </button>
            </form>
        </div>
    );
};

export default ChangeBanner;