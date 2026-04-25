import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config/config';
import { format } from 'date-fns';
import {
  Box, Button, Container, Typography, Alert,
  CircularProgress, Grid, Card, CardMedia,
  CardContent, Chip, Avatar, useTheme,
  useMediaQuery, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarToday, School, Delete, Edit } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6]
  }
}));

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conferenceData, setConferenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events/${id}`);
      
      if (response.status === 404) {
        // Event doesn't exist - show message and redirect
        setError('Event not found. It may have been deleted.');
        setTimeout(() => {
          navigate('/allconferences', { replace: true });
        }, 3000);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Event not found');
      }

      setConferenceData(data.data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      console.log('Attempting to delete event with ID:', id);
      
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization token if required
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Delete response status:', response.status);
      
      // Handle different response scenarios
      let data;
      let isSuccess = false;
      
      try {
        data = await response.json();
        console.log('Delete response data:', data);
        isSuccess = data.success === true;
      } catch (jsonError) {
        console.log('Response is not JSON or empty');
        // If response is empty but status is 200 or 204, consider it success
        if (response.status === 200 || response.status === 204 || response.ok) {
          isSuccess = true;
        }
      }
      
      // Check if delete was successful
      if (response.ok && (isSuccess || response.status === 200 || response.status === 204)) {
        // Success - show message and redirect to allconferences
        setSnackbar({
          open: true,
          message: 'Event deleted successfully! Redirecting to all conferences...',
          severity: 'success'
        });
        
        setDeleteDialogOpen(false);
        
        // Redirect to /allconferences after a short delay
        setTimeout(() => {
          navigate('/allconferences', { replace: true });
        }, 1500);
      } else {
        // Handle specific error cases
        let errorMessage = 'Failed to delete event';
        
        if (response.status === 404) {
          errorMessage = 'Event not found - it may have already been deleted';
          // Redirect anyway since it's gone
          setTimeout(() => {
            navigate('/allconferences', { replace: true });
          }, 2000);
        } else if (response.status === 401) {
          errorMessage = 'You are not authorized to delete this event';
        } else if (response.status === 403) {
          errorMessage = 'You do not have permission to delete this event';
        } else if (data?.message) {
          errorMessage = data.message;
        }
        
        throw new Error(errorMessage);
      }
      
    } catch (err) {
      console.error('Delete error details:', err);
      
      // Check if the error might be due to CORS or network issues
      if (err.message === 'Failed to fetch') {
        setSnackbar({
          open: true,
          message: 'Network error. Please check if the server is running and CORS is configured.',
          severity: 'error'
        });
      } else {
        setSnackbar({
          open: true,
          message: err.message || 'Failed to delete event. Please try again.',
          severity: 'error'
        });
      }
      
      setDeleteDialogOpen(false);
      
      // Refresh the page data to confirm if deletion actually happened
      setTimeout(() => {
        fetchEvent();
      }, 1000);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEdit = () => {
    navigate(`/events/edit/${id}`);
  };

  // Show loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Show error state with redirect
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {error}
        </Alert>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Redirecting to all conferences...
        </Typography>
        <CircularProgress size={24} />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component={Link} to="/allconferences">
            Back to All Conferences
          </Button>
        </Box>
      </Container>
    );
  }

  // Show not found state
  if (!conferenceData) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No conference data found
        </Alert>
        <Button variant="contained" component={Link} to="/allconferences">
          Back to All Conferences
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Action Buttons */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Edit />}
            onClick={handleEdit}
          >
            Edit Event
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            Delete Event
          </Button>
        </Box>
      </Container>

      {/* Responsive Banner */}
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        height: isMobile ? '50vh' : isTablet ? '70vh' : '100vh',
        overflow: 'hidden',
        mb: 6
      }}>
        <Box
          component="img"
          src={conferenceData.bannerUrl}
          alt={conferenceData.theme}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        />
        {/* Overlay for better text readability */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
          p: 4,
          color: 'white'
        }}>
          <Container maxWidth="lg">
            <Typography
              variant={isMobile ? 'h4' : isTablet ? 'h3' : 'h2'}
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {conferenceData.theme}
            </Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              color: 'rgba(255,255,255,0.9)'
            }}>
              <CalendarToday fontSize="small" />
              <Typography variant={isMobile ? 'body1' : 'h6'}>
                {format(new Date(conferenceData.createdAt), 'MMMM dd, yyyy')}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 6, justifyContent: 'center' }}>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {conferenceData.duration} days
                </Typography>
                <Typography variant="subtitle1">Duration</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {conferenceData.totalCommittees}
                </Typography>
                <Typography variant="subtitle1">Committees</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {conferenceData.totalDelegates}
                </Typography>
                <Typography variant="subtitle1">Total Delegates</Typography>
                <Typography variant="body2" color="text.secondary">
                  ({conferenceData.internationalDelegates} International)
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Committees Section */}
        {conferenceData.committees?.length > 0 && (
          <Card sx={{ mb: 6 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Committees & Awards
              </Typography>
              <Grid container spacing={3}>
                {conferenceData.committees.map((committee, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <School />
                          </Avatar>
                          <Typography variant="h6" color="primary">
                            {committee.name}
                          </Typography>
                        </Box>
                        {committee.awards?.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              Awards:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                              {committee.awards.map((award, i) => (
                                <Chip
                                  label={award}
                                  key={i}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                        {committee.winners?.length > 0 && (
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              Winners:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                              {committee.winners.map((winner, i) => (
                                <Chip
                                  label={winner}
                                  key={i}
                                  size="small"
                                  color="success"
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Gallery Section */}
        {conferenceData.gallery?.length > 0 && (
          <Card sx={{ mb: 6 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Event Gallery
              </Typography>
              <Grid container spacing={2}>
                {conferenceData.gallery.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={image}
                        alt={`Gallery ${index + 1}`}
                        sx={{ height: 200, objectFit: 'cover' }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Sponsors Section */}
        {conferenceData.sponsorPhotos?.length > 0 && (
          <Card sx={{ mb: 6 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Our Sponsors
              </Typography>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
                alignItems: 'center'
              }}>
                {conferenceData.sponsorPhotos.map((sponsor, index) => (
                  <Box key={index} sx={{
                    width: 150,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={sponsor}
                      alt={`Sponsor ${index + 1}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ bgcolor: 'error.main', color: 'white' }}>
          Delete Event
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the event <strong>"{conferenceData?.theme}"</strong>?
            <br /><br />
            This action cannot be undone and will permanently delete:
            <ul>
              <li>All committee information</li>
              <li>Gallery images</li>
              <li>Sponsor information</li>
              <li>All related event data</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleDeleteCancel} 
            disabled={deleting}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={20} /> : <Delete />}
          >
            {deleting ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventDetails;