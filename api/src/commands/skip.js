const rooms = require("../classes/rooms")
const User = require("../classes/User")

function skip(args, tags, cli) {
    const user = new User(tags)
    if (!(user.mod || user.broadcaster || user.admin)) return

    if (!parseInt(args[0])) {
        rooms[tags.channel].player.skipCurrent()
        return cli.say(tags.channel, `@${user.name}, o vídeo atual foi skipado ⏭️`)
    }

    item = getItemByIndex(parseInt(args[0]), tags.channel)

    if (!item)
        return cli.say(
            tags.channel,
            `@${user.name}, não encontrei esse vídeo... :(`
        )
    rooms[tags.channel].player.removeById(item.uuid)
    return cli.say(
        tags.channel,
        `@${user.name}, o vídeo #${args[0]} foi skipado ⏭️`
    )
}

function getItemByIndex(index, channel) {
    if (index > rooms[channel].player.queue.length || index <= 0) return false

    return rooms[channel].player.queue[index - 1]
}

module.exports = {
    name: "skip",
    aliases: ["skipCurrent"],
    exec: skip,
    cooldown: 3000
}
