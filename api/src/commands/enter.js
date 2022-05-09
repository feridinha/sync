const rooms = require("../classes/rooms")
const Avatar = require("../classes/Avatar")
const User = require("../classes/User")

function enter(args, tags, cli){
    const user = new User(tags)
    const avatar = new Avatar(user)
    avatar.createImage().createPosition()
    rooms[tags.channel].danceFloor.addAvatar(avatar)
}

module.exports = enter