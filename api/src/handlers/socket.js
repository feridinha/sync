const rooms = require("../classes/rooms")

function handleConnection(socket) {
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
}

module.exports = { connnection: handleConnection }