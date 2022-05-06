const { emitter } = require("../handlers/events")

function ping (args, tags, cli) {
    emitter.emit("tmi-ping-command", tags.channel)
}

module.exports = ping 