const sio = require("socket.io")
var io = null

exports.io = () => {
    return io
}

exports.initialize = (server) => {
    io = sio(server, {
        cors: {
            origin: process.env.IO_URL,
            methods: ["GET", "POST"],
        },
    })
    return io
}
