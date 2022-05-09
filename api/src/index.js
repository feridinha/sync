const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const routes = require("./routes")
const server = require("http").createServer(app)
const client = require("./services/tmi")

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})
const rooms = require("./classes/rooms")
const events = require("./handlers/events")
events.config(io, client)
rooms.createObjects(events.emitter)

app.use("/", routes)

io.on("connection", (socket) => {
    console.log(`[Socket]: Nova conexão, ${socket.id}`)
    socket.emit("ready")
    
    socket.on("enter-room", (room) => {
        if (!room || !rooms.checkRoomExists(room))
            return socket.emit("invalid-room")
        socket.join(room)
        socket.room = room
        console.log("User entrou na room ", room)
    })

    socket.on("get-info", () => {
        if (!socket.room || !rooms.checkRoomExists(socket.room)) return
        socket.emit("info", rooms[socket.room].player.current?.updateTime())
    })

    socket.on("get-queue", () => {
        if (!socket.room || !rooms.checkRoomExists(socket.room)) return
        socket.emit("queue", rooms[socket.room].player.queue)
    })

    socket.on("get-avatars", () => {
        if (!socket.room || !rooms.checkRoomExists(socket.room)) return
        socket.emit("avatars", rooms[socket.room].danceFloor.avatars)
    })
})

server.listen(9999)
module.exports = io

