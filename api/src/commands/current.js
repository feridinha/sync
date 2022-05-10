const rooms = require("../classes/rooms")

function current(args, tags, cli) {
    const current = rooms[tags.channel].player.current
    cli.say(
        tags.channel,
        current
            ? `@Feridinha ${current.shortTitle()}`
            : `@Feridinha Nenhum vídeo tocando xD`
    )
}
module.exports = {
    name: "current",
    aliases: ["video", "playing"],
    exec: current
}