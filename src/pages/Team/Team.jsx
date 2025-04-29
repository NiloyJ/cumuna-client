

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
    worksAt: '',
    awards: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });
  const [members, setMembers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
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
    
    if (name.startsWith('socialMedia.')) {
      const socialMediaField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialMediaField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const memberData = { 
        ...formData,
        // Clean social media URLs
        socialMedia: {
          facebook: formData.socialMedia.facebook.trim(),
          instagram: formData.socialMedia.instagram.trim(),
          linkedin: formData.socialMedia.linkedin.trim()
        }
      };
      
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
          worksAt: '',
          awards: '',
          socialMedia: {
            facebook: '',
            instagram: '',
            linkedin: ''
          }
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
      {user && (
        <div className="mb-8">
          {success && (
            <div className="alert alert-success mb-4">Member added successfully!</div>
          )}
          {error && (
            <div className="alert alert-error mb-4">{typeof error === 'string' ? error : 'An error occurred'}</div>
          )}

          <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
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

                {/* Social Media Fields */}
                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold">Social Media (Optional)</h3>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Facebook URL</span>
                    </label>
                    <input
                      type="url"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="https://facebook.com/username"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Instagram URL</span>
                    </label>
                    <input
                      type="url"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">LinkedIn URL</span>
                    </label>
                    <input
                      type="url"
                      name="socialMedia.linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {formData.designation === 'Advisor' ? (
                  <>
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
                        required
                      />
                    </div>
                    <div className="form-control mb-4">
                      <label className="label">
                        <span className="label-text">Works At</span>
                      </label>
                      <input
                        type="text"
                        name="worksAt"
                        value={formData.worksAt}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </>
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
        </div>
      )}

      {/* Members Section */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Committee Members</h3>
        {members.length === 0 ? (
          <div className="alert alert-info">No members added yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <div key={member._id} className="card bg-white shadow-lg w-full h-[677px] flex flex-col">
                {/* Image Section */}
                <div className="h-3/5 overflow-hidden">
                  <img
                    src={member.profileUrl || 'https://via.placeholder.com/600x400'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="p-4 h-2/5 flex flex-col justify-center items-center text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-3xl">{member.name}</h1>
                  <div className="text-base md:text-lg px-4 py-2 bg-primary text-white mt-4 mb-4">{member.designation}</div>

                  {member.designation === 'Advisor' ? (
                    <>
                      {member.worksAt && (
                        <p className="text-base font-medium px-2">
                          <span className="font-semibold"></span> {member.worksAt}
                        </p>
                      )}
                    </>
                  ) : member.awards && member.awards.length > 0 ? (
                    <div className="space-y-1">
                      {member.awards.map((award, index) => (
                        <div key={index} className="flex justify-center items-center">
                          <span className="mr-2">✅</span>
                          <span className="text-sm">{award}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Social Media Icons */}
                  {(member.socialMedia?.facebook || member.socialMedia?.instagram || member.socialMedia?.linkedin) && (
                    <div className="flex space-x-3 mt-3">
                      {member.socialMedia.facebook && (
                        <a href={member.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                          </svg>
                        </a>
                      )}
                      {member.socialMedia.instagram && (
                        <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                          <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        </a>
                      )}
                      {member.socialMedia.linkedin && (
                        <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}

                  {user && (
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="btn btn-error btn-sm mt-2"
                    >
                      Delete
                    </button>
                  )}
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
