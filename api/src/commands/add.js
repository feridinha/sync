const rooms = require("../models/rooms")
const User = require("../models/User")
const Video = require("../models/Video")

async function add(args, tags) {
    if (!args.length > 0) return

    const video = new Video(args[0])

    if (await video.getInfo()) {
        video.author = new User(tags)
        rooms[tags.channel].player.addOne(video)
    }

}
module.exports = add
