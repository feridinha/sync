const rooms = require("../classes/rooms")
const User = require("../classes/User")

function skipAll(args, tags, cli){
    const user = new User(tags)
    if(!(user.admin || user.mod || user.broadcaster)) return
    rooms[tags.channel].player.resetQueue()
}

module.exports = {
    name: "skipAll",
    aliases: ["resetList"],
    exec: skipAll
}