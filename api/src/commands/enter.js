const rooms = require("../models/rooms")
const Avatar = require("../models/Avatar")
const User = require("../models/User")

function enter(args, tags, cli){
    const user = new User(tags)
    const avatar = new Avatar(user)
    avatar.createImage().createPosition()
    rooms[tags.channel].danceFloor.addAvatar(avatar)
}

module.exports = enter