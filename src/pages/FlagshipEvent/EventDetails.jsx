

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config/config';
import { format } from 'date-fns';
import {
  Box, Button, Container, Typography, Alert,
  CircularProgress, Grid, Card, CardMedia,
  CardContent, Chip, Avatar, useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarToday, School } from '@mui/icons-material';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
    </Box>
  );
};

export default EventDetails;