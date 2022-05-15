const io = require("../services/io").io()

async function ping (args, tags, cli) {
    var usage = process.memoryUsage().heapTotal / 1024 / 1024
    usage = Math.round(usage * 100) / 100

    const ping = (await cli.ping()) * 1000

    const socketsNumber = Array.from(io.sockets.sockets.keys()).length

    const p = socketsNumber > 1 || socketsNumber === 0 ? "s" : ""

    const message = `RAM: ${usage}mb | PING: ${ping}ms | ${socketsNumber} usuário${p} conectado${p} Fishinge`
    cli.say(tags.channel, message)
}

module.exports = {
    name: "ping",
    aliases: ["pong", "status"],
    exec: ping,
    cooldown: 5000
}