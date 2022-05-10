require("dotenv").config()
const tmi = require("tmi.js")
const commands = require("../handlers/command")

const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: "botirinho",
        password: process.env.TMI_ACCESS_TOKEN,
    },
    channels: ["botirinho"],
})

client.connect().catch(console.error)

module.exports = client
