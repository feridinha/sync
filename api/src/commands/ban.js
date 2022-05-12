const User = require("../classes/User")
const RoomModel = require("../models/Room")
const twitch = require("../services/twitch")

async function handleBan(args, tags, cli, user) {
    if (user.id === tags["room-id"])
        return cli.say(tags.channel, `@${user.name}, Você não pode banir o streamer :/ :(`)

    const target = await twitch.fetchUserData(args[0])
    if (!target?.id) return cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)

    RoomModel.updateOne(
        { room_name: tags.channel },
        { $push: { bans: target.id } }, (err, success) => {
            console.log("Foi")
        })

    return cli.say(tags.channel, `@${user.name}, o usuário @${args[0]} foi banido DatSheffy`)
}

async function handleUnban(args, tags, cli, user){
    const target = await twitch.fetchUserData(args[0])
    if (!target?.id) return cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)

    RoomModel.updateOne(
        { room_name: tags.channel },
        { $pull: { bans: target.id } }, (err, success) => {
            console.log("Foi")
        })
    return cli.say(tags.channel, `@${user.name}, o usuário @${args[0]} foi desbanido BloodTrail `)
}

async function handleAction(args, tags, cli) {
    const user = new User(tags)
    if (!(user.broadcaster || user.admin)) return
    if (args.length < 1) {
        await cli.say(tags.channel, `@${user.name}, informe um usuário..`)
        return
    }

    switch (tags.source) {
        case "ban":
            await handleBan(args, tags, cli, user)
            break
        case "unban":
            await handleUnban(args, tags, cli, user)
            break
    }
}

module.exports = {
    name: "ban",
    aliases: ["unban"],
    exec: handleAction
}