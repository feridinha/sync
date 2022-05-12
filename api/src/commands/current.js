const rooms = require("../classes/rooms")
const User = require("../classes/User")

function current(args, tags, cli) {
    const current = rooms[tags.channel].player.current
    const user = new User(tags)
    cli.say(
        tags.channel,
        current
            ? `@${user.name} ${current.shortTitle()}`
            : `@${user.name} Nenhum vídeo tocando :(`
    )
}
module.exports = {
    name: "current",
    aliases: ["video", "playing"],
    exec: current
}