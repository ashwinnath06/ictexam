import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    Alert,
    Avatar,
    InputAdornment,
    IconButton
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        const res = await register(name, email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.msg);
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Container component="main" maxWidth="xs" className="animate-slide-up">
            <Paper
                elevation={0}
                className="glass-card"
                sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 64, height: 64, boxShadow: '0 8px 16px rgba(244, 63, 94, 0.3)' }}>
                    <PersonAddOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4" gutterBottom sx={{ color: 'secondary.dark', mb: 1 }}>
                    Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Be part of something amazing
                </Typography>

                {error && <Alert severity="error" variant="filled" sx={{ mb: 3, width: '100%', borderRadius: 2, boxShadow: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={onChange}
                        sx={{ mb: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="secondary" sx={{ opacity: 0.7 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={onChange}
                        sx={{ mb: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="secondary" sx={{ opacity: 0.7 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={onChange}
                        sx={{ mb: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end" color="secondary">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="premium-btn"
                        color="secondary"
                        size="large"
                        sx={{ mt: 5, mb: 3, borderRadius: '12px', py: 1.8, fontSize: '1.2rem', background: 'linear-gradient(45deg, #f43f5e 30%, #ec4899 90%) !important' }}
                    >
                        Get Started
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" sx={{ fontWeight: 800, color: 'secondary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
