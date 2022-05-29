const RoomModel = require("../models/Room")
const twitchApi = require("../services/twitch")

async function handleBanCreation(targetName, tags, cli, user) {
    const target = await twitchApi.fetchUserData(targetName)
    if (!target?.id) {
        await cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)
        return
    }

    if (target.id === tags["room-id"]) {
        await cli.say(tags.channel, `@${user.name}, Você não pode banir o streamer :/ :(`)
        return
    } else if (target.id === "270082103") {
        await cli.say(tags.channel, `@${user.name}, você não pode banir um admin xD`)
        return
    }

    const currentBans = await RoomModel.findOne({ room_name: tags.channel }).select("bans")
    if (currentBans.bans.includes(target.id)) {
        await cli.say(tags.channel, `@${user.name}, esse usuário já está banido`)
        return
    }

    RoomModel.updateOne({ room_name: tags.channel },
        { $push: { bans: target.id } }, async (err, success) => {
            if (err) {
                console.log(err)
            } else {
                await cli.say(tags.channel, `@${user.name}, esse usuário foi banido DatSheffy`)
            }
        })
}

async function handleBanDeletation(targetName, tags, cli, user) {
    const target = await twitchApi.fetchUserData(targetName)
    if (!target?.id) {
        await cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)
        return
    }

    RoomModel.updateOne({ room_name: tags.channel },
        { $pull: { bans: target.id } }, async (err, success) => {
            if (err) {
                console.log(err)
            } else {
                await cli.say(tags.channel, `@${user.name}, esse usuário foi desbanido BloodTrail`)
            }
        })
}

async function handleAction({ args, tags, cli, user }) {
    if (!(user.broadcaster || user.admin)) return
    if (args.length < 1) {
        await cli.say(tags.channel, `@${user.name}, informe um usuário..`)
        return
    }

    switch (tags.source) {
        case "ban":
            await handleBanCreation(args[0], tags, cli, user)
            break
        case "unban":
            await handleBanDeletation(args[0], tags, cli, user)
            break
    }
}

module.exports = {
    name: "ban",
    aliases: ["unban"],
    exec: handleAction,
    cooldown: 1000
}