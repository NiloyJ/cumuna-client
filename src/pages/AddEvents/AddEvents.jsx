

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddEvents = () => {
//     const [formData, setFormData] = useState({
//         bannerUrl: '',
//         theme: '',
//         duration: '',
//         dates: '',
//         totalCommittees: 0,
//         totalDelegates: 0,
//         internationalDelegates: 0,
//         committees: [],
//         gallery: Array(6).fill('')
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitError, setSubmitError] = useState('');
//     const [submitSuccess, setSubmitSuccess] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleCommitteeChange = (index, field, value) => {
//         const updatedCommittees = [...formData.committees];
//         if (!updatedCommittees[index]) {
//             updatedCommittees[index] = { name: '', awards: [] };
//         }
        
//         if (field === 'awards') {
//             updatedCommittees[index][field] = value.split(',').map(award => award.trim());
//         } else {
//             updatedCommittees[index][field] = value;
//         }
        
//         setFormData(prev => ({
//             ...prev,
//             committees: updatedCommittees
//         }));
//     };

//     const handleGalleryChange = (index, value) => {
//         const updatedGallery = [...formData.gallery];
//         updatedGallery[index] = value;
//         setFormData(prev => ({
//             ...prev,
//             gallery: updatedGallery
//         }));
//     };

//     const addCommittee = () => {
//         setFormData(prev => ({
//             ...prev,
//             committees: [...prev.committees, { name: '', awards: [] }]
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setSubmitError('');
//         setSubmitSuccess(false);

//         try {
//             // Prepare the data for submission
//             const eventData = {
//                 ...formData,
//                 totalCommittees: Number(formData.totalCommittees),
//                 totalDelegates: Number(formData.totalDelegates),
//                 internationalDelegates: Number(formData.internationalDelegates),
//                 gallery: formData.gallery.filter(url => url.trim() !== ''),
//                 committees: formData.committees.map(committee => ({
//                     name: committee.name,
//                     awards: committee.awards || []
//                 }))
//             };

//             // Send data to server
//             const response = await axios.post('/events', eventData);
            
//             if (response.data.success) {
//                 setSubmitSuccess(true);
//                 // Reset form after successful submission
//                 setFormData({
//                     bannerUrl: '',
//                     theme: '',
//                     duration: '',
//                     dates: '',
//                     totalCommittees: 0,
//                     totalDelegates: 0,
//                     internationalDelegates: 0,
//                     committees: [],
//                     gallery: Array(6).fill('')
//                 });
//             } else {
//                 setSubmitError(response.data.message || 'Failed to add event');
//             }
//         } catch (error) {
//             console.error('Error submitting event:', error);
//             setSubmitError(error.response?.data?.message || error.message || 'Failed to add event');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6">Add MUN Conference</h1>
            
//             {submitSuccess && (
//                 <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
//                     Event added successfully!
//                 </div>
//             )}
            
//             {submitError && (
//                 <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//                     {submitError}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Banner URL */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Banner URL</label>
//                     <input
//                         type="url"
//                         name="bannerUrl"
//                         value={formData.bannerUrl}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                         required
//                     />
//                 </div>

//                 {/* Theme */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Conference Theme</label>
//                     <input
//                         type="text"
//                         name="theme"
//                         value={formData.theme}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                         required
//                     />
//                 </div>

//                 {/* Duration and Dates */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Duration (e.g., 3 days)</label>
//                         <input
//                             type="text"
//                             name="duration"
//                             value={formData.duration}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Dates (e.g., dd/mm/yyyy - dd/mm/yyyy)</label>
//                         <input
//                             type="text"
//                             name="dates"
//                             value={formData.dates}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Delegates Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Total Committees</label>
//                         <input
//                             type="number"
//                             name="totalCommittees"
//                             value={formData.totalCommittees}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                             required
//                             min="0"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Total Delegates</label>
//                         <input
//                             type="number"
//                             name="totalDelegates"
//                             value={formData.totalDelegates}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                             required
//                             min="0"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">International Delegates</label>
//                         <input
//                             type="number"
//                             name="internationalDelegates"
//                             value={formData.internationalDelegates}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                             required
//                             min="0"
//                             max={formData.totalDelegates}
//                         />
//                     </div>
//                 </div>

//                 {/* Committees Section */}
//                 <div className="border-t pt-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-medium">Committees</h2>
//                         <button
//                             type="button"
//                             onClick={addCommittee}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         >
//                             Add Committee
//                         </button>
//                     </div>

