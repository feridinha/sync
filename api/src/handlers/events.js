var events = require("events")
var emitter = new events.EventEmitter()

var io = null
var client = null

emitter.on("ws-inform-room", (room, args) => {
    io?.to(room).emit(...args)
})

emitter.on("tmi-channel-message", (channel, message) => {
    client?.say(channel, message)
})

module.exports = events = {
    emitter,
    initialize: function (socketIo, cli) {
        io = socketIo
        client = cli
        return this
    },
}
