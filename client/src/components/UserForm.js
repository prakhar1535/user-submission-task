import React, { useState } from 'react';
import axios from 'axios';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Container,
    Alert
} from '@mui/material';

const UserForm = () => {
    const [name, setName] = useState('');
    const [socialMediaHandle, setSocialMediaHandle] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialMediaHandle', socialMediaHandle);
        
        for (let image of images) {
            formData.append('images', image);
        }

        try {
            await axios.post('https://user-submission-task-3.onrender.com/api/submissions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Submission successful!');
            setName('');
            setSocialMediaHandle('');
            setImages([]);
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (err) {
            setError('Error submitting form. Please try again.');
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    User Submission Form
                </Typography>
                
                {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Social Media Handle"
                        value={socialMediaHandle}
                        onChange={(e) => setSocialMediaHandle(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <input
                            accept="image/*"
                            type="file"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                            style={{ display: 'block', marginBottom: '10px' }}
                        />
                        <Typography variant="caption" color="textSecondary">
                            Supported formats: JPG, JPEG, PNG, GIF (Max 5 files)
                        </Typography>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        size="large"
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UserForm;