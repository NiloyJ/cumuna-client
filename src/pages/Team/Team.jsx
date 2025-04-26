

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const CommitteeManager = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    designation: 'Advisor',
    awards: '',
    imageUrl: '',
    message: '' // New field for advisor message
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const designationOptions = [
    'Advisor',
    'Founders',
    'Trustees',
    'Previous_Governing_Board',
    'Associate'
  ];

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const response = await fetch(`${API_URL}/committee`);
        if (response.ok) {
          const data = await response.json();
          setCommitteeMembers(data);
        }
      } catch (error) {
        console.error('Error fetching committee:', error);
        setStatus({
          success: false,
          message: 'Failed to load committee members'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCommittee();
  }, []);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        awards: formData.awards.split(',').map(award => award.trim())
      };

      // Only include message if designation is Advisor
      if (formData.designation !== 'Advisor') {
        delete payload.message;
      }

      const response = await fetch(`${API_URL}/committee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (response.ok) {
        setCommitteeMembers([...committeeMembers, result]);
        setFormData({
          name: '',
          designation: 'Advisor',
          awards: '',
          imageUrl: '',
          message: ''
        });
        setStatus({
          success: true,
          message: 'Committee member added successfully!'
        });
      } else {
        throw new Error(result.message || 'Failed to add member');
      }
    } catch (error) {
      setStatus({
        success: false,
        message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      const response = await fetch(`${API_URL}/committee/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        setCommitteeMembers(committeeMembers.filter(member => member._id !== id));
        setStatus({
          success: true,
          message: 'Member deleted successfully'
        });
      } else {
        throw new Error('Failed to delete member');
      }
    } catch (error) {
      setStatus({
        success: false,
        message: error.message
      });
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading committee members...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {user && (
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Committee Management (Only admin access)</h1>
      )}
      
      {status && (
        <div className={`mb-4 p-3 rounded text-center ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}

      {user && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Committee Member</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
                <select
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {designationOptions.map(option => (
                    <option key={option} value={option}>
                      {option.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message field (only shown for Advisor) */}
            {formData.designation === 'Advisor' && (
              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Advisor Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  placeholder="Enter a message for this advisor..."
                />
              </div>
            )}

            <div>
              <label htmlFor="awards" className="block mb-1 font-medium text-gray-700">Awards (comma separated)</label>
              <input
                type="text"
                id="awards"
                value={formData.awards}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Award 1, Award 2, Award 3"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block mb-1 font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? 'Adding...' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
          {user ? 'Current Committee Members' : 'Our Team'}
        </h2>
        
        {committeeMembers.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No committee members found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((member, index) => {
              const borderColors = [
                'border-blue-500',
                'border-green-500',
                'border-purple-500',
                'border-yellow-500',
                'border-pink-500',
                'border-indigo-500'
              ];
              const borderColor = borderColors[index % borderColors.length];
              
              return (
                <div 
                  key={member._id} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${borderColor} hover:shadow-lg transition duration-300 transform hover:-translate-y-1`}
                >
                  <div className="p-5">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <img 
                          src={member.imageUrl} 
                          alt={member.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150';
                            e.target.className = 'w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-gray-200';
                          }}
                        />
                        <div className={`absolute -inset-2 rounded-full ${borderColor.replace('border', 'bg')} opacity-20`}></div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-blue-600 font-medium">
                          {member.designation.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Display advisor message if exists */}
                    {member.designation === 'Advisor' && member.message && (
                      <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-800 mb-1">Advisor Message</h4>
                        <p className="text-sm text-gray-700">{member.message}</p>
                      </div>
                    )}

                    {member.awards && member.awards.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Awards & Honors</h4>
                        <ul className="space-y-1">
                          {member.awards.map((award, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600">{award}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {user && (
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center transition duration-300"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove Member
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteeManager;