const rooms = require("../classes/rooms")

function handleConnection(socket) {
    console.log(`[Socket]: Nova conexão, ${socket.id}`)

    socket.on("enter-room", (room) => {
        if (!room || !rooms.checkRoomExists(room))
            return socket.emit("invalid-room")
        socket.join(room)
        socket.emit("ready")
    })

    socket.on("get-info", (room) => {
        socket.emit("info", rooms[room]?.player.current?.updateTime())
    })

    socket.on("get-queue", (room) => {
        socket.emit("queue", rooms[room]?.player.queue)
    })

    socket.on("get-avatars", (room) => {
        socket.emit("avatars", rooms[room]?.danceFloor.avatars)
    })
}

module.exports = { connnection: handleConnection }