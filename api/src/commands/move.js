const rooms = require("../classes/rooms")
const User = require("../classes/User")

function move(args, tags, cli) {
    const avatar = rooms[tags.channel].danceFloor.avatars.filter(
        (item) => item.user.id === tags["user-id"]
    )

    if (avatar.length < 1) {
        const user = new User(tags)
        return cli.say(
            tags.channel,
            `@${user.name}, você não tem nenhum avatar :(`)
    }
    rooms[tags.channel].danceFloor.moveAvatar(avatar[0])
    console.log("Feito")
}

module.exports = {
    name: "move",
    aliases: [],
    exec: move
}