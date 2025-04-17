import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const AddPresidentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    message: '',
    imageUrl: ''
  });
  
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [existingPresident, setExistingPresident] = useState(null);
  const [loadingExisting, setLoadingExisting] = useState(true);

  console.log(API_URL, 'asd')

  // Check for existing president on component mount
  useEffect(() => {
    const fetchPresidents = async () => {
      try {
        const response = await fetch(`${API_URL}/president`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setExistingPresident(data[0]); // Store the first president found
          }
        }
      } catch (error) {
        console.error('Error checking existing president:', error);
      } finally {
        setLoadingExisting(false);
      }
    };

    fetchPresidents();
  }, []);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Check if president already exists
    if (existingPresident) {
      setSubmitStatus({
        success: false,
        message: 'A president already exists. Only one president can be added.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${API_URL}/president`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmittedData(formData);
        setExistingPresident(formData); // Set as existing president after successful submission
        setSubmitStatus({
          success: true,
          message: 'President added successfully!'
        });
        // Reset form
        setFormData({
          name: '',
          department: '',
          message: '',
          imageUrl: ''
        });
      } else {
        throw new Error(result.message || 'Failed to add president');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingExisting) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Checking for existing president...</p>
      </div>
    );
  }

  // If president exists, show message instead of form
  if (existingPresident) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Add MUN Club President</h2>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">A president already exists in the system.</p>
          <p className="text-yellow-700 mt-2">Current President: <span className="font-semibold">{existingPresident.name}</span></p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Existing President Details:</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Department:</span> Department of {existingPresident.department}</p>
            <p><span className="font-medium">Message:</span> {existingPresident.message}</p>
            {existingPresident.imageUrl && (
              <div>
                <p className="font-medium">Image:</p>
                <img 
                  src={existingPresident.imageUrl} 
                  alt="Current President" 
                  className="h-32 object-cover rounded-lg border border-purple-200 mt-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Add MUN Club President</h2>
      
      {submitStatus && (
        <div className={`mb-4 p-3 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Image Upload Field */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            President's Photo URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Paste image URL here"
            required
          />
          {formData.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <img 
                src={formData.imageUrl} 
                alt="Preview" 
                className="h-32 object-cover rounded-lg border border-purple-200"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                }}
              />
            </div>
          )}
        </div>

        {/* President Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            President's Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Department Field */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 py-2 border border-r-0 border-purple-300 bg-gray-50 text-gray-500 rounded-l-lg">
              Department of
            </span>
            <input
              type="text"
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-purple-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
              placeholder="e.g. Computer Science"
              required
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Letter to the Public
          </label>
          <textarea
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-md ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Adding...' : 'Add President'}
        </button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Submitted Data:</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {submittedData.name}</p>
            <p><span className="font-medium">Department:</span> Department of {submittedData.department}</p>
            <p><span className="font-medium">Message:</span> {submittedData.message}</p>
            {submittedData.imageUrl && (
              <div>
                <p className="font-medium">Image URL:</p>
                <img 
                  src={submittedData.imageUrl} 
                  alt="Submitted" 
                  className="h-32 object-cover rounded-lg border border-purple-200 mt-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPresidentForm;