import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const CommitteeManager = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    awards: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing committee members
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
      const response = await fetch(`${API_URL}/committee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          awards: formData.awards.split(',').map(award => award.trim())
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setCommitteeMembers([...committeeMembers, result]);
        setFormData({
          name: '',
          designation: '',
          awards: '',
          imageUrl: ''
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Committee Management</h1>
      
      {status && (
        <div className={`mb-4 p-3 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Committee Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="designation" className="block mb-1">Designation</label>
            <input
              type="text"
              id="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="awards" className="block mb-1">Awards (comma separated)</label>
            <input
              type="text"
              id="awards"
              value={formData.awards}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Current Committee Members</h2>
        {committeeMembers.length === 0 ? (
          <p>No committee members found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {committeeMembers.map(member => (
              <div key={member._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-4">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-gray-600">{member.designation}</p>
                    {member.awards && member.awards.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Awards:</p>
                        <ul className="text-sm text-gray-600">
                          {member.awards.map((award, i) => (
                            <li key={i}>• {award}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="mt-2 text-red-500 text-sm hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteeManager;