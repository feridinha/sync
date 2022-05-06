const rooms = require("../models/rooms")
const User = require("../models/User")

function quit(args, tags, cli) {
    const user = new User(tags)

    if (!parseInt(args[0])) index = 1
    else index = parseInt(args[0])

    const userVideos = getItemsByUser(user, tags.channel)
    const target = getItemByIndex(index, userVideos)
    if(!target) return cli.say(tags.channel, "@Feridinha, não encontrei nenhum vídeo... >(")

    rooms[tags.channel].player.removeById(target.uuid)
    cli.say(tags.channel, `@Feridinha, seu vídeo foi removido com sucesso :O`)
}

function getItemsByUser(user, channel) {
    return rooms[channel].player.queue.filter((item) => item.author.id == user.id)
}

function getItemByIndex(index, array) {
    if (index > array.length || index <= 0) {
        return false
    }
    return array[index - 1]
}

module.exports = quit
