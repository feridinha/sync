const rooms = require("../classes/rooms")
const User = require("../classes/User")
const Avatar = require("../classes/Avatar")
const Video = require("../classes/Video")

const isUrl = i => (i.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi))

async function add(args, tags, cli) {
    if (!args.length > 0) return

    const term = (tags.source === "search") ? args.join(" ") : args[0]
    if (tags.source === "add" && !isUrl(args[0])) return
    const video = new Video(term)

    if (!(await video.getInfo())) return

    const user = new User(tags)
    video.author = user

    const queue = rooms[tags.channel].player.queue

    if (videoDuplicates(queue, video))
        return cli.say(
            tags.channel,
            `@${user.name}, esse vídeo já está na queue.`
        )
    if (userInQueue(queue, user) > 4)
        return cli.say(
            tags.channel,
            `@${user.name}, limite de 5 vídeos ao mesmo tempo.`
        )
    rooms[tags.channel].player.addOne(video)

    const avatar = new Avatar(user)

    rooms[tags.channel].danceFloor.addAvatar(
        avatar.createPosition().createImage()
    )
}

function userInQueue(queue, userTarget) {
    return queue.filter((item) => item.author.id == userTarget.id).length
}

function videoDuplicates(queue, video) {
    return queue.filter((item) => item.id == video.id).length > 0
}

module.exports = {
    name: "add",
    aliases: ["search"],
    exec: add
}
