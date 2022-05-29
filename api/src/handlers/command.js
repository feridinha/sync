const normalizedPath = require("path").join(__dirname, "../commands/")
const User = require("../classes/User")

var commands = []
require("fs") // Adiciona todos os comandos da pasta ../commands para array acima
    .readdirSync(normalizedPath)
    .forEach((file) => {
        var target = require("../commands/" + file)
        target.channels = []
        commands.push(target)
    })

function setCommandCooldown(command, channel) {
    command.channels.push(channel)
    setTimeout(() => {
        command.channels = command.channels.filter((i) => {
            i !== channel
        })
    }, command.cooldown)
}

async function command(channel, tags, message, self, cli) {
    if (self || !message.startsWith("%")) return
    const [source, ...args] = message.slice(1).split(/ +/g)
    console.log(`[Service]: (${channel}) ${tags["display-name"]}: ${message}`)

    channel = channel.replace("#", "")
    tags.source = source.toLowerCase()
    tags.channel = channel

    const commandTarget = commands.find(
        (i) => source === i.name || i.aliases?.includes(source)
    )
    if (!commandTarget || commandTarget.channels.includes(channel)) return

    const user = new User(tags)
    await user.fetchExtraData(channel)

    if (user.banned) return

    try {
        commandTarget.exec({ args, tags, cli, user })
    } catch (err) {
        console.error("Erro ao rodar comando: ", err)
    }

    if (!commandTarget.cooldown) return
    setCommandCooldown(commandTarget, channel)
}

module.exports = handleCommand = command
