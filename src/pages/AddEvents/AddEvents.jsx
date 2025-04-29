import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';

const AddEvents = () => {
    const [formData, setFormData] = useState({
        bannerUrl: '',
        theme: '',
        duration: '',
        dates: '',
        totalCommittees: 0,
        totalDelegates: 0,
        internationalDelegates: 0,
        committees: [],
        gallery: Array(6).fill(''),
        sponsorPhotos: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        success: false,
        message: ''
    });
    const [hasExistingEvent, setHasExistingEvent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing events when component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_URL}/events/`);
                // Check if response has data with _id field
                if (response.data.data && response.data.data.some(event => event._id)) {
                    setHasExistingEvent(true);
                }
            } catch (error) {
                console.error('Error checking for existing events:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCommitteeChange = (index, field, value) => {
        const updatedCommittees = [...formData.committees];
        if (!updatedCommittees[index]) {
            updatedCommittees[index] = { name: '', awards: [], winners: [] };
        }
        
        if (field === 'awards') {
            updatedCommittees[index][field] = value.split(',').map(award => award.trim());
        } else if (field === 'winners') {
            updatedCommittees[index][field] = value.split(',').map(winner => winner.trim());
        } else {
            updatedCommittees[index][field] = value;
        }
        
        setFormData(prev => ({
            ...prev,
            committees: updatedCommittees
        }));
    };

    const handleGalleryChange = (index, value) => {
        const updatedGallery = [...formData.gallery];
        updatedGallery[index] = value;
        setFormData(prev => ({
            ...prev,
            gallery: updatedGallery
        }));
    };

    const addCommittee = () => {
        setFormData(prev => ({
            ...prev,
            committees: [...prev.committees, { name: '', awards: [], winners: [] }]
        }));
    };

    const handleSponsorPhotoChange = (index, value) => {
        const updatedSponsorPhotos = [...formData.sponsorPhotos];
        updatedSponsorPhotos[index] = value;
        setFormData(prev => ({
            ...prev,
            sponsorPhotos: updatedSponsorPhotos
        }));
    };

    const addSponsorPhoto = () => {
        setFormData(prev => ({
            ...prev,
            sponsorPhotos: [...prev.sponsorPhotos, '']
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (hasExistingEvent) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: '' });

        try {
            const eventData = {
                ...formData,
                totalCommittees: Number(formData.totalCommittees),
                totalDelegates: Number(formData.totalDelegates),
                internationalDelegates: Number(formData.internationalDelegates),
                gallery: formData.gallery.filter(url => url.trim() !== ''),
                committees: formData.committees.map(committee => ({
                    name: committee.name,
                    awards: committee.awards || [],
                    winners: committee.winners || []
                })),
                sponsorPhotos: formData.sponsorPhotos.filter(url => url.trim() !== '')
            };

            const response = await axios.post(`${API_URL}/events`, eventData);
            
            if (response.data.success) {
                setSubmitStatus({
                    success: true,
                    message: 'Event added successfully!'
                });
                setFormData({
                    bannerUrl: '',
                    theme: '',
                    duration: '',
                    dates: '',
                    totalCommittees: 0,
                    totalDelegates: 0,
                    internationalDelegates: 0,
                    committees: [],
                    gallery: Array(6).fill(''),
                    sponsorPhotos: []
                });
                setHasExistingEvent(true);
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: error.response?.data?.message || 'Failed to add event'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Add MUN Conference</h1>
                <p>Checking for existing events...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add MUN Conference</h1>
            
            {submitStatus.message && (
                <div className={`mb-4 p-4 rounded ${
                    submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Banner URL */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Banner URL</label>
                    <input
                        type="text"
                        name="bannerUrl"
                        value={formData.bannerUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        For ImgBB: Use the "Direct link" URL (ends with .jpg, .png, etc.)<br/>
                        For Google Drive: Change the URL from /view?usp=sharing to /preview
                    </p>
                </div>

                {/* Theme */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Theme</label>
                    <input
                        type="text"
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Duration */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Dates */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Dates</label>
                    <input
                        type="text"
                        name="dates"
                        value={formData.dates}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Total Committees */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Total Committees</label>
                    <input
                        type="number"
                        name="totalCommittees"
                        value={formData.totalCommittees}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Total Delegates */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Total Delegates</label>
                    <input
                        type="number"
                        name="totalDelegates"
                        value={formData.totalDelegates}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* International Delegates */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">International Delegates</label>
                    <input
                        type="number"
                        name="internationalDelegates"
                        value={formData.internationalDelegates}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Committees */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Committees</label>
                    {formData.committees.map((committee, index) => (
                        <div key={index} className="mt-4 p-4 border border-gray-200 rounded-md">
                            <h3 className="font-medium text-lg mb-2">Committee {index + 1}</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Committee Name</label>
                                    <input
                                        type="text"
                                        placeholder="Committee Name"
                                        value={committee.name}
                                        onChange={(e) => handleCommitteeChange(index, 'name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Awards</label>
                                    <input
                                        type="text"
                                        placeholder="Awards (comma separated)"
                                        value={committee.awards ? committee.awards.join(', ') : ''}
                                        onChange={(e) => handleCommitteeChange(index, 'awards', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Enter awards separated by commas (e.g., Best Delegate, Outstanding Delegate)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Winners</label>
                                    <input
                                        type="text"
                                        placeholder="Winners (comma separated)"
                                        value={committee.winners ? committee.winners.join(', ') : ''}
                                        onChange={(e) => handleCommitteeChange(index, 'winners', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Enter winners separated by commas (e.g., John Doe, Jane Smith)</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCommittee}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Committee
                    </button>
                </div>

                {/* Sponsor Photos */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Sponsor Photos</label>
                    {formData.sponsorPhotos.map((url, index) => (
                        <div key={index} className="mt-2">
                            <input
                                type="text"
                                placeholder={`Sponsor photo URL ${index + 1}`}
                                value={url}
                                onChange={(e) => handleSponsorPhotoChange(index, e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Use direct image URLs (e.g., https://i.ibb.co/xxxxx/image.jpg)
                            </p>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSponsorPhoto}
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Sponsor Photo
                    </button>
                </div>

                {/* Gallery Images */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Gallery Images (up to 6)</label>
                    {formData.gallery.map((url, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={`Gallery image URL ${index + 1}`}
                                value={url}
                                onChange={(e) => handleGalleryChange(index, e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Use direct image URLs (e.g., https://i.ibb.co/xxxxx/image.jpg)
                            </p>
                        </div>
                    ))}
                </div>

                {/* Submit Button Section */}
                <div className="flex flex-col items-end">
                    {hasExistingEvent ? (
                        <div className="w-full p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                            <p className="font-bold">Event Already Exists</p>
                            <p>Please delete the current event before creating a new one.</p>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className={`px-6 py-2 text-white rounded ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-600'
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Conference'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddEvents;

