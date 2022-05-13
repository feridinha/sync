const rooms = require("../classes/rooms")
const User = require("../classes/User")

async function skipAll(args, tags, cli){
    const user = new User(tags)
    if(!(user.admin || user.mod || user.broadcaster)) return
    rooms[tags.channel].player.resetQueue()
    await cli.say(tags.channel, `@${user.name}, feito`)
}

module.exports = {
    name: "skipAll",
    aliases: ["resetList"],
    exec: skipAll
}