// Parul University Smart Campus Event Manager - Chat Server
// Node.js server with Socket.IO for real-time chat

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Store active chat rooms and users
const chatRooms = new Map();
const activeUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user joining a chat
    socket.on('join_chat', (data) => {
        const { chatId, user } = data;
        
        // Leave previous rooms
        const rooms = Array.from(socket.rooms);
        rooms.forEach(room => {
            if (room !== socket.id) {
                socket.leave(room);
            }
        });

        // Join new chat room
        socket.join(chatId);
        
        // Store user info
        activeUsers.set(socket.id, {
            ...user,
            chatId: chatId,
            joinTime: new Date()
        });

        // Add to chat room participants
        if (!chatRooms.has(chatId)) {
            chatRooms.set(chatId, new Set());
        }
        chatRooms.get(chatId).add(socket.id);

        console.log(`User ${user.name} joined chat ${chatId}`);

        // Notify other participants
        socket.to(chatId).emit('user_joined', {
            user: user,
            timestamp: new Date().toISOString()
        });

        // Send user status update
        socket.emit('user_status', {
            status: 'online',
            chatId: chatId
        });
    });

    // Handle sending messages
    socket.on('send_message', (data) => {
        const { chatId, message } = data;
        const user = activeUsers.get(socket.id);

        if (user && user.chatId === chatId) {
            // Broadcast message to all users in the chat room
            socket.to(chatId).emit('message', {
                chatId: chatId,
                message: message,
                sender: user
            });

            console.log(`Message sent in chat ${chatId} by ${user.name}: ${message.text}`);
        }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
        const { chatId } = data;
        const user = activeUsers.get(socket.id);

        if (user && user.chatId === chatId) {
            socket.to(chatId).emit('typing', {
                user: user,
                isTyping: true
            });
        }
    });

    socket.on('typing_stop', (data) => {
        const { chatId } = data;
        const user = activeUsers.get(socket.id);

        if (user && user.chatId === chatId) {
            socket.to(chatId).emit('typing', {
                user: user,
                isTyping: false
            });
        }
    });

    // Handle leaving chat
    socket.on('leave_chat', () => {
        const user = activeUsers.get(socket.id);
        if (user) {
            const { chatId } = user;
            
            // Remove from chat room
            if (chatRooms.has(chatId)) {
                chatRooms.get(chatId).delete(socket.id);
                if (chatRooms.get(chatId).size === 0) {
                    chatRooms.delete(chatId);
                }
            }

            // Notify other participants
            socket.to(chatId).emit('user_left', {
                user: user,
                timestamp: new Date().toISOString()
            });

            console.log(`User ${user.name} left chat ${chatId}`);
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id);
        
        if (user) {
            const { chatId } = user;
            
            // Remove from chat room
            if (chatRooms.has(chatId)) {
                chatRooms.get(chatId).delete(socket.id);
                if (chatRooms.get(chatId).size === 0) {
                    chatRooms.delete(chatId);
                }
            }

            // Notify other participants
            socket.to(chatId).emit('user_left', {
                user: user,
                timestamp: new Date().toISOString()
            });

            console.log(`User ${user.name} disconnected from chat ${chatId}`);
        }

        // Remove from active users
        activeUsers.delete(socket.id);
        console.log('User disconnected:', socket.id);
    });

    // Handle system support requests
    socket.on('system_support_request', (data) => {
        const { issue, priority, user } = data;
        
        // Log support request
        console.log(`System support request from ${user.name}:`, issue);
        
        // Simulate auto-response for common issues
        setTimeout(() => {
            const autoResponses = {
                'login': 'If you\'re having login issues, please check your College ID and password. Make sure caps lock is off.',
                'payment': 'For payment issues, please contact our finance department at finance@paruluniversity.ac.in',
                'registration': 'If you can\'t register for an event, please check if you meet the eligibility criteria and if there are available spots.',
                'profile': 'To update your profile, go to the Profile section and click on edit. You can update your phone number and notification preferences.',
                'default': 'Thank you for contacting support. We\'ve received your request and will get back to you shortly.'
            };

            const responseKey = Object.keys(autoResponses).find(key => 
                issue.toLowerCase().includes(key)
            ) || 'default';

            socket.emit('system_response', {
                message: autoResponses[responseKey],
                timestamp: new Date().toISOString(),
                type: 'auto_response'
            });
        }, 2000);
    });

    // Handle event head availability
    socket.on('check_event_head_availability', (data) => {
        const { eventId } = data;
        
        // Simulate checking availability
        setTimeout(() => {
            const isAvailable = Math.random() > 0.3; // 70% chance of being available
            
            socket.emit('event_head_availability', {
                eventId: eventId,
                available: isAvailable,
                estimatedResponseTime: isAvailable ? '2-5 minutes' : '1-2 hours'
            });
        }, 1000);
    });
});

// API endpoints for chat data (if needed)
app.get('/api/chat-stats', (req, res) => {
    res.json({
        activeRooms: chatRooms.size,
        activeUsers: activeUsers.size,
        rooms: Array.from(chatRooms.keys())
    });
});

app.get('/api/active-users', (req, res) => {
    const users = Array.from(activeUsers.values()).map(user => ({
        name: user.name,
        email: user.email,
        chatId: user.chatId,
        joinTime: user.joinTime
    }));
    res.json(users);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
server.listen(PORT, () => {
    console.log(`Parul University Event Manager server running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});