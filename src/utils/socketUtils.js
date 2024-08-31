// src/utils/socketUtils.js

const collaborativeController = require('../controllers/collaborativeController');

module.exports = (socket, io) => {
    // Handle joining a room and initializing the WebSocket provider
    socket.on('joinRoom', (room) => {
        collaborativeController.setupWebSocketProvider(room);

        // Handle editor data
        socket.on('editorData', (data) => {
            collaborativeController.handleEditorData(room, data);
        });

        // Handle document updates
        socket.on('documentUpdate', (update) => {
            io.to(room).emit('documentUpdate', update);
        });

        socket.join(room);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
            // Clean up Yjs document when no clients are left in the room
            if (io.sockets.adapter.rooms.get(room)?.size === 0) {
                delete collaborativeController.docs[room];
            }
        });
    });
};
