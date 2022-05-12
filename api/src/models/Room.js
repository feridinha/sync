const { Schema, model } = require("../services/database")

const RoomSchema = new Schema({
    room_name: String, // twitch name
    room_id: String,   // twitch id
    display_name: String, // twitch display name
    profile_image: String,
    bans: [String],
    hidden: false
})

const Room = model("Room", RoomSchema)

module.exports = Room