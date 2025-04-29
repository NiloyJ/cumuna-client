

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const CommitteeManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: 'Advisor',
    profileUrl: '',
    advisorMessage: '',
    awards: ''
  });
  const [members, setMembers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const designations = ['Advisor', 'Trustee', 'Governing Board', 'Founder'];

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/committee`);
      setMembers(response.data);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const memberData = { ...formData };
      if (memberData.designation !== 'Advisor' && memberData.awards) {
        memberData.awards = memberData.awards.split(',').map(award => award.trim());
      } else {
        memberData.awards = [];
      }

      const response = await axios.post(`${API_URL}/committee`, memberData);
      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          name: '',
          designation: 'Advisor',
          profileUrl: '',
          advisorMessage: '',
          awards: ''
        });
        fetchMembers();
      }
    } catch (err) {
      setError(err.response?.data || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/committee/${id}`);
      fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Committee Member Management</h2>

      {/* Form Section */}
      {user && <div className="mb-8">
        {success && (
          <div className="alert alert-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Member added successfully!</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{typeof error === 'string' ? error : 'An error occurred'}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Designation</span>
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  {designations.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              {formData.designation === 'Advisor' ? (
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Advisor Message</span>
                  </label>
                  <textarea
                    name="advisorMessage"
                    value={formData.advisorMessage}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    required={formData.designation === 'Advisor'}
                  />
                </div>
              ) : (
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Awards (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="awards"
                    value={formData.awards}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Best Delegate 2x, Outstanding Delegate 1x"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Profile Picture URL</span>
            </label>
            <input
              type="url"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://example.com/profile.jpg"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full mt-6 ${submitting ? 'loading' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Add Member'}
          </button>
        </form>
      </div> }

      {/* Members Section */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Committee Members</h3>
        {members.length === 0 ? (
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No members added yet</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <div key={member._id} className="card bg-white shadow-lg w-full h-[520px]">
                {/* Image Section */}
                <div className="h-3/5 overflow-hidden">
                  <img 
                    src={member.profileUrl || 'https://via.placeholder.com/600x400'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Section with centered text */}
                <div className="p-4 h-2/5 flex flex-col text-center">
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                    <div className="badge badge-primary text-white mb-2">
                      {member.designation}
                    </div>

                    {member.designation === 'Advisor' && member.advisorMessage ? (
                      <p className="text-sm text-gray-600 line-clamp-2">"{member.advisorMessage}"</p>
                    ) : member.awards && member.awards.length > 0 ? (
                      <div className="space-y-1">
                        {member.awards.map((award, index) => (
                          <div key={index} className="flex items-center justify-center">
                            <span className="mr-2">✅</span>
                            <span className="text-sm">{award}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="btn btn-error btn-sm mt-2 self-center"
                  >
                    Delete
                  </button>
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

