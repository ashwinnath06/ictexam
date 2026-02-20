import { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    MenuItem,
    Grid,
    IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'Pending'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { title, description, dueDate, priority, status } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/tasks', formData, {
                headers: { 'x-auth-token': token }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error adding task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" className="animate-slide-up">
            <Box sx={{ mt: 4, mb: 4 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: '#fff', mb: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Paper
                    elevation={0}
                    className="glass-card"
                    sx={{
                        p: { xs: 3, md: 5 },
                        background: 'rgba(255, 255, 255, 0.9) !important',
                        borderRadius: 4
                    }}
                >
                    <Typography variant="h4" component="h1" fontWeight="900" gutterBottom sx={{
                        background: 'linear-gradient(45deg, #4f46e5, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3
                    }}>
                        Create New Task
                    </Typography>

                    <Box component="form" onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Task Title"
                                    name="title"
                                    placeholder="What needs to be done?"
                                    value={title}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    placeholder="Add some details..."
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Due Date"
                                    name="dueDate"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={dueDate}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Priority"
                                    name="priority"
                                    value={priority}
                                    onChange={onChange}
                                >
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Status"
                                    name="status"
                                    value={status}
                                    onChange={onChange}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    className="premium-btn"
                                    size="large"
                                    sx={{ mt: 2, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}
                                >
                                    {loading ? 'Creating...' : 'Create Task'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default CreateTask;
