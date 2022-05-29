const rooms = require("../classes/rooms")

function current({ tags, cli, user }) {
    const current = rooms[tags.channel].player.current
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
    exec: current,
    cooldown: 10000
}