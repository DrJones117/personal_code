const express = require('express')
const app = express();
const socket = require('socket.io')
const http = require("http");
const cors = require('cors')
const { Server } = require("socket.io")

app.use(cors())
app.use(express.json())


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })
    
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen('8000', () => {
    console.log("Server is running on port 8000...");
});