import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    CssBaseline,
    Fab,
    Tooltip,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AddTask from './AddTask';
import TaskList from './TaskList';

const Home = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', {
                headers: { 'x-auth-token': token }
            });
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', width: '100%', pt: 4 }}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: 10 }} className="animate-fade-in">
                <Paper
                    elevation={0}
                    className="glass-card"
                    sx={{
                        p: { xs: 3, md: 6 },
                        background: 'rgba(255, 255, 255, 0.9) !important',
                        minHeight: '70vh'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Typography variant="h3" component="h1" fontWeight="900" sx={{
                                background: 'linear-gradient(45deg, #4f46e5, #ec4899)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}>
                                My Tasks
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Manage your daily objectives and stay productive.
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenAddDialog(true)}
                            className="premium-btn"
                            sx={{ borderRadius: 3, px: 3, display: { xs: 'none', sm: 'flex' } }}
                        >
                            Add New Task
                        </Button>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
                    )}
                </Paper>
            </Container>

            <Tooltip title="Add New Task" placement="left">
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'fixed', bottom: 32, right: 32, display: { xs: 'flex', sm: 'none' } }}
                    onClick={() => setOpenAddDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <AddTask
                open={openAddDialog}
                handleClose={() => setOpenAddDialog(false)}
                onTaskAdded={fetchTasks}
            />
        </Box>
    );
};

export default Home;
