const express = require('express');
const cors = require('cors');
const path = require('path');
const todoRoutes = require('./routes/todo.routes');
const issueRoutes = require('./routes/issue.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/issues', issueRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend static build if available
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.json({
        message: 'Backend API is running!',
        frontendDevServer: 'http://localhost:5173',
        endpoints: {
          todos: '/api/todos',
          health: '/api/health'
        }
      });
    }
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

