

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Container, Typography, Alert, CircularProgress } from '@mui/material';

// const EventDetails = () => {
//   const [conferenceData, setConferenceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [deleteError, setDeleteError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/events/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch conference data');
//       }
//       const data = await response.json();
//       setConferenceData(data[0]); // Assuming the API returns an array with one conference
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!conferenceData || !conferenceData._id) {
//       setDeleteError('No conference data available to delete');
//       return;
//     }

//     // Confirm deletion
//     if (!window.confirm('Are you sure you want to delete this conference? This action cannot be undone.')) {
//       return;
//     }

//     setDeleteLoading(true);
//     setDeleteError(null);

//     try {
//       const response = await fetch(`http://localhost:5000/events/${conferenceData._id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete conference');
//       }

//       // Redirect to home page or events list after successful deletion
//       navigate('/');
//     } catch (err) {
//       setDeleteError(err.message);
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
//       <CircularProgress />
//     </Box>
//   );
  
//   if (error) return (
//     <Box p={3}>
//       <Alert severity="error">Error: {error}</Alert>
//     </Box>
//   );
  
//   if (!conferenceData) return (
//     <Box p={3}>
//       <Alert severity="info">No conference data found</Alert>
//     </Box>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
//       {/* Hero Section with Banner */}
//       <Box position="relative" sx={{ height: '400px' }}>
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             bgcolor: 'rgba(0,0,0,0.5)',
//             zIndex: 1
//           }}
//         />
//         <Box
//           component="img"
//           src={conferenceData.bannerUrl}
//           alt="Conference Banner"
//           sx={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover'
//           }}
//         />
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             bgcolor: 'rgba(0,0,0,0.7)',
//             p: 3,
//             zIndex: 2
//           }}
//         >
//           <Container maxWidth="lg">
//             <Typography variant="h3" color="white" gutterBottom>
//               Model United Nations Conference
//             </Typography>
//             <Typography variant="h5" color="white">
//               {conferenceData.theme}
//             </Typography>
//           </Container>
//         </Box>
//       </Box>

//       {/* Conference Details */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 6 }}>
//           <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, textAlign: 'center' }}>
//             <Typography variant="h4" color="primary" gutterBottom>
//               {conferenceData.duration} days
//             </Typography>
//             <Typography variant="subtitle1">Duration</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {conferenceData.dates}
//             </Typography>
//           </Box>

//           <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, textAlign: 'center' }}>
//             <Typography variant="h4" color="primary" gutterBottom>
//               {conferenceData.totalCommittees}
//             </Typography>
//             <Typography variant="subtitle1">Committees</Typography>
//           </Box>

//           <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, textAlign: 'center' }}>
//             <Typography variant="h4" color="primary" gutterBottom>
//               {conferenceData.totalDelegates}
//             </Typography>
//             <Typography variant="subtitle1">Total Delegates</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {conferenceData.internationalDelegates} International
//             </Typography>
//           </Box>
//         </Box>

//         {/* Theme Section */}
//         <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, mb: 6 }}>
//           <Typography variant="h5" gutterBottom>
//             Conference Theme
//           </Typography>
//           <Typography variant="body1">
//             {conferenceData.theme}
//           </Typography>
//         </Box>

//         {/* Gallery Section */}
//         {conferenceData.gallery && conferenceData.gallery.length > 0 && (
//           <Box sx={{ mb: 6 }}>
//             <Typography variant="h5" gutterBottom>
//               Gallery
//             </Typography>
//             <Box sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
//               gap: 2 
//             }}>
//               {conferenceData.gallery.map((image, index) => (
//                 <Box 
//                   key={index} 
//                   sx={{ 
//                     position: 'relative',
//                     height: '200px',
//                     borderRadius: 1,
//                     overflow: 'hidden',
//                     '&:hover .overlay': {
//                       opacity: 1
//                     }
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={image}
//                     alt={`Gallery ${index + 1}`}
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover'
//                     }}
//                   />
//                   <Box
//                     className="overlay"
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       bgcolor: 'rgba(0,0,0,0.5)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       opacity: 0,
//                       transition: 'opacity 0.3s'
//                     }}
//                   >
//                     <Button variant="contained" color="primary">
//                       View
//                     </Button>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}

//         {/* Committees Section */}
//         {conferenceData.committees && conferenceData.committees.length > 0 && (
//           <Box sx={{ mb: 6 }}>
//             <Typography variant="h5" gutterBottom>
//               Committees
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               {conferenceData.committees.map((committee, index) => (
//                 <Box 
//                   key={index} 
//                   sx={{ 
//                     p: 2, 
//                     bgcolor: 'background.paper', 
//                     borderRadius: 1, 
//                     boxShadow: 1 
//                   }}
//                 >
//                   <Typography variant="h6">{committee.name}</Typography>
//                   <Typography variant="body2">{committee.description}</Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}

//         {/* Sponsors Section */}
//         {conferenceData.sponsorPhotos && conferenceData.sponsorPhotos.length > 0 && (
//           <Box sx={{ mb: 6 }}>
//             <Typography variant="h5" gutterBottom>
//               Our Sponsors
//             </Typography>
//             <Box sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: { 
//                 xs: '1fr',
//                 sm: 'repeat(2, 1fr)',
//                 md: 'repeat(3, 1fr)',
//                 lg: 'repeat(4, 1fr)'
//               }, 
//               gap: 3,
//               p: 2,
//               bgcolor: 'background.paper',
//               borderRadius: 1,
//               boxShadow: 1
//             }}>
//               {conferenceData.sponsorPhotos.map((photoUrl, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     position: 'relative',
//                     paddingTop: '56.25%', // 16:9 aspect ratio
//                     borderRadius: 1,
//                     overflow: 'hidden',
//                     bgcolor: 'grey.100',
//                     '&:hover': {
//                       '& img': {
//                         transform: 'scale(1.05)'
//                       }
//                     }
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={photoUrl}
//                     alt={`Sponsor ${index + 1}`}
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'contain',
//                       transition: 'transform 0.3s ease-in-out'
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}

//         {/* Delete Error */}
//         {deleteError && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {deleteError}
//           </Alert>
//         )}

//         {/* Call to Action */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             size="large"
//           >
//             Register Now
//           </Button>
//           <Button 
//             variant="contained" 
//             color="error" 
//             size="large"
//             onClick={handleDelete}
//             disabled={deleteLoading}
//           >
//             {deleteLoading ? 'Deleting...' : 'Delete Conference'}
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default EventDetails;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Alert, CircularProgress } from '@mui/material';

const EventDetails = () => {
  const [conferenceData, setConferenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/events/');
      if (!response.ok) {
        throw new Error('Failed to fetch conference data');
      }
      const data = await response.json();
      setConferenceData(data[0]); // Assuming the API returns an array with one conference
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!conferenceData || !conferenceData._id) {
      setDeleteError('No conference data available to delete');
      return;
    }

    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this conference? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      const response = await fetch(`http://localhost:5000/events/${conferenceData._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete conference');
      }

      // Redirect to home page or events list after successful deletion
      navigate('/');
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Box p={3}>
      <Alert severity="error">Error: {error}</Alert>
    </Box>
  );
  
  if (!conferenceData) return (
    <Box p={3}>
      <Alert severity="info">No conference data found</Alert>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section with Banner */}
      <Box position="relative" sx={{ height: '400px' }}>
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1
          }}
        />
        <Box
          component="img"
          src={conferenceData.bannerUrl}
          alt="Conference Banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0,0,0,0.7)',
            p: 3,
            zIndex: 2
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" color="white" gutterBottom>
              Model United Nations Conference
            </Typography>
            <Typography variant="h5" color="white">
              {conferenceData.theme}
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Conference Details */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 6 }}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              {conferenceData.duration} days
            </Typography>
            <Typography variant="subtitle1">Duration</Typography>
            <Typography variant="body2" color="text.secondary">
              {conferenceData.dates}
            </Typography>
          </Box>

          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              {conferenceData.totalCommittees}
            </Typography>
            <Typography variant="subtitle1">Committees</Typography>
          </Box>

          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              {conferenceData.totalDelegates}
            </Typography>
            <Typography variant="subtitle1">Total Delegates</Typography>
            <Typography variant="body2" color="text.secondary">
              {conferenceData.internationalDelegates} International
            </Typography>
          </Box>
        </Box>

        {/* Theme Section */}
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Conference Theme
          </Typography>
          <Typography variant="body1">
            {conferenceData.theme}
          </Typography>
        </Box>

        {/* Gallery Section */}
        {conferenceData.gallery && conferenceData.gallery.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              Gallery
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
              gap: 2 
            }}>
              {conferenceData.gallery.map((image, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    position: 'relative',
                    height: '200px',
                    borderRadius: 1,
                    overflow: 'hidden',
                    '&:hover .overlay': {
                      opacity: 1
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Committees Section */}
        {conferenceData.committees && conferenceData.committees.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              Committees
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {conferenceData.committees.map((committee, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1, 
                    boxShadow: 1 
                  }}
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    {committee.name}
                  </Typography>
                  
                  {committee.awards && committee.awards.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Awards:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {committee.awards.map((award, awardIndex) => (
                          <Box 
                            key={awardIndex}
                            sx={{ 
                              bgcolor: 'primary.light', 
                              color: 'primary.contrastText',
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.875rem'
                            }}
                          >
                            {award}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {committee.winners && committee.winners.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Winners:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {committee.winners.map((winner, winnerIndex) => (
                          <Box 
                            key={winnerIndex}
                            sx={{ 
                              bgcolor: 'success.light', 
                              color: 'success.contrastText',
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.875rem'
                            }}
                          >
                            {winner}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Sponsors Section */}
        {conferenceData.sponsorPhotos && conferenceData.sponsorPhotos.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              Our Sponsors
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              }, 
              gap: 3,
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 1
            }}>
              {conferenceData.sponsorPhotos.map((photoUrl, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    borderRadius: 1,
                    overflow: 'hidden',
                    bgcolor: 'grey.100',
                    '&:hover': {
                      '& img': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={photoUrl}
                    alt={`Sponsor ${index + 1}`}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Delete Error */}
        {deleteError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {deleteError}
          </Alert>
        )}

        {/* Call to Action */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
          >
            Register Now
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            size="large"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Conference'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetails;

