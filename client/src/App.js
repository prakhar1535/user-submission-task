import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Container } from '@mui/material';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
    return (
        <Router>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">
                            User Form
                        </Button>
                        <Button color="inherit" component={Link} to="/admin">
                            Admin Dashboard
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container>
                    <Routes>
                        <Route path="/" element={<UserForm />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </Container>
            </Box>
        </Router>
    );
}

export default App;