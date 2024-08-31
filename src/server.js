const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Y = require('yjs');
const collaborativeRoutes = require('./routes/router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());
app.use(express.static('templates'));

// Routes
app.use('/api', collaborativeRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Collaborative Coding Server');
});

// Create a Yjs document for collaborative editing
const ydoc = new Y.Doc();
const yText = ydoc.getText('text');

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Join a room
    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    // Handle editor data updates
    socket.on('editorData', (data) => {
        yText.applyUpdate(data.update);
        io.to(data.room).emit('documentUpdate', { update: data.update });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
