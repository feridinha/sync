const Room = require("../models/Room")
const twitchApi = require("../services/twitch")
const rooms = require("../classes/rooms")

async function handleRoomCreation(name, cli, tags, user) {
    const target = await twitchApi.fetchUserData(name)

    if (!target?.id) {
        await cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)
        return
    }

    const display =
        target.display_name.toLowerCase() !== target.login
            ? target.login
            : target.display_name // Caso display_name seja utf-8 ele pega o username

    await Room.create({
        room_name: target.login,
        room_id: target.id,
        display_name: display,
        profile_image: target.profile_image_url,
        bans: [],
    })
    await rooms.update()
    await cli.join(name).catch((i) => {
        console.log(i)
    })
    await cli.say(tags.channel, `@${user.name}, sala criada com sucesso`)
}
async function handleRoomDeletation(name, cli, tags, user) {
    // Sai do canal
    const result = await cli
        .part(name.toLowerCase())
        .catch((i) => console.log(i))
    if (!result) return
    await Room.deleteOne({ room_name: name })
    await rooms.deleteOne(name)
    await cli.say(tags.channel, `@${user.name}, sala deletada com sucesso`)
}

async function handleRoomList(tags, cli) {
    var rooms = await Room.find({}).select("room_name")
    rooms = rooms.map((i) => i.room_name)
    cli.say(tags.channel, `Rooms: ${rooms.join(", ‎")}`)
}

async function room({ args, tags, cli, user }) {
    if (!user.admin) return

    switch (true) {
        case !args[0]:
            await handleRoomList(tags, cli)
            break
        case args[0] === "create" && Boolean(args[1]):
            await handleRoomCreation(args[1], cli, tags, user)
            break
        case args[0] === "delete" && Boolean(args[1]):
            await handleRoomDeletation(args[1], cli, tags, user)
            break
    }
}

module.exports = {
    name: "room",
    aliases: ["rooms"],
    exec: room,
}
