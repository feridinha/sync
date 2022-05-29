const rooms = require("../classes/rooms")

async function skipAll({ args, tags, cli, user }) {
    if (!(user.admin || user.mod || user.broadcaster)) return
    rooms[tags.channel].player.resetQueue()
    await cli.say(tags.channel, `@${user.name}, feito`)
}

module.exports = {
    name: "skipAll",
    aliases: ["resetList"],
    exec: skipAll
}