//                     {formData.committees.map((committee, index) => (
//                         <div key={index} className="mb-4 p-4 border rounded">
//                             <div className="mb-3">
//                                 <label className="block text-sm font-medium text-gray-700">Committee Name</label>
//                                 <input
//                                     type="text"
//                                     value={committee.name || ''}
//                                     onChange={(e) => handleCommitteeChange(index, 'name', e.target.value)}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Award Winners (comma separated)</label>
//                                 <textarea
//                                     value={Array.isArray(committee.awards) ? committee.awards.join(', ') : ''}
//                                     onChange={(e) => handleCommitteeChange(index, 'awards', e.target.value)}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                                     rows="3"
//                                     placeholder="Best Delegate, Outstanding Diplomacy, Honorable Mention"
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Conference Gallery */}
//                 <div className="border-t pt-4">
//                     <h2 className="text-lg font-medium mb-4">Conference Gallery (6 images)</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {formData.gallery.map((url, index) => (
//                             <div key={index}>
//                                 <label className="block text-sm font-medium text-gray-700">Image {index + 1} URL</label>
//                                 <input
//                                     type="url"
//                                     value={url}
//                                     onChange={(e) => handleGalleryChange(index, e.target.value)}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end">
//                     <button
//                         type="submit"
//                         className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? 'Submitting...' : 'Submit Conference'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddEvents;

import React, { useState } from 'react';
import axios from 'axios';

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
        gallery: Array(6).fill('')
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        success: false,
        message: ''
    });

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
            updatedCommittees[index] = { name: '', awards: [] };
        }
        
        if (field === 'awards') {
            updatedCommittees[index][field] = value.split(',').map(award => award.trim());
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
            committees: [...prev.committees, { name: '', awards: [] }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: '' });

        try {
            // Prepare the data for submission
            const eventData = {
                ...formData,
                totalCommittees: Number(formData.totalCommittees),
                totalDelegates: Number(formData.totalDelegates),
                internationalDelegates: Number(formData.internationalDelegates),
                gallery: formData.gallery.filter(url => url.trim() !== ''),
                committees: formData.committees.map(committee => ({
                    name: committee.name,
                    awards: committee.awards || []
                }))
            };

            // Send data to server
            const response = await axios.post('http://localhost:5000/events', eventData);
            
            if (response.data.success) {
                setSubmitStatus({
                    success: true,
                    message: 'Event added successfully!'
                });
                // Reset form after successful submission
                setFormData({
                    bannerUrl: '',
                    theme: '',
                    duration: '',
                    dates: '',
                    totalCommittees: 0,
                    totalDelegates: 0,
                    internationalDelegates: 0,
                    committees: [],
                    gallery: Array(6).fill('')
                });
            } else {
                setSubmitStatus({
                    success: false,
                    message: response.data.message || 'Failed to add event'
                });
            }
        } catch (error) {
            console.error('Error submitting event:', error);
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Failed to connect to server';
            setSubmitStatus({
                success: false,
                message: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add MUN Conference</h1>
            
            {/* Status Message */}
            {submitStatus.message && (
                <div className={`mb-4 p-4 rounded ${
                    submitStatus.success 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                }`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Banner URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Banner URL</label>
                    <input
                        type="url"
                        name="bannerUrl"
                        value={formData.bannerUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                    />
                </div>

                {/* Theme */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Conference Theme</label>
                    <input
                        type="text"
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                    />
                </div>

                {/* Duration and Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (e.g., 3 days)</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dates (e.g., dd/mm/yyyy - dd/mm/yyyy)</label>
                        <input
                            type="text"
                            name="dates"
                            value={formData.dates}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* Delegates Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Committees</label>
                        <input
                            type="number"
                            name="totalCommittees"
                            value={formData.totalCommittees}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Delegates</label>
                        <input
                            type="number"
                            name="totalDelegates"
                            value={formData.totalDelegates}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">International Delegates</label>
                        <input
                            type="number"
                            name="internationalDelegates"
                            value={formData.internationalDelegates}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                            min="0"
                            max={formData.totalDelegates}
                        />
                    </div>
                </div>

                {/* Committees Section */}
                <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Committees</h2>
                        <button
                            type="button"
                            onClick={addCommittee}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Committee
                        </button>
                    </div>

                    {formData.committees.map((committee, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">Committee Name</label>
                                <input
                                    type="text"
                                    value={committee.name || ''}
                                    onChange={(e) => handleCommitteeChange(index, 'name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Award Winners (comma separated)</label>
                                <textarea
                                    value={Array.isArray(committee.awards) ? committee.awards.join(', ') : ''}
                                    onChange={(e) => handleCommitteeChange(index, 'awards', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                    rows="3"
                                    placeholder="Best Delegate, Outstanding Diplomacy, Honorable Mention"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Conference Gallery */}
                <div className="border-t pt-4">
                    <h2 className="text-lg font-medium mb-4">Conference Gallery (6 images)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.gallery.map((url, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">Image {index + 1} URL</label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleGalleryChange(index, e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={`px-6 py-2 text-white rounded ${
                            isSubmitting 
                                ? 'bg-gray-500 cursor-not-allowed' 
                                : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Conference'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEvents;