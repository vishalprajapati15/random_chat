import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(cors()); 
app.use('/api', healthRoutes);

const FRONTEND_URLS = process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(",").map(url => url.trim().replace(/\/$/, ""))
    : "*";

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URLS,  
        methods: ["GET", "POST"]
    },

    pingInterval: 25000,
    pingTimeout: 60000,
});

const waitingUser = [];
const activePairs = new Map();  

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // NOTE: Do NOT return early here. Every connected socket must have
    // its event listeners attached. The old guard was causing sockets
    // to silently ignore all events (including "start"), so users
    // could never be matched after a reconnect.

    function handleLeave(id) {
        // Remove from waiting queue if present
        const index = waitingUser.indexOf(id);
        if (index !== -1) {
            waitingUser.splice(index, 1);
            console.log(`Removed ${id} from waitingUser. Queue length: ${waitingUser.length}`);
        }

        // Notify partner and clean up active pair
        const partner = activePairs.get(id);
        if (partner) {
            io.to(partner).emit("partnerLeft");
            activePairs.delete(id);
            activePairs.delete(partner);
        }
    }

    socket.on("start", () => {
        // If already in waiting queue, don't add again
        if (waitingUser.includes(socket.id)) {
            socket.emit("waiting");
            return;
        }

        // If already paired, ignore
        if (activePairs.has(socket.id)) {
            return;
        }

        if (waitingUser.length > 0) {
            const partner = waitingUser.shift();
            const roomId = uuid().replace(/-/g, "");

            activePairs.set(socket.id, partner);
            activePairs.set(partner, socket.id);

            console.log(`Matched: ${socket.id} <-> ${partner} in room ${roomId}`);
            socket.emit("matched", { roomId });
            socket.to(partner).emit("matched", { roomId });
        } else {
            waitingUser.push(socket.id);
            console.log(`${socket.id} added to waitingUser. Queue length: ${waitingUser.length}`);
            socket.emit("waiting");
        }
    });

    socket.on("next", () => {
        handleLeave(socket.id);
        // Put the user back into waiting after "next"
        waitingUser.push(socket.id);
        console.log(`${socket.id} pressed next. Queue length: ${waitingUser.length}`);
        socket.emit("waiting");
    });

    socket.on("disconnect", () => {
        handleLeave(socket.id);
        console.log(`User disconnected: ${socket.id}. Queue length: ${waitingUser.length}`);
    });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("Server is listening on port : ", port);
})