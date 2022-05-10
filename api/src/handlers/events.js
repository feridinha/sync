var events = require("events")
var emitter = new events.EventEmitter()

var [socketIo, client] = []

function config(io, cli) {
    socketIo = io
    client = cli
    return this
}

emitter.on("ws-inform-room", (room, args) => {
    socketIo?.to(room).emit(...args)
})

emitter.on("tmi-channel-message", (channel, message) => {
    client?.say(channel, message)
})

emitter.on("tmi-ping-command", async (room) => {
    var usage = process.memoryUsage().heapTotal / 1024 / 1024
    usage = Math.round(usage * 100) / 100

    const ping = (await client.ping()) * 1000

    const socketsNumber = Array.from(socketIo.sockets.sockets.keys()).length

    const p = socketsNumber > 1 || socketsNumber === 0 ? "s" : ""

    const message = `RAM: ${usage}mb | PING: ${ping}ms | ${socketsNumber} usuário${p} conectado${p} Fishinge`
    client?.say(room, message)
})

module.exports = events = {
    emitter,
    config,
}
