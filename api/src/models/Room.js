const { Schema, model } = require("../services/database")

const RoomSchema = new Schema({
    name: String,
    twitch_name: String,
    twitch_id: String,
    profile_image: String,
    bans: [String],
    hidden: false
})

const Room = model("Room", RoomSchema)

module.exports = Room