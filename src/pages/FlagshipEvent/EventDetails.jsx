
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config/config';
import { 
  Box, Button, Container, Typography, Alert, 
  CircularProgress, Grid, Card, CardMedia, 
  CardContent, Chip, Divider, Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarToday, People, School, Business } from '@mui/icons-material';

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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Event not found');
        }
        
        setConferenceData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {error}
        </Alert>
        <Button variant="contained" component={Link} to="/">
          Back to Events
        </Button>
      </Container>
    );
  }

  if (!conferenceData) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No conference data found
        </Alert>
        <Button variant="contained" component={Link} to="/">
          Back to Events
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <Box sx={{ position: 'relative', height: { xs: '300px', md: '500px' } }}>
        <CardMedia
          component="img"
          image={conferenceData.bannerUrl}
          alt={conferenceData.theme}
          sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(0,0,0,0.7)',
          color: 'white',
          p: 3,
          textAlign: 'center'
        }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {conferenceData.theme}
            </Typography>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <CalendarToday fontSize="small" />
              {conferenceData.dates}
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {conferenceData.duration} days
                </Typography>
                <Typography variant="subtitle1">Duration</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {conferenceData.totalCommittees}
                </Typography>
                <Typography variant="subtitle1">Committees</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
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

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ px: 6 }}
            href="#register"
          >
            Register Now
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ px: 6 }}
            component={Link}
            to="/events"
          >
            Back to Events
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetails;

