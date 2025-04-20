import { Server } from 'socket.io'; //NOW WE ARE IMPORTING SERVER FROM SOCKET.IO
import http from 'http';
import express from 'express'; 

const app = express();
const server = http.createServer(app); ///we will gonna create a server and use http module to the server
// const io = new Server(server);


const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? "https://chat-wheat-three-43.vercel.app" // Your live Vercel URL in production
      : "http://localhost:5173", // Your local dev URL for testing
  }
});

export function getReceiverSocketId(userId) {//it will return the socket id when we give the user id
    return userSocketMap[userId];
  }

  
const userSocketMap = {}; //this is the map of the user and the socket id {userId: socketId}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
  
    const userId = socket.handshake.query.userId; //this is the way to get the userId from the query
    if (userId) userSocketMap[userId] = socket.id; //this is the way to store the userId and the socket id in the userSocketMap
  //if user id exit we can update...
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //it will broadcast to all the connected clients
  
    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id); //in the same way..if the user dissconnet then we will broadcast to all the connected clients
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

export { io, app, server };


