const rooms = require("../classes/rooms")
const Avatar = require("../classes/Avatar")

function enter(tags, user) {
    const avatar = new Avatar(user)
    avatar.createImage().createPosition()
    rooms[tags.channel].danceFloor.addAvatar(avatar)
}

function move(tags, user, position) {
    var target = rooms[tags.channel].danceFloor.avatars.find(
        (item) => item.user.id === user.id
    )
    if (!target) return
    target.createPosition()

    // Se a posição for válida
    if (!isNaN(position) && Number(position) > 0 && Number(position) < 101) {
        target.forcePosition(position)
    }

    rooms[tags.channel].danceFloor.updateAvatar(target)
}

function change(tags, user, index) {
    var target = rooms[tags.channel].danceFloor.avatars.find(
        (item) => item.user.id === user.id
    )
    if (!target) return
    target.createImage()

    // Se o index for válido
    if (!isNaN(index) && Number(index) > 0 && Number(index) < 10) {
        target.forceImage(`avatar0${index}.gif`)
    }

    rooms[tags.channel].danceFloor.updateAvatar(target)
}

function exit(tags, user) {
    const avatar = rooms[tags.channel].danceFloor.avatars.filter(
        (item) => item.user.id === user.id
    )

    if (avatar.length < 1) return

    rooms[tags.channel].danceFloor.removeAvatar(avatar[0])
}

function dancer({ args, tags, user }) {
    switch (args[0]) {
        case "enter":
            enter(tags, user)
            break
        case "move":
            move(tags, user, args[1])
            break
        case "exit":
            exit(tags, user)
            break
        case "change":
            change(tags, user, args[1])
            break
        default:
            enter(tags)
            break
    }
}

module.exports = {
    name: "dancer",
    aliases: ["avatar"],
    exec: dancer,
}
