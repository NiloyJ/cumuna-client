
// // import React, { useState, useEffect, useContext } from 'react';
// // import { API_URL } from '../../config/config';
// // import AuthContext from '../../context/AuthContext/AuthContext';

// // const CommitteeManager = () => {
// //   const [committeeMembers, setCommitteeMembers] = useState([]);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     designation: 'Advisor',
// //     awards: '',
// //     imageUrl: '',
// //     message: ''
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [status, setStatus] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeFilter, setActiveFilter] = useState('All');
// //   const { user } = useContext(AuthContext);

// //   const designationOrder = [
// //     'Advisor',
// //     'Founders',
// //     'Trustees',
// //     'Associate',
// //     'Previous_Governing_Board'
// //   ];

// //   const designationOptions = [
// //     'Advisor',
// //     'Founders',
// //     'Trustees',
// //     'Previous_Governing_Board',
// //     'Associate'
// //   ];

// //   useEffect(() => {
// //     const fetchCommittee = async () => {
// //       try {
// //         const response = await fetch(`${API_URL}/committee`);
// //         if (response.ok) {
// //           const data = await response.json();
// //           setCommitteeMembers(data);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching committee:', error);
// //         setStatus({
// //           success: false,
// //           message: 'Failed to load committee members'
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCommittee();
// //   }, []);

// //   const handleChange = e => {
// //     const { id, value } = e.target;
// //     setFormData(prev => ({ ...prev, [id]: value }));
// //   };

// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
    
// //     try {
// //       const payload = {
// //         ...formData,
// //         awards: formData.awards.split(',').map(award => award.trim())
// //       };

// //       if (formData.designation !== 'Advisor') {
// //         delete payload.message;
// //       }

// //       const response = await fetch(`${API_URL}/committee`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${user.token}`
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       const result = await response.json();
      
// //       if (response.ok) {
// //         setCommitteeMembers([...committeeMembers, result]);
// //         setFormData({
// //           name: '',
// //           designation: 'Advisor',
// //           awards: '',
// //           imageUrl: '',
// //           message: ''
// //         });
// //         setStatus({
// //           success: true,
// //           message: 'Committee member added successfully!'
// //         });
// //       } else {
// //         throw new Error(result.message || 'Failed to add member');
// //       }
// //     } catch (error) {
// //       setStatus({
// //         success: false,
// //         message: error.message
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this member?')) return;

// //     try {
// //       const response = await fetch(`${API_URL}/committee/${id}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Authorization': `Bearer ${user.token}`
// //         }
// //       });

// //       if (response.ok) {
// //         setCommitteeMembers(committeeMembers.filter(member => member._id !== id));
// //         setStatus({
// //           success: true,
// //           message: 'Member deleted successfully'
// //         });
// //       } else {
// //         throw new Error('Failed to delete member');
// //       }
// //     } catch (error) {
// //       setStatus({
// //         success: false,
// //         message: error.message
// //       });
// //     }
// //   };

// //   // Group members by designation
// //   const groupedMembers = committeeMembers.reduce((acc, member) => {
// //     const designation = member.designation;
// //     if (!acc[designation]) {
// //       acc[designation] = [];
// //     }
// //     acc[designation].push(member);
// //     return acc;
// //   }, {});

// //   // Filter members based on active filter
// //   const filteredMembers = activeFilter === 'All' 
// //     ? committeeMembers 
// //     : committeeMembers.filter(member => member.designation === activeFilter);

// //   if (loading) {
// //     return <div className="text-center p-4">Loading committee members...</div>;
// //   }

// //   const renderMemberCard = (member, index) => {
// //     const borderColors = [
// //       'border-blue-500',
// //       'border-green-500',
// //       'border-purple-500',
// //       'border-yellow-500',
// //       'border-pink-500',
// //       'border-indigo-500'
// //     ];
// //     const borderColor = borderColors[index % borderColors.length];
    
// //     return (
// //       <div 
// //         key={member._id} 
// //         className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${borderColor} hover:shadow-lg transition duration-300 transform hover:-translate-y-1`}
// //       >
// //         <div className="p-5">
// //           <div className="flex flex-col items-center">
// //             <div className="relative mb-4">
// //               <img 
// //                 src={member.imageUrl} 
// //                 alt={member.name}
// //                 className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
// //                 onError={(e) => {
// //                   e.target.src = 'https://via.placeholder.com/150';
// //                   e.target.className = 'w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-gray-200';
// //                 }}
// //               />
// //               <div className={`absolute -inset-2 rounded-full ${borderColor.replace('border', 'bg')} opacity-20`}></div>
// //             </div>
// //             <div className="text-center">
// //               <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
// //               <p className="text-blue-600 font-medium">
// //                 {member.designation.replace(/_/g, ' ')}
// //               </p>
// //             </div>
// //           </div>

