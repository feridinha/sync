const rooms = require("../models/rooms")
const User = require("../models/User")
const Avatar = require("../models/Avatar")
const Video = require("../models/Video")

async function add(args, tags) {
    if (!args.length > 0) return

    const video = new Video(args[0])

    if (await video.getInfo()) {
        const user = new User(tags)
        video.author = user
        const avatar = new Avatar(user)
        rooms[tags.channel].player.addOne(video)
        rooms[tags.channel].danceFloor.addAvatar(
            avatar.createPosition().createImage()
        )
    }
}
module.exports = add
