const VideoPlayer = require("./VideoPlayer")
const DanceFloor = require("./DanceFloor")
const RoomModel = require("../models/Room")

var rooms = {
    getRoomsArray: function () {
        var result = []
        Object.keys(rooms).forEach((name) => {
            if (typeof rooms[name] === "function") return
            result.push(rooms[name])
        })
        return result
    },

    checkRoomExists: function (target) {
        return rooms
            .getRoomsArray()
            .map((i) => i.room_name)
            .includes(target)
    },
    createFromDatabase: async function (db) {
        const search = await RoomModel.find()
        search.forEach(s => {
            if (rooms[s.room_name]?.player) { // Já foi criada
                return
            }
            rooms[s.room_name] = {}
            Object.assign(rooms[s.room_name], s._doc)
        })
        return true
    },

    createClasses: function (cb) {
        Object.keys(rooms).forEach((roomName) => {
            if (typeof rooms[roomName] === "function") return
            if (rooms[roomName].player) return // Já foi criada
            rooms[roomName].player = new VideoPlayer(roomName, cb)
            rooms[roomName].danceFloor = new DanceFloor(roomName, cb)
        })
    },

    initialize: async function (callback) {
        await this.createFromDatabase()
        this.createClasses(callback)
        this.getRoomsArray().forEach(i => callback.emit("tmi-join-channel", i.room_name))
    },

    update: async function (channel) {
        await this.createFromDatabase()
    },

    getRoomsList: function () {
        let result = []
        Object.keys(this).forEach((roomName) => {
            if (typeof this[roomName] === "function") return
            result[roomName] = {
                name: roomName,
                profile_image: this[roomName].profile_image,
                display_name: this[roomName].display_name,
                room_id: this[roomName].room_id
            }
        })
        return result
    }
}

module.exports = rooms
