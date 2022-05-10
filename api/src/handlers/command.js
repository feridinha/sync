const normalizedPath = require("path").join(__dirname, "../commands/")
var commands = []
require("fs")
    .readdirSync(normalizedPath)
    .forEach((file) => {
        commands.push(require("../commands/" + file))
    })
/*
TODO: 
    %skip all
    %seek
*/

function command(channel, tags, message, self, cli) {
    if (self || !message.startsWith("%")) return
    const [command, ...args] = message.slice(1).split(/ +/g)
    console.log(`[Service]: (${channel}) ${tags["display-name"]}: ${message}`)

    var target = null

    commands.forEach((i) => {
        if (command === i.name || i.aliases.includes(command)) {
            return (target = i)
        }
    })
    
    tags.source = command.toLowerCase()
    tags.channel = channel.replace("#", "")

    if (!target || target.cooldown?.active) return

    target?.exec(args, tags, cli)

    if (!target.cooldown) return
    target.cooldown.active = true
    setTimeout(() => {
        target.cooldown.active = false
    }, target.cooldown.time)
}

module.exports = handleCommand = command
