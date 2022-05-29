const rooms = require("../classes/rooms")

async function handlePause(cli, tags, user) {
    if (rooms[tags.channel].queuePaused) {
        await cli.say(tags.channel, `${user.name}, a queue já está pausada ⏸️`)
        return
    }

    rooms[tags.channel].queuePaused = true
    await cli.say(tags.channel, `${user.name}, a queue foi pausada ⏸️`)
}

async function handleReturn(cli, tags, user) {
    if (!rooms[tags.channel].queuePaused) {
        await cli.say(tags.channel, `${user.name}, a queue já está ativa ▶️`)
        return
    }

    rooms[tags.channel].queuePaused = false
    await cli.say(tags.channel, `${user.name}, a queue foi ativada ▶️`)
}

async function pauseQueue({ cli, user, tags, args }) {
    if (!(user.admin || user.broadcaster || user.mod)) return
    if (args.length < 1) return

    switch (args[0]) {
        case "pause":
            await handlePause(cli, tags, user)
            break
        case "return":
            await handleReturn(cli, tags, user)
            break
    }
}

module.exports = {
    name: "queue",
    aliases: [],
    exec: pauseQueue,
}
