import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    ImageList,
    ImageListItem,
    CircularProgress
} from '@mui/material';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/submissions');
                setSubmissions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                setError('Failed to load submissions');
                setLoading(false);
            }
        };

        fetchSubmissions();
        // Set up polling to check for new submissions every 30 seconds
        const interval = setInterval(fetchSubmissions, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ mt: 4 }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Admin Dashboard
                </Typography>

                {submissions.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        No submissions yet
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {submissions.map((submission) => (
                            <Grid item xs={12} key={submission._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {submission.name}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            {submission.socialMediaHandle}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Submitted: {new Date(submission.createdAt).toLocaleString()}
                                        </Typography>
                                        <ImageList sx={{ width: '100%', height: 'auto', maxHeight: 400 }} cols={3} rowHeight={164}>
                                            {submission.images.map((image, index) => (
                                                <ImageListItem key={index}>
                                                    <img
                                                        src={`http://localhost:5000/${image}`}
                                                        alt={`Upload ${index + 1} by ${submission.name}`}
                                                        loading="lazy"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default AdminDashboard;