// //           {member.designation === 'Advisor' && member.message && (
// //             <div className="mt-4 bg-blue-50 p-3 rounded-lg">
// //               <h4 className="text-sm font-semibold text-blue-800 mb-1">Advisor Message</h4>
// //               <p className="text-sm text-gray-700">{member.message}</p>
// //             </div>
// //           )}

// //           {member.awards && member.awards.length > 0 && (
// //             <div className="mt-4 pt-4 border-t border-gray-100">
// //               <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Awards & Honors</h4>
// //               <ul className="space-y-1">
// //                 {member.awards.map((award, i) => (
// //                   <li key={i} className="flex items-start">
// //                     <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                     </svg>
// //                     <span className="text-gray-600">{award}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}

// //           {user && (
// //             <div className="mt-6 flex justify-center">
// //               <button
// //                 onClick={() => handleDelete(member._id)}
// //                 className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center transition duration-300"
// //               >
// //                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //                 </svg>
// //                 Remove Member
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto p-4">
// //       {user && (
// //         <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Committee Management</h1>
// //       )}
      
// //       {status && (
// //         <div className={`mb-4 p-3 rounded text-center ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
// //           {status.message}
// //         </div>
// //       )}

// //       {user && (
// //         <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-blue-100">
// //           <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Committee Member</h2>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
// //                 <input
// //                   type="text"
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
// //                 <select
// //                   id="designation"
// //                   value={formData.designation}
// //                   onChange={handleChange}
// //                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   required
// //                 >
// //                   {designationOptions.map(option => (
// //                     <option key={option} value={option}>
// //                       {option.replace(/_/g, ' ')}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             {formData.designation === 'Advisor' && (
// //               <div>
// //                 <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Advisor Message</label>
// //                 <textarea
// //                   id="message"
// //                   value={formData.message}
// //                   onChange={handleChange}
// //                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
// //                   placeholder="Enter a message for this advisor..."
// //                 />
// //               </div>
// //             )}

// //             <div>
// //               <label htmlFor="awards" className="block mb-1 font-medium text-gray-700">Awards (comma separated)</label>
// //               <input
// //                 type="text"
// //                 id="awards"
// //                 value={formData.awards}
// //                 onChange={handleChange}
// //                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Award 1, Award 2, Award 3"
// //               />
// //             </div>

// //             <div>
// //               <label htmlFor="imageUrl" className="block mb-1 font-medium text-gray-700">Image URL</label>
// //               <input
// //                 type="url"
// //                 id="imageUrl"
// //                 value={formData.imageUrl}
// //                 onChange={handleChange}
// //                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 required
// //                 placeholder="https://example.com/image.jpg"
// //               />
// //             </div>

// //             <div className="flex justify-end">
// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
// //               >
// //                 {isSubmitting ? 'Adding...' : 'Add Member'}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}

// //       <div>
// //         <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
// //           {user ? 'Current Committee Members' : 'Our Team'}
// //         </h2>
        
// //         {/* Filter Controls */}
// //         <div className="flex flex-wrap gap-2 mb-8 justify-center">
// //           <button
// //             onClick={() => setActiveFilter('All')}
// //             className={`px-4 py-2 rounded-full ${activeFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// //           >
// //             All
// //           </button>
// //           {designationOrder.map(designation => (
// //             <button
// //               key={designation}
// //               onClick={() => setActiveFilter(designation)}
// //               className={`px-4 py-2 rounded-full ${activeFilter === designation ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// //             >
// //               {designation.replace(/_/g, ' ')}
// //             </button>
// //           ))}
// //         </div>

// //         {committeeMembers.length === 0 ? (
// //           <div className="text-center py-8 bg-gray-50 rounded-lg">
// //             <p className="text-gray-500">No committee members found</p>
// //           </div>
// //         ) : activeFilter === 'All' ? (
// //           // Show all members grouped by designation
// //           <div className="space-y-12">
// //             {designationOrder.map(designation => {
// //               if (groupedMembers[designation] && groupedMembers[designation].length > 0) {
// //                 return (
// //                   <div key={designation} className="mb-12">
// //                     <h3 className="text-2xl font-bold mb-6 border-b pb-2">
// //                       {designation.replace(/_/g, ' ')}
// //                     </h3>
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //                       {groupedMembers[designation].map((member, index) => 
// //                         renderMemberCard(member, index)
// //                       )}
// //                     </div>
// //                   </div>
// //                 );
// //               }
// //               return null;
// //             })}
// //           </div>
// //         ) : (
// //           // Show filtered members
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredMembers.map((member, index) => 
// //               renderMemberCard(member, index)
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CommitteeManager;

// import React, { useState, useEffect, useContext } from 'react';
// import { API_URL } from '../../config/config';
// import AuthContext from '../../context/AuthContext/AuthContext';

// const CommitteeManager = () => {
//   const [committeeMembers, setCommitteeMembers] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     designation: 'Advisor',
//     awards: '',
//     imageUrl: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const { user } = useContext(AuthContext);

//   const designationOrder = [
//     'Advisor',
//     'Founders',
//     'Trustees',
//     'Associate',
//     'Previous_Governing_Board'
//   ];

//   const designationOptions = [
//     'Advisor',
//     'Founders',
//     'Trustees',
//     'Previous_Governing_Board',
//     'Associate'
//   ];

//   useEffect(() => {
//     const fetchCommittee = async () => {
//       try {
//         const response = await fetch(`${API_URL}/committee`);
//         if (response.ok) {
//           const data = await response.json();
//           setCommitteeMembers(data);
//         }
//       } catch (error) {
//         console.error('Error fetching committee:', error);
//         setStatus({
//           success: false,
//           message: 'Failed to load committee members'
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommittee();
//   }, []);

//   const handleChange = e => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const payload = {
//         ...formData,
//         awards: formData.awards.split(',').map(award => award.trim())
//       };

//       if (formData.designation !== 'Advisor') {
//         delete payload.message;
//       }

//       const response = await fetch(`${API_URL}/committee`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();
      
//       if (response.ok) {
//         setCommitteeMembers([...committeeMembers, result]);
//         setFormData({
//           name: '',
//           designation: 'Advisor',
//           awards: '',
//           imageUrl: '',
//           message: ''
//         });
//         setStatus({
//           success: true,
//           message: 'Committee member added successfully!'
//         });
//       } else {
//         throw new Error(result.message || 'Failed to add member');
//       }
//     } catch (error) {
//       setStatus({
//         success: false,
//         message: error.message
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this member?')) return;

//     try {
//       const response = await fetch(`${API_URL}/committee/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });

//       if (response.ok) {
//         setCommitteeMembers(committeeMembers.filter(member => member._id !== id));
//         setStatus({
//           success: true,
//           message: 'Member deleted successfully'
//         });
//       } else {
//         throw new Error('Failed to delete member');
//       }
//     } catch (error) {
//       setStatus({
//         success: false,
//         message: error.message
//       });
//     }
//   };

//   const groupedMembers = committeeMembers.reduce((acc, member) => {
//     const designation = member.designation;
//     if (!acc[designation]) {
//       acc[designation] = [];
//     }
//     acc[designation].push(member);
//     return acc;
//   }, {});

//   const filteredMembers = activeFilter === 'All' 
//     ? committeeMembers 
//     : committeeMembers.filter(member => member.designation === activeFilter);

//   const renderAdvisorCard = (member, index) => {
//     return (
//       <div key={member._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Rectangular image for advisor */}
//         <div className="relative h-60 w-full overflow-hidden">
//           <img
//             src={member.imageUrl}
//             alt={member.name}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/400x300?text=Advisor+Photo';
//               e.target.className = 'w-full h-full object-cover bg-gray-200';
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//           <div className="absolute bottom-0 left-0 p-4">
//             <h3 className="text-xl font-bold text-white">{member.name}</h3>
//             <p className="text-blue-200 font-medium">Advisor</p>
//           </div>
//         </div>

//         {/* Advisor details */}
//         <div className="p-4">
//           {member.message && (
//             <div className="mb-4">
//               <h4 className="text-sm font-semibold text-gray-700 mb-1">Message</h4>
//               <p className="text-sm text-gray-600">{member.message}</p>
//             </div>
//           )}

//           {member.awards && member.awards.length > 0 && (
//             <div className="border-t pt-3">
//               <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Achievements</h4>
//               <ul className="space-y-1">
//                 {member.awards.map((award, i) => (
//                   <li key={i} className="flex items-start">
//                     <svg className="h-3 w-3 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-xs text-gray-600">{award}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {user && (
//             <div className="mt-3 flex justify-end">
//               <button
//                 onClick={() => handleDelete(member._id)}
//                 className="text-red-500 hover:text-red-700 font-medium text-xs flex items-center"
//               >
//                 <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 Remove
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderMemberCard = (member, index) => {
//     const borderColors = [
//       'border-blue-500',
//       'border-green-500',
//       'border-purple-500',
//       'border-yellow-500',
//       'border-pink-500'
//     ];
//     const borderColor = borderColors[index % borderColors.length];
    
//     return (
//       <div 
//         key={member._id} 
//         className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${borderColor}`}
//       >
//         <div className="p-5">
//           <div className="flex flex-col items-center">
//             <div className="relative mb-4">
//               <img 
//                 src={member.imageUrl} 
//                 alt={member.name}
//                 className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/150';
//                   e.target.className = 'w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-gray-200';
//                 }}
//               />
//             </div>
//             <div className="text-center">
//               <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
//               <p className="text-blue-600 font-medium">
//                 {member.designation.replace(/_/g, ' ')}
//               </p>
//             </div>
//           </div>

//           {member.awards && member.awards.length > 0 && (
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Achievements</h4>
//               <ul className="space-y-1">
//                 {member.awards.map((award, i) => (
//                   <li key={i} className="flex items-start">
//                     <svg className="h-3 w-3 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-xs text-gray-600">{award}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {user && (
//             <div className="mt-4 flex justify-center">
//               <button
//                 onClick={() => handleDelete(member._id)}
//                 className="text-red-500 hover:text-red-700 font-medium text-xs flex items-center"
//               >
//                 <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 Remove
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return <div className="text-center p-4">Loading committee members...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {user && (
//         <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Committee Management</h1>
//       )}
      
//       {status && (
//         <div className={`mb-4 p-3 rounded text-center ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {status.message}
//         </div>
//       )}

//       {user && (
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-blue-100">
//           <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Committee Member</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
//                 <select
//                   id="designation"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   {designationOptions.map(option => (
//                     <option key={option} value={option}>
//                       {option.replace(/_/g, ' ')}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {formData.designation === 'Advisor' && (
//               <div>
//                 <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Advisor Message</label>
//                 <textarea
//                   id="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
//                   placeholder="Enter a message for this advisor..."
//                 />
//               </div>
//             )}

//             <div>
//               <label htmlFor="awards" className="block mb-1 font-medium text-gray-700">Awards (comma separated)</label>
//               <input
//                 type="text"
//                 id="awards"
//                 value={formData.awards}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Award 1, Award 2, Award 3"
//               />
//             </div>

//             <div>
//               <label htmlFor="imageUrl" className="block mb-1 font-medium text-gray-700">Image URL</label>
//               <input
//                 type="url"
//                 id="imageUrl"
//                 value={formData.imageUrl}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Adding...' : 'Add Member'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div>
//         <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
//           {user ? 'Current Committee Members' : 'Our Team'}
//         </h2>
        
//         <div className="flex flex-wrap gap-2 mb-8 justify-center">
//           <button
//             onClick={() => setActiveFilter('All')}
//             className={`px-4 py-2 rounded-full ${activeFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           >
//             All
//           </button>
//           {designationOrder.map(designation => (
//             <button
//               key={designation}
//               onClick={() => setActiveFilter(designation)}
//               className={`px-4 py-2 rounded-full ${activeFilter === designation ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               {designation.replace(/_/g, ' ')}
//             </button>
//           ))}
//         </div>

//         {committeeMembers.length === 0 ? (
//           <div className="text-center py-8 bg-gray-50 rounded-lg">
//             <p className="text-gray-500">No committee members found</p>
//           </div>
//         ) : activeFilter === 'All' ? (
//           <div className="space-y-12">
//             {designationOrder.map(designation => {
//               if (groupedMembers[designation] && groupedMembers[designation].length > 0) {
//                 return (
//                   <div key={designation} className="mb-12">
//                     <h3 className="text-2xl font-bold mb-6 border-b pb-2">
//                       {designation.replace(/_/g, ' ')}
//                     </h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {groupedMembers[designation].map((member, index) => 
//                         designation === 'Advisor' 
//                           ? renderAdvisorCard(member, index)
//                           : renderMemberCard(member, index)
//                       )}
//                     </div>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredMembers.map((member, index) => 
//               activeFilter === 'Advisor'
//                 ? renderAdvisorCard(member, index)
//                 : renderMemberCard(member, index)
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommitteeManager;

import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from '../../config/config';
import AuthContext from '../../context/AuthContext/AuthContext';

const CommitteeManager = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    designation: 'Advisor',
    department: '',
    email: '',
    phone: '',
    awards: '',
    imageUrl: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const { user } = useContext(AuthContext);

  const designationOrder = [
    'Advisor',
    'Founders',
    'Trustees',
    'Associate',
    'Previous_Governing_Board'
  ];

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
          department: '',
          email: '',
          phone: '',
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

  const groupedMembers = committeeMembers.reduce((acc, member) => {
    const designation = member.designation;
    if (!acc[designation]) {
      acc[designation] = [];
    }
    acc[designation].push(member);
    return acc;
  }, {});

  const filteredMembers = activeFilter === 'All' 
    ? committeeMembers 
    : committeeMembers.filter(member => member.designation === activeFilter);

  const renderMemberCard = (member) => {
    return (
      <div
        key={member._id}
        className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden hover:shadow-md transition-all duration-300"
      >
        {/* Rectangular Profile Picture */}
        <div className="h-80 bg-gray-100 relative">
          <img
            src={member.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
          <div className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-none mt-2">
            {member.designation.replace(/_/g, ' ')}
          </div>

          {/* Member Details */}
          <div className="mt-4 space-y-3">
            {member.department && (
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-gray-700">{member.department}</span>
              </div>
            )}
            {member.email && (
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700 break-all">{member.email}</span>
              </div>
            )}
            {member.phone && (
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700">{member.phone}</span>
              </div>
            )}
          </div>

          {/* BIO Section */}
          {member.message && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {member.designation === 'Advisor' ? 'Message' : 
                 member.designation === 'Previous_Governing_Board' ? 'Tenure Highlights' : 'Bio'}
              </h4>
              <p className="text-gray-700">{member.message}</p>
            </div>
          )}

          {/* Awards Section */}
          {member.awards?.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {member.designation === 'Previous_Governing_Board' ? 'Key Contributions' : 'Awards & Honors'}
              </h4>
              <ul className="space-y-2">
                {member.awards.map((award, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Admin Controls */}
          {user && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleDelete(member._id)}
                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {user && (
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Committee Management
          </h1>
          
          {status && (
            <div className={`mb-6 p-4 rounded text-center ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status.message}
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Committee Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="designation" className="block mb-1 font-medium text-gray-700">Designation</label>
                  <select
                    id="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {designationOptions.map(option => (
                      <option key={option} value={option}>
                        {option.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="block mb-1 font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block mb-1 font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="awards" className="block mb-1 font-medium text-gray-700">Awards (comma separated)</label>
                <input
                  type="text"
                  id="awards"
                  value={formData.awards}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Award 1, Award 2, Award 3"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
                  {formData.designation === 'Advisor' ? 'Advisor Message' : 
                   formData.designation === 'Previous_Governing_Board' ? 'Tenure Highlights' : 'Bio'}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  placeholder={`Enter ${formData.designation === 'Advisor' ? 'a message for this advisor' : 
                              formData.designation === 'Previous_Governing_Board' ? 'tenure highlights' : 'a bio'}`}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {user ? 'Committee Members' : 'Our Team'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our distinguished team members
          </p>
          <div className="border-t border-gray-200 w-24 mx-auto my-4"></div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-4 py-2 rounded-none ${activeFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            All
          </button>
          {designationOrder.map(designation => (
            <button
              key={designation}
              onClick={() => setActiveFilter(designation)}
              className={`px-4 py-2 rounded-none ${activeFilter === designation ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {designation.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {committeeMembers.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-medium mt-4 text-gray-900">No Members Found</h3>
              <p className="mt-1 text-gray-500">We couldn't find any committee members.</p>
            </div>
          </div>
        ) : activeFilter === 'All' ? (
          <div className="space-y-16">
            {designationOrder.map(designation => {
              if (groupedMembers[designation] && groupedMembers[designation].length > 0) {
                return (
                  <div key={designation} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                      {designation.replace(/_/g, ' ')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {groupedMembers[designation].map(member => renderMemberCard(member))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map(member => renderMemberCard(member))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteeManager;