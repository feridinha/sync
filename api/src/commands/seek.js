const rooms = require("../classes/rooms")

async function seek({ args, tags, cli, user }) {
    if (!args.length > 0) return
    if (args[0].length < 2) return

    if (!(user.mod || user.broadcaster || user.admin)) return

    const operator = args[0][0]
    if (operator !== "+" && operator !== "-") {
        return console.log("Operador inválido")
    }

    var seconds = args[0].slice(1)
    if (isNaN(seconds)) return console.log("Não é número")

    seconds = parseInt(seconds)

    if (seconds === 0) return console.log("Bom zero")
    if (!rooms[tags.channel].player.current) {
        await cli.say(tags.channel, `@${user.name}, Nenhum vídeo tocando :(`)
        return
    }
    rooms[tags.channel].player.seekTo(operator, seconds)
}

module.exports = {
    name: "seek",
    aliases: [],
    exec: seek
}