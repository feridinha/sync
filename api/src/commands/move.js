const rooms = require("../models/rooms")

function move(args, tags, cli) {
    const avatar = rooms[tags.channel].danceFloor.avatars.filter(
        (item) => item.user.id === tags["user-id"]
    )

    if (avatar.length < 1)
        return cli.say(
            tags.channel,
            "@Feridinha, você não tem nenhum avatar :("
        )
    rooms[tags.channel].danceFloor.moveAvatar(avatar[0])
    console.log("Feito")
}

module.exports = move