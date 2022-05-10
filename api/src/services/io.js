const sio = require("socket.io")
var io = null

exports.io = () => {
    return io
}

exports.initialize = (server) => {
    io = sio(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    })
    return io
}
