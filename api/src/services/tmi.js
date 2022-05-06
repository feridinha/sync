require("dotenv").config()
const tmi = require("tmi.js")
const commands = require("../commands")

const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: "botirinho",
        password: process.env.TMI_ACCESS_TOKEN,
    },
    channels: ["botirinho"],
})

client.connect().catch(console.error)

client.on("message", async (channel, tags, message, self) => {
    if (self || !message.startsWith("%")) return
    var [command, ...args] = message.slice(1).split(/ +/g)
    tags.channel = channel.replace("#", "")
    console.log(tags.channel)
    console.log(`[Service]: (${channel}) ${tags["display-name"]}: ${message}`)
    commands(command, args, tags, client)
})

module.exports = client
