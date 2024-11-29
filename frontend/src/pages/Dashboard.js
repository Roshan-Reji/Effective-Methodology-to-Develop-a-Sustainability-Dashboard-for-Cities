import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Alert, Snackbar } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import LoadingSpinner from '../components/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/metrics`);
        setMetrics(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch metrics');
        setSnackbar({
          open: true,
          message: 'Failed to load dashboard data',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            City Sustainability Dashboard
          </Typography>
        </Grid>

        {loading && (
          <Grid item xs={12}>
            <LoadingSpinner message="Loading dashboard data..." />
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Grid>
        )}

        {!loading && !error && metrics && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Air Quality Index</Typography>
              <Line
                data={{
                  labels: metrics.airQuality.map(d => new Date(d.timestamp).toLocaleDateString()),
                  datasets: [{
                    label: 'AQI',
                    data: metrics.airQuality.map(d => d.aqi),
                    borderColor: 'rgb(75, 192, 192)',
                  }]
                }}
              />
            </Paper>
          </Grid>
        )}

        {/* Energy Usage Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Renewable Energy</Typography>
            {metrics && (
              <Doughnut
                data={{
                  labels: ['Renewable', 'Non-Renewable'],
                  datasets: [{
                    data: [
                      metrics.renewableEnergy.percentage,
                      100 - metrics.renewableEnergy.percentage
                    ],
                    backgroundColor: ['#4caf50', '#ff9800']
                  }]
                }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 