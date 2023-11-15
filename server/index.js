const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// Create server
const server = http.createServer(app);

// Connect to frontend
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

// Event handlers
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // On Join Room
    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User with ID: ${socket.id} joined room: ${room}`);
    })

    // On Send Message
    socket.on("send_message", (message) => {
        socket.to(message.room).emit("receive_message", message)
    })

    // On Disconnect
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// Listening to port 3001
server.listen(3001, () => {
    console.log("SERVER RUNNING")
});


