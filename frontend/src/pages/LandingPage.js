import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EcoIcon from '@mui/icons-material/Eco';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import RecyclingIcon from '@mui/icons-material/Recycling';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          City Sustainability Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Track and compare environmental metrics across cities worldwide
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          View Dashboard
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <EcoIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Air Quality
            </Typography>
            <Typography color="text.secondary">
              Monitor real-time air quality metrics and pollution levels
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <WaterDropIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Water Usage
            </Typography>
            <Typography color="text.secondary">
              Track water consumption and conservation efforts
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <RecyclingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Waste Management
            </Typography>
            <Typography color="text.secondary">
              Analyze recycling rates and waste reduction
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage; 