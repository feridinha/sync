const RoomModel = require("../models/Room")
const twitchApi = require("../services/twitch")

async function handleDjCreation(targetName, tags, cli, user) {
    const target = await twitchApi.fetchUserData(targetName)
    if (!target?.id) {
        await cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)
        return
    }

    const currentDjs = await RoomModel.findOne({ room_name: tags.channel }).select("djs")

    if (currentDjs.djs.includes(target.id)) {
        await cli.say(tags.channel, `@${user.name}, esse usuário já é um dj`)
        return
    }

    RoomModel.updateOne({ room_name: tags.channel },
        { $push: { djs: target.id } }, async (err, success) => {
            if (err) {
                console.log(err)
            } else {
                await cli.say(tags.channel, `@${user.name}, usuário adicionado como dj forsenPls`)
            }
        })
}

async function handleDjDeletation(targetName, tags, cli, user) {
    const target = await twitchApi.fetchUserData(targetName)
    if (!target?.id) {
        await cli.say(tags.channel, `@${user.name}, não achei esse usuário :/`)
        return
    }

    RoomModel.updateOne({ room_name: tags.channel },
        { $pull: { djs: target.id } }, async (err, success) => {
            if (err) {
                console.log(err)
            } else {
                await cli.say(tags.channel, `@${user.name}, o cargo dj desse usuário foi removido`)
            }
        })
}

async function dj({ user, cli, tags, args }) {
    if (args.length < 2) return
    if (!(user.admin || user.broadcaster)) return

    switch (args[0]) {
        case "add":
            await handleDjCreation(args[1], tags, cli, user)
            break
        case "remove":
            await handleDjDeletation(args[1], tags, cli, user)
            break
    }
}

module.exports = {
    name: "dj",
    aliases: ["cargos"],
    exec: dj,
    cooldown: 1000
}