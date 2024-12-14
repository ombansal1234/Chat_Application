import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express()
const server=http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        callback(null, true); 
      },
      credentials: true,
    }
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId]
}

// used to store online users
const userSocketMap={} // userId:socketId

io.on("connection",(socket)=>{
    console.log(`A user connected ${socket.id}`.bgYellow)

    // coming from authStrore socket function
    const userId=socket.handshake.query.userId
    if(userId)userSocketMap[userId]=socket.id

    // send event to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log(`A user Disconnected ${socket.id}`.bgBlue)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {io,app,server};