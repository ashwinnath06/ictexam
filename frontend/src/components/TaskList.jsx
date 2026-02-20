import { Grid, Card, CardContent, Typography, Box, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskUpdated }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleMenuOpen = (event, task) => {
        setAnchorEl(event.currentTarget);
        setSelectedTask(task);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTask(null);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${selectedTask._id}`, {
                headers: { 'x-auth-token': token }
            });
            onTaskUpdated();
            handleMenuClose();
        } catch (err) {
            console.error(err);
            alert('Error deleting task');
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/tasks/${selectedTask._id}`, { status: newStatus }, {
                headers: { 'x-auth-token': token }
            });
            onTaskUpdated();
            handleMenuClose();
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'error';
            case 'Medium': return 'warning';
            case 'Low': return 'success';
            default: return 'default';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'primary';
            case 'Pending': return 'default';
            default: return 'default';
        }
    };

    if (tasks.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography color="text.secondary">No tasks found. Click "Add New Task" to get started!</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task._id}>
                        <Card sx={{
                            borderRadius: 3,
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 },
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Chip
                                        label={task.priority}
                                        size="small"
                                        color={getPriorityColor(task.priority)}
                                        variant="outlined"
                                    />
                                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, task)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>

                                <Typography variant="h6" fontWeight="700" gutterBottom>
                                    {task.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '3em', mb: 2 }}>
                                    {task.description || 'No description provided'}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                                    </Typography>
                                </Box>

                                <Chip
                                    label={task.status}
                                    size="small"
                                    color={getStatusColor(task.status)}
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleStatusUpdate('In Progress')}>Set In Progress</MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('Completed')}>Set Completed</MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Delete Task</MenuItem>
            </Menu>
        </Box>
    );
};

export default TaskList;
