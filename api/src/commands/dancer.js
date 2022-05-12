const rooms = require("../classes/rooms")
const Avatar = require("../classes/Avatar")
const User = require("../classes/User")

function enter(tags) {
    const user = new User(tags)
    const avatar = new Avatar(user)
    avatar.createImage().createPosition()
    rooms[tags.channel].danceFloor.addAvatar(avatar)
}

function move(tags) {
    const avatar = rooms[tags.channel].danceFloor.avatars.filter(
        (item) => item.user.id === tags["user-id"]
    )

    if (avatar.length < 1) return

    rooms[tags.channel].danceFloor.moveAvatar(avatar[0])
    console.log("Feito")
}

function dancer(args, tags, cli) {
    switch (args[0]) {
        case "enter":
            enter(tags)
            break
        case "move":
            move(tags, cli)
            break
        default:
            enter(tags)
            break
    }
}

module.exports = {
    name: "dancer",
    aliases: ["avatar"],
    exec: dancer
}