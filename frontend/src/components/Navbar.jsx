import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 800,
                            textDecoration: 'none',
                            color: '#fff',
                            letterSpacing: '0.05rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                opacity: 0.9
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 900,
                                fontSize: '1.2rem',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                            }}
                        >
                            T
                        </Box>
                        TaskApp
                    </Typography>

                    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': { color: '#fff', background: 'rgba(255, 255, 255, 0.1)' }
                            }}
                        >
                            Tasks
                        </Button>

                        {user ? (
                            <Button
                                onClick={handleLogout}
                                sx={{
                                    color: '#f43f5e',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    ml: 1
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontWeight: 500,
                                        '&:hover': { color: '#fff', background: 'rgba(255, 255, 255, 0.1)' }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    className="premium-btn"
                                    sx={{
                                        borderRadius: '12px',
                                        px: 3,
                                        textTransform: 'none',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
