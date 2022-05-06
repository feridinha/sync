const rooms = require("../models/rooms")

function current(args, tags, cli) {
    const current = rooms[tags.channel].player.current
    cli.say(
        tags.channel,
        current
            ? `@Feridinha ${current.shortTitle()}`
            : `@Feridinha Nenhum vídeo tocando xD`
    )
}
module.exports = current
