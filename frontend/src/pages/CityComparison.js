import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Autocomplete, 
  TextField,
  Button,
  Alert,
  Snackbar 
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function CityComparison() {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cities`);
        setCities(response.data.map(city => city.cityName));
      } catch (error) {
        setError('Failed to fetch cities list');
        setSnackbar({
          open: true,
          message: 'Failed to load cities',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCompare = async () => {
    if (selectedCities.length < 2) return;
    
    try {
      setComparing(true);
      setError(null);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/compare?cities=${selectedCities.join(',')}`
      );
      setComparisonData(response.data);
    } catch (error) {
      setError('Failed to compare cities');
      setSnackbar({
        open: true,
        message: 'Failed to load comparison data',
        severity: 'error'
      });
    } finally {
      setComparing(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h4" gutterBottom>
        Compare Cities
      </Typography>
      
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Autocomplete
              multiple
              options={cities}
              value={selectedCities}
              onChange={(event, newValue) => setSelectedCities(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Cities to Compare"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleCompare}
              disabled={selectedCities.length < 2}
            >
              Compare
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {comparisonData && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Air Quality Comparison
              </Typography>
              <Bar
                data={{
                  labels: selectedCities,
                  datasets: [{
                    label: 'Air Quality Index',
                    data: comparisonData.map(city => city.metrics.airQuality.aqi),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  }]
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CityComparison; 