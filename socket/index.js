import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv';
dotenv.config();

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const waitingUser = [];
const activePairs = new Map();  //[user: a:: user:b] && [user:b:: user:c]

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    if(waitingUser.includes(socket.id)){
        return;
    }

    socket.on("start", () => {
        if (waitingUser.length > 0) {
            const partner = waitingUser.shift();
            const roomId = uuid();

            activePairs.set(socket.id, partner);
            activePairs.set(partner, socket.id);
            socket.emit("matched", {roomId});
            socket.to(partner).emit("matched", {roomId});
        }
        else {
            waitingUser.push(socket.id);
            socket.emit("waiting");
        }
    });

    socket.on("next",()=>{
        handleLeave(socket.id);
    });

    function handleLeave(id) {
        const index = waitingUser.indexOf(id);
        const partner = activePairs.get(id);
        
        if (index !== -1) {
            waitingUser.splice(index, 1);
        }

        if(partner){
            io.to(partner).emit("partnerLeft");
            activePairs.delete(id);
            activePairs.delete(partner);
        }
    }

    socket.on("disconnect", () => {
        handleLeave(socket.id);
        console.log("User disconnected");
    });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("Server is listening on port : ", port);
})