require("dotenv").config()
const tmi = require("tmi.js")

const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: "botirinho",
        password: process.env.TMI_ACCESS_TOKEN,
    },
    channels: ["botirinho"],
})

client.connect().then(() => { console.log("conectado xD") }).catch(console.error)
module.exports = client
