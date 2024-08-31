const Y = require('yjs');
const { WebSocketProvider } = require('y-websocket');

// Map to store Yjs documents for each room
const docs = {};

// Handle editor data updates
exports.handleEditorData = (room, data) => {
    if (!docs[room]) {
        docs[room] = new Y.Doc();
        docs[room].getText('text');
    }

    const doc = docs[room];
    const yText = doc.getText('text');
    
    // Apply the update to the Yjs document
    yText.applyUpdate(data.update);

    // Broadcast the update to all clients in the room
    // This assumes you have access to a broadcast function or can emit via socket.io
    // You need to pass the `io` instance when calling this method
    io.to(room).emit('documentUpdate', { update: data.update });
};

// Setup WebSocket provider for a given room
exports.setupWebSocketProvider = (room) => {
    if (!docs[room]) {
        docs[room] = new Y.Doc();
        new WebSocketProvider('ws://localhost:5000', room, docs[room]);
    }
    return docs[room];
};
