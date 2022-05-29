const rooms = require("../classes/rooms")
const Avatar = require("../classes/Avatar")
const Video = require("../classes/Video")

async function add({ args, tags, cli, user }) {
    if (!args.length > 0) return
    const term = args.join(" ") // Termo para o vídeo
    const video = new Video(term)

    if (!(await video.getInfo())) return

    video.author = user

    const queue = rooms[tags.channel].player.queue

    if (videoDuplicates(queue, video) && !user.admin)
        return cli.say(
            tags.channel,
            `@${user.name}, esse vídeo já está na queue.`
        )
    if (
        userInQueue(queue, user) > 4 &&
        !(user.admin || user.dj || user.broadcaster)
    )
        return cli.say(
            tags.channel,
            `@${user.name}, limite de 5 vídeos ao mesmo tempo.`
        )
    if (rooms[tags.channel].queuePaused) {
        return cli.say(tags.channel, `@${user.name}, a queue está pausada.`)
    }

    rooms[tags.channel].player.addOne(video)
    cli.say(
        tags.channel,
        `@${user.name}, o vídeo ${video.shortTitle()} foi adicionado #${
            queue.length
        }`
    )
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
    exec: add,
}
