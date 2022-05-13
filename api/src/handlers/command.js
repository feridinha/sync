const normalizedPath = require("path").join(__dirname, "../commands/")
const RoomModel = require("../models/Room")
var commands = []
require("fs")
    .readdirSync(normalizedPath)
    .forEach((file) => {
        commands.push(require("../commands/" + file))
    })
/*
TODO: 
    %skip all
*/


function setCommandCooldown(command) {
    command.active = true
    setTimeout(() => {
        command.active = false
    }, command.cooldown)
}

async function command(channel, tags, message, self, cli) {
    if (self || !message.startsWith("%")) return
    const [source, ...args] = message.slice(1).split(/ +/g)
    console.log(`[Service]: (${channel}) ${tags["display-name"]}: ${message}`)

    var command = commands.find((i) =>
        (source === i.name || i.aliases?.includes(source))
    )

    tags.source = source.toLowerCase()
    tags.channel = channel.replace("#", "")

    const bannedUsers = await RoomModel.findOne({ room_name: tags.channel }).select("bans")
    if (bannedUsers?.bans.includes(tags["user-id"])) return console.log("Banido xD")

    if (!command || command.active) return
    try{
        command.exec(args, tags, cli)
    } catch (err) {
        console.error("Erro ao rodar comando: ", err)
    }

    if (!command.cooldown) return
    setCommandCooldown(command)
}

module.exports = handleCommand = command
