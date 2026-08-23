const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In-Memory Database / MongoDB Mock Layer
let tasks = [
  { id: 1, title: 'Learn React & Next.js Frameworks', status: 'Completed', priority: 'High' },
  { id: 2, title: 'Build Full-Stack Express API', status: 'In Progress', priority: 'High' },
  { id: 3, title: 'Deploy Application to Cloud', status: 'Pending', priority: 'Medium' }
];

// REST API Endpoints
app.get('/api/tasks', (req, res) => {
  res.json({ success: true, data: tasks });
});

app.post('/api/tasks', (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  const newTask = {
    id: Date.now(),
    title,
    status: 'Pending',
    priority: priority || 'Medium'
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ success: true, message: 'Task deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Full-stack server running on port ${PORT}`));