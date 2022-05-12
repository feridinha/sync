const User = require("../classes/User")
const Room = require("../models/Room")
const twitch = require("../services/twitch")

async function handleRoomCreation(name) {
    const result = await twitch.fetchUserData(name)
    if (!result) return false
    const display = result.display_name.toLowerCase() !== result.login
        ? result.login
        : result.display_name

    const room = await Room.create({
        room_name: result.login,
        room_id: result.id,
        display_name: display,
        profile_image: result.profile_image_url,
        bans: [],
    })

    return room
}
async function handleRoomDeletation(name) {
    name = name.toLowerCase()
    const result = await Room.deleteOne({ room_name: name })
    return result
}

async function room(args, tags, cli) {
    const user = new User(tags)
    if (!user.admin) return

    switch (true) {
        case (!args[0]):
            console.log("primeiro")
            const rooms = await Room.find({}).select("room_name")
            cli.say(tags.channel, `Rooms: ${rooms.map(i => "@" + i.room_name).join(", ")}`)
            break
        case args[0] === "create" && Boolean(args[1]):
            console.log("asf")
            const room = await handleRoomCreation(args[1])
            if (room) await cli.say(tags.channel, `@${user.name}, sala criada com sucesso`)
            else await cli.say(tags.channel, `@${user.name}, erro ao criar sala`)
            break
        case args[0] === "delete" && Boolean(args[1]):
            const result = await handleRoomDeletation(args[1])
            if (result) await cli.say(tags.channel, `@${user.name}, sala deletada com sucesso`)
            else await cli.say(tags.channel, `@${user.name}, erro ao deletar sala`)
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