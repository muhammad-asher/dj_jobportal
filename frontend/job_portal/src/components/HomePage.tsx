import React from 'react';
import { Typography, Card, CardContent, Grid, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(60deg, grey, black)', // Gradient from green to blue
  color: 'white', // Text color
});

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleJobSearchClick = () => {
    // Navigate to the job search page
    navigate('/job-search');
  };

  const handleJobApplicationsClick = () => {
    // Navigate to the job applications page
    navigate('/applications');
  };

  return (
    <div style={{ margin: '70px' }}>
      <Typography variant="h4">Welcome to the Home Page</Typography>
      <Typography variant="body1">This is some user-specific content.</Typography>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <StyledCard onClick={handleJobSearchClick}>
            <CardContent>
              <Typography variant="h6">Job Searching</Typography>
              <Typography variant="body2">
                Explore available job opportunities and find the perfect match for your skills.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <StyledCard onClick={handleJobApplicationsClick}>
            <CardContent>
              <Typography variant="h6">Total Job Applications</Typography>
              <Typography variant="body2">
                View and manage all the jobs you've applied for in one place.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
