const User = require("../classes/User")
const Room = require("../models/Room")
const twitch = require("../services/twitch")

async function handleRoomCreation(name) {
    const result = await twitch.fetchUserData(name)
    if(!result) return false
    const display = result.display_name.toLowerCase() !== result.login
                    ? result.login
                    : result.display_name

    const room = await Room.create({
        name: result.login,
        twitch_name: display,
        twitch_id: result.id,
        profile_image: result.profile_image_url,
        bans: [],
    })

    return room
}

async function room(args, tags, cli) {
    const user = new User(tags)
    if (!user.admin) return

    switch (true) {
        case (!args[0]):
            console.log("primeiro")
            const rooms = await Room.find({}).select("twitch_name")
            cli.say(tags.channel, rooms.join(", "))
            break
        case args[0] === "create" && Boolean(args[1]):
            console.log("asf")
            const room = await handleRoomCreation(args[1])
            if(room) await cli.say(tags.channel, `@${user.name}, sala criada com sucesso`)
            else await cli.say(tags.channel, `@${user.name}, erro ao criar sala`)
            break
        default:
            console.log("default")
            break
    }
}

module.exports = {
    name: "room",
    aliases: ["rooms"],
    exec: room